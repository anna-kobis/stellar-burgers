import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import { TThunkSliceState } from '../types';
import { FEED_ORDERS_SLICE_NAME } from '../slice-names';

export const fetchFeedsThunk = createAsyncThunk<TOrdersData>(
  `${FEED_ORDERS_SLICE_NAME}/fetchFeeds`,
  getFeedsApi
);

type TFeedOrdersSliceState = TThunkSliceState & TOrdersData;

const initialState: TFeedOrdersSliceState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const feedOrdersSlice = createSlice({
  name: FEED_ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});
