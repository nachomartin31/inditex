/* @reduxjs/toolkit implements Immer to handle state change avoiding mutation
      so it's safe to disable no-params-reassign on next line */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    deleteFromCart: (state, action) => {
      const newCart = state.cart.filter((carrtItem) => carrtItem.id === action.payload);
      state.cart = newCart;
    }
  }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
