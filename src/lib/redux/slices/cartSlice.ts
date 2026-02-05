import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: string;
    title: string;
    sku?: string;
    price: number;
    quantity: number;
    image?: string;
    category?: string;
}

interface CartState {
    items: CartItem[];
}

// Load cart from localStorage
const loadCartFromStorage = (userId?: string): CartItem[] => {
    if (typeof window === 'undefined' || !userId) return [];

    try {
        const cartKey = `cart_${userId}`;
        const savedCart = localStorage.getItem(cartKey);
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        return [];
    }
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[], userId?: string) => {
    if (typeof window === 'undefined' || !userId) return;

    try {
        const cartKey = `cart_${userId}`;
        localStorage.setItem(cartKey, JSON.stringify(items));
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initializeCart: (state, action: PayloadAction<string | undefined>) => {
            state.items = loadCartFromStorage(action.payload);
        },
        addToCart: (state, action: PayloadAction<{ item: Omit<CartItem, 'quantity'>; userId?: string; quantity?: number }>) => {
            const { item, userId, quantity = 1 } = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ ...item, quantity });
            }

            saveCartToStorage(state.items, userId);
        },
        removeFromCart: (state, action: PayloadAction<{ id: string; userId?: string }>) => {
            const { id, userId } = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            saveCartToStorage(state.items, userId);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number; userId?: string }>) => {
            const { id, quantity, userId } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
            saveCartToStorage(state.items, userId);
        },
        clearCart: (state, action: PayloadAction<string | undefined>) => {
            state.items = [];
            saveCartToStorage([], action.payload);
        },
    },
});

export const { initializeCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;
