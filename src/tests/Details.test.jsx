/* eslint-disable no-unused-vars */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '../utils/testUtils';

import Details from '../views/Details';

describe('Given a Header component', () => {
  describe('When rendered', () => {
    let fetchMobile;
    let useEffect;
    beforeEach(() => {
      fetchMobile = jest.fn().mockReturnValue({
        id: '123',
        brand: 'Acer',
        model: 'Z3',
        price: '200',
        imgUrl: 'http'
      });
      useEffect = jest.fn().mockReturnValue(fetchMobile());
      render(
        <Details />
      );
    });
    test('Then it should render "', () => {
      expect(fetchMobile).toHaveBeenCalled();
    });
  });
});
