/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from '../utils/testUtils';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Header';
import mobilesList, { loadMobilesList } from '../redux/slices/mobilesList';

let loadMobiles;
let useEffect;
describe('Given a Header component', () => {
  describe('When it is rendered', () => {
    beforeEach(() => {
      loadMobiles = jest.fn().mockReturnValue([
        {
          id: '1', brand: 'A', model: '001', imgUrl: 'http'
        },
        {
          id: '2', brand: 'B', model: '02', imgUrl: 'http'
        }
      ]);
      useEffect = jest.fn().mockReturnValue(loadMobiles());
      render(
        <Header />
      );
    });
    test('Then loadMobiles should be called', () => {
      expect(loadMobiles).toHaveBeenCalled();
    });
  });
});
