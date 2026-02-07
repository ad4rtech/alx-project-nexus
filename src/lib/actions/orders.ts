'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Types
export type OrderItem = {
    id: string;
    title: string;
    sku?: string;
    price: number;
    quantity: number;
    image?: string;
    category?: string;
};

export type ShippingAddress = {
    department: string;
    contact: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
};

export type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'DEPLOYED';

// Status transition rules
const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
    PENDING: ['SHIPPED', 'DEPLOYED'], // Can ship or deploy directly
    SHIPPED: ['DELIVERED', 'DEPLOYED'], // Can deliver or deploy directly
    DELIVERED: ['DEPLOYED'],
    DEPLOYED: [], // Terminal state
};

/**
 * Create a new order (BUYER only)
 * @param userId - The ID of the user creating the order (passed from client)
 * @param items - Array of cart items
 * @param shippingAddress - Shipping address details
 */
export async function createOrder(
    userId: string,
    items: OrderItem[],
    shippingAddress: ShippingAddress
) {
    const supabase = await createClient();

    console.log('🔍 Creating order for user:', userId);

    // Verify user exists and is BUYER
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, organization_id, email, name')
        .eq('id', userId)
        .single();

    console.log('🔍 User profile:', profile);

    if (profileError || !profile) {
        console.error('❌ Profile fetch error:', profileError);
        return { error: 'Failed to verify user profile' };
    }

    if (profile.role !== 'BUYER') {
        return { error: 'Only procurement managers can create orders' };
    }

    // Validate items
    if (!items || items.length === 0) {
        return { error: 'Order must contain at least one item' };
    }

    // Calculate total (include shipping + tax)
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 150.00;
    const tax = subtotal * 0.085;
    const totalAmount = subtotal + shipping + tax;

    console.log('🔍 Order details:', {
        subtotal,
        shipping,
        tax,
        totalAmount,
        itemCount: items.length,
        userId: userId
    });

    // Create order with explicit user ID
    const { data: order, error } = await supabase
        .from('orders')
        .insert({
            created_by: userId,
            organization_id: profile.organization_id || null,
            status: 'PENDING',
            total_amount: totalAmount,
            items: items,
            ship_to_address: shippingAddress,
            ship_to_department: shippingAddress.department,
            ship_to_contact: shippingAddress.contact,
            // DON'T set order_number - let the trigger generate it
        })
        .select()
        .single();

    if (error) {
        console.error('❌ Order creation error:', error);
        console.error('Error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
        });
        return { error: `Failed to create order: ${error.message}` };
    }

    console.log('✅ Order created successfully:', order);

    revalidatePath('/orders');
    return { success: true, order };
}

/**
 * Update order status (ADMIN only)
 */
export async function updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
    notes?: string,
    trackingInfo?: {
        carrier?: string;
        trackingNumber?: string;
        estimatedDelivery?: string;
    }
) {
    const supabase = await createClient();

    console.log('🔄 Updating order status:', orderId, 'to', newStatus);

    // Get current order
    const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

    if (fetchError || !order) {
        console.error('❌ Order not found:', fetchError);
        return { error: 'Order not found' };
    }

    // Validate status transition
    const currentStatus = order.status as OrderStatus;
    const allowedTransitions = STATUS_TRANSITIONS[currentStatus];

    if (!allowedTransitions.includes(newStatus)) {
        const allowedText = allowedTransitions.length > 0
            ? allowedTransitions.join(', ')
            : 'none (terminal state)';
        console.error('❌ Invalid status transition:', currentStatus, 'to', newStatus);
        return {
            error: `Invalid status transition from ${currentStatus} to ${newStatus}. Allowed: ${allowedText}`
        };
    }

    // Prepare update data
    const updateData: Record<string, string | null> = {
        status: newStatus,
    };

    // Set timestamp based on status
    if (newStatus === 'SHIPPED') {
        updateData.shipped_at = new Date().toISOString();
        if (trackingInfo?.carrier) updateData.carrier = trackingInfo.carrier;
        if (trackingInfo?.trackingNumber) updateData.tracking_number = trackingInfo.trackingNumber;
        if (trackingInfo?.estimatedDelivery) updateData.estimated_delivery = trackingInfo.estimatedDelivery;
    } else if (newStatus === 'DELIVERED') {
        updateData.delivered_at = new Date().toISOString();
    } else if (newStatus === 'DEPLOYED') {
        updateData.deployed_at = new Date().toISOString();
    }

    // Update order
    const { error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

    if (updateError) {
        console.error('❌ Order update error:', updateError);
        return { error: 'Failed to update order status' };
    }

    console.log('✅ Order status updated successfully');
    return { success: true };
}

/**
 * Fetch all orders (filtered by user for BUYER, all orders for ADMIN)
 */
export async function fetchOrders(userId?: string, role?: string) {
    const supabase = await createClient();

    console.log('🔍 Fetching orders for user:', userId, 'role:', role);

    // Build query
    let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    // Filter by user for BUYER role
    if (role === 'BUYER' && userId) {
        console.log('🔍 Filtering orders for BUYER:', userId);
        query = query.eq('created_by', userId);
    } else {
        console.log('🔍 Fetching all orders (ADMIN view)');
    }

    const { data: orders, error } = await query;

    if (error) {
        console.error('❌ Fetch orders error:', error);
        return { error: 'Failed to fetch orders', orders: [] };
    }

    console.log('✅ Fetched orders:', orders?.length || 0);
    return { orders: orders || [] };
}

/**
 * Fetch a single order by ID
 */
export async function fetchOrderById(orderId: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const { data: order, error } = await supabase
        .from('orders')
        .select(`
      *,
      created_by_profile:profiles!created_by(name, email),
      status_history:order_status_history(*)
    `)
        .eq('id', orderId)
        .single();

    if (error) {
        console.error('Fetch order error:', error);
        return { error: 'Order not found' };
    }

    return { order };
}
