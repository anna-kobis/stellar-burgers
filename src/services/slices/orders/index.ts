import {
  fetchOrderByNumberThunk,
  fetchOrderBurgerThunk,
  ordersSlice,
  initialState as ordersInitialState
} from './orders-slice';

export const ordersActions = {
  ...ordersSlice.actions,
  fetchOrderByNumberThunk,
  fetchOrderBurgerThunk
};
export { ordersSlice, ordersInitialState };
