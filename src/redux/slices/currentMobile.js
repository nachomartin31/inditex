/* eslint-disable no-param-reassign */
/* @reduxjs/toolkit implements Immer to handle state change avoiding mutation
so it's safe to disable no-params-reassign on next line */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentMobile: {}
};
export const currentMobileSlice = createSlice({
  name: 'currentMobile',
  initialState,
  reducers: {
    loadCurrentMobile: (state, action) => {
      state.currentMobile = action.payload;
    }
  }
});

export const { loadCurrentMobile } = currentMobileSlice.actions;
export default currentMobileSlice.reducer;
