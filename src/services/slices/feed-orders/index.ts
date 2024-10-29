import { fetchFeedsThunk, feedOrdersSlice } from './feed-orders-slice';

export const feedOrdersActions = {
  ...feedOrdersSlice.actions,
  fetchFeedsThunk
};
export { feedOrdersSlice };
