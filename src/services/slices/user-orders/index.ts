import {
  fetchOrdersThunk,
  userOrdersSlice,
  initialState as userOrdersInitialState
} from './user-orders-slice';

export const userOrdersActions = {
  ...userOrdersSlice.actions,
  fetchOrdersThunk
};
export { userOrdersSlice, userOrdersInitialState };
