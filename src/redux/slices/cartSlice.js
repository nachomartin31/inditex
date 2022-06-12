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
    loadCart: (state, action) => {
      state.cart = action.payload;
    }
  }
});

export const { addToCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
