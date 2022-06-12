import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import MobileMiniature from '../components/MobileMiniature';

describe('Given a Header component', () => {
  describe('When rendered', () => {
    test('Then it should render "Acer"', () => {
      const mobile = {
        id: '123',
        brand: 'Acer',
        model: 'Z3',
        price: '200',
        imgUrl: 'http'
      };
      render(
        <MobileMiniature mobile={mobile} />
      );
      expect(screen.getByText(/Acer/i)).toBeInTheDocument();
    });
  });
});
