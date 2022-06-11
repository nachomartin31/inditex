/* eslint-disable no-param-reassign */
/* @reduxjs/toolkit implements Immer to handle state change avoiding mutation
so it's safe to disable no-params-reassign on next line */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredMobilesList: []
};
export const filteredMobilesListSlice = createSlice({
  name: 'filteredMobilesList',
  initialState,
  reducers: {
    filterMobilesList: (state, action) => {
      state.filteredMobilesList = action.payload;
    }
  }
});

export const { filterMobilesList } = filteredMobilesListSlice.actions;
export default filteredMobilesListSlice.reducer;
