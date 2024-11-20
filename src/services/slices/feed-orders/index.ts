import {
  fetchFeedsThunk,
  feedOrdersSlice,
  initialState as feedOrdersInitialState
} from './feed-orders-slice';

export const feedOrdersActions = {
  ...feedOrdersSlice.actions,
  fetchFeedsThunk
};
export { feedOrdersSlice, feedOrdersInitialState };
