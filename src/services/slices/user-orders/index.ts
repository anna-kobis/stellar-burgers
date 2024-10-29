import { fetchOrdersThunk, userOrdersSlice } from './user-orders-slice';

export const userOrdersActions = {
  ...userOrdersSlice.actions,
  fetchOrdersThunk
};
export { userOrdersSlice };
