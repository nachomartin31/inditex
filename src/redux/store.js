import { configureStore } from '@reduxjs/toolkit';
import mobilesListReducer from './slices/mobilesList';
import filteredMobilesListReducer from './slices/filteredMobilesList';
import currentMobileReducer from './slices/currentMobile';
import cartSliceReducer from './slices/cartSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    mobilesList: mobilesListReducer,
    filteredMobilesList: filteredMobilesListReducer,
    currentMobile: currentMobileReducer,
    cart: cartSliceReducer
  }
});
