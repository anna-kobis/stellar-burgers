import { describe, test, expect } from '@jest/globals';
import { feedsApiMock } from '../apiMock';
import { TUserOrdersSliceState } from './user-orders-slice';
import { userOrdersActions, userOrdersSlice, userOrdersInitialState } from '.';

describe('[userOrdersSlice] проверка редьюсеров слайса', () => {
  const initialState: TUserOrdersSliceState = userOrdersInitialState;
  const error = new Error('test error');

  test('[#1] обработка экшена получения истории заказов: pending', () => {
    const expectedState: TUserOrdersSliceState = {
      ...initialState,
      isLoading: true
    };

    const newState = userOrdersSlice.reducer(
      { ...initialState, error: error.message },
      userOrdersActions.fetchOrdersThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] обработка экшена получения истории заказов: rejected c ошибкой', () => {
    const expectedState: TUserOrdersSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = userOrdersSlice.reducer(
      { ...initialState, isLoading: true },
      userOrdersActions.fetchOrdersThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] обработка экшена получения истории заказов: rejected без ошибки', () => {
    const expectedState: TUserOrdersSliceState = initialState;

    const newState = userOrdersSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      userOrdersActions.fetchOrdersThunk.rejected(new Error(''), '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] обработка экшена получения истории заказов: fulfilled', () => {
    const expectedState: TUserOrdersSliceState = {
      ...initialState,
      orders: feedsApiMock.orders
    };

    const newState = userOrdersSlice.reducer(
      { ...initialState, isLoading: true },
      userOrdersActions.fetchOrdersThunk.fulfilled(feedsApiMock.orders, '')
    );

    expect(newState).toEqual(expectedState);
  });
});
