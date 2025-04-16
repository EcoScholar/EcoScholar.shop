import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlistItems: localStorage.getItem('wishlistItems') 
        ? JSON.parse(localStorage.getItem('wishlistItems')) 
        : [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const itemExists = state.wishlistItems.find(
                (item) => item._id === action.payload._id
            );
            if (!itemExists) {
                state.wishlistItems.push(action.payload);
                localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
        },
        clearWishlist: (state) => {
            state.wishlistItems = [];
            localStorage.removeItem('wishlistItems');
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 