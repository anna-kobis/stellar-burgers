import {
  fetchOrderByNumberThunk,
  fetchOrderBurgerThunk,
  ordersSlice
} from './orders-slice';

export const ordersActions = {
  ...ordersSlice.actions,
  fetchOrderByNumberThunk,
  fetchOrderBurgerThunk
};
export { ordersSlice };
