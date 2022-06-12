/* eslint-disable no-unused-vars */
import cartSliceReducer, { addToCart } from '../redux/slices/cartSlice';

describe('Given a cart reducer', () => {
  describe('Thas has a addToCart action', () => {
    describe('When addToCart is called', () => {
      test('Then cart should have a count property equal to 1', () => {
        const initialState = { cart: { count: 0 } };
        const action = addToCart({ count: 1 });
        const result = cartSliceReducer(initialState, action);
        expect(result).toEqual({ cart: { count: 1 } });
      });
    });
  });
});
