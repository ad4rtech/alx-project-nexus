'use server';

import { createClient } from '@/lib/supabase/server';

export interface Product {
    id: string;
    name: string;
    model: string;
    category: string;
    description: string;
    price: number;
    image_url: string;
    specifications: Record<string, string>;
    features: string[];
    warranty: string | null;
    warranty_description: string | null;
    support_provider: string | null;
    stock_quantity: number;
    is_available: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Fetch all available products
 */
export async function fetchProducts() {
    const supabase = await createClient();

    console.log('🔍 Fetching products from database...');

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('category', { ascending: true })
        .order('name', { ascending: true });

    if (error) {
        console.error('❌ Error fetching products:', error);
        return { products: [], error: error.message };
    }

    console.log('✅ Fetched products:', products?.length || 0);
    return { products: products || [], error: null };
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: string) {
    const supabase = await createClient();

    console.log('🔍 Fetching product:', id);

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('❌ Error fetching product:', error);
        return { product: null, error: error.message };
    }

    console.log('✅ Fetched product:', product?.name);
    return { product, error: null };
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category: string) {
    const supabase = await createClient();

    console.log('🔍 Fetching products in category:', category);

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('is_available', true)
        .order('name', { ascending: true });

    if (error) {
        console.error('❌ Error fetching products by category:', error);
        return { products: [], error: error.message };
    }

    console.log('✅ Fetched products:', products?.length || 0);
    return { products: products || [], error: null };
}

/**
 * Search products by name or model
 */
export async function searchProducts(query: string) {
    const supabase = await createClient();

    console.log('🔍 Searching products:', query);

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,model.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('is_available', true)
        .order('name', { ascending: true });

    if (error) {
        console.error('❌ Error searching products:', error);
        return { products: [], error: error.message };
    }

    console.log('✅ Found products:', products?.length || 0);
    return { products: products || [], error: null };
}
