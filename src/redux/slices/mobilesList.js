/* eslint-disable no-param-reassign */
/* @reduxjs/toolkit implements Immer to handle state change avoiding mutation
so it's safe to disable no-params-reassign on next line */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobilesList: []
};
export const mobilesListSlice = createSlice({
  name: 'mobilesList',
  initialState,
  reducers: {
    loadMobilesList: (state, action) => {
      state.mobilesList = action.payload;
    }
  }
});

export const { loadMobilesList } = mobilesListSlice.actions;
export default mobilesListSlice.reducer;
