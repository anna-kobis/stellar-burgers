import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';
import { TThunkSliceState } from '../types';
import { USER_ORDERS_SLICE_NAME } from '../slice-names';

export const fetchOrdersThunk = createAsyncThunk<TOrder[]>(
  `${USER_ORDERS_SLICE_NAME}/fetchOrders`,
  getOrdersApi
);

type TUserOrdersSliceState = TThunkSliceState & {
  orders: TOrder[];
};

const initialState: TUserOrdersSliceState = {
  orders: [],
  isLoading: false,
  error: null
};

export const userOrdersSlice = createSlice({
  name: USER_ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});
