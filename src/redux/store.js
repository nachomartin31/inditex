import { configureStore } from '@reduxjs/toolkit';
import mobilesListReducer from './slices/mobilesList';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    mobilesList: mobilesListReducer
  }
});
