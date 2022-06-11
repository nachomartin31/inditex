/* @reduxjs/toolkit implements Immer to handle state change avoiding mutation
      so it's safe to disable no-params-reassign on next line */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: { count: 0 }
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { count } = state.cart;
      const { count: actionCount } = action.payload;
      state.cart = { count: count + actionCount };
    },
    deleteFromCart: (state, action) => {
      const newCart = state.cart.filter((carrtItem) => carrtItem.id === action.payload);
      state.cart = newCart;
    }
  }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
