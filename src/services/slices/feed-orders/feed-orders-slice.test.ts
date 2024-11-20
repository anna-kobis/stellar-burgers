import { describe, test, expect } from '@jest/globals';
import { feedsApiMock } from '../apiMock';
import { TFeedOrdersSliceState } from './feed-orders-slice';
import { feedOrdersActions, feedOrdersSlice, feedOrdersInitialState } from '.';

describe('[feedOrdersSlice] проверка редьюсеров слайса', () => {
  const initialState: TFeedOrdersSliceState = feedOrdersInitialState;
  const error = new Error('test error');

  test('[#1] обработка экшена получения ленты заказов: pending', () => {
    const expectedState: TFeedOrdersSliceState = {
      ...initialState,
      isLoading: true
    };

    const newState = feedOrdersSlice.reducer(
      { ...initialState, error: error.message },
      feedOrdersActions.fetchFeedsThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] обработка экшена получения ленты заказов: rejected c ошибкой', () => {
    const expectedState: TFeedOrdersSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = feedOrdersSlice.reducer(
      { ...initialState, isLoading: true },
      feedOrdersActions.fetchFeedsThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] обработка экшена получения ленты заказов: rejected без ошибки', () => {
    const expectedState: TFeedOrdersSliceState = initialState;

    const newState = feedOrdersSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      feedOrdersActions.fetchFeedsThunk.rejected(new Error(''), '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] обработка экшена получения ленты заказов: fulfilled', () => {
    const expectedState: TFeedOrdersSliceState = {
      ...initialState,
      ...feedsApiMock
    };

    const newState = feedOrdersSlice.reducer(
      { ...initialState, isLoading: true },
      feedOrdersActions.fetchFeedsThunk.fulfilled(feedsApiMock, '')
    );

    expect(newState).toEqual(expectedState);
  });
});
