'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

export interface CartItem {
    id: number;
    title: string;
    sku: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on mount or when user changes
    useEffect(() => {
        if (!user?.id) {
            // No user logged in, clear cart
            setItems([]);
            setIsInitialized(true);
            return;
        }

        // User-specific cart key
        const cartKey = `cart_${user.id}`;
        const savedCart = localStorage.getItem(cartKey);

        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to load cart:', e);
                setItems([]);
            }
        } else {
            setItems([]);
        }
        setIsInitialized(true);
    }, [user?.id]);

    // Save cart to localStorage whenever it changes (user-specific)
    useEffect(() => {
        if (isInitialized && user?.id) {
            const cartKey = `cart_${user.id}`;
            localStorage.setItem(cartKey, JSON.stringify(items));
        }
    }, [items, isInitialized, user?.id]);

    const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(i => i.id === item.id);
            if (existingItem) {
                return currentItems.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...currentItems, { ...item, quantity }];
        });
    };

    const removeItem = (id: number) => {
        setItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) {
            removeItem(id);
            return;
        }
        setItems(currentItems =>
            currentItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        // Also clear from localStorage
        if (user?.id) {
            const cartKey = `cart_${user.id}`;
            localStorage.removeItem(cartKey);
        }
    };

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
