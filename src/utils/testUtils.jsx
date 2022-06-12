/* eslint-disable react/prop-types */
// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import cartSliceReducer from '../redux/slices/cartSlice';
import currentMobileReducer from '../redux/slices/currentMobile';
import filteredMobilesListReducer from '../redux/slices/filteredMobilesList';
import mobilesListReducer from '../redux/slices/mobilesList';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        mobilesList: mobilesListReducer,
        filteredMobilesList: filteredMobilesListReducer,
        currentMobile: currentMobileReducer,
        cart: cartSliceReducer
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
