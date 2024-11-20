import { describe, test, expect } from '@jest/globals';
import { feedsApiMock } from '../apiMock';
import { TOrdersSliceState } from './orders-slice';
import { ordersActions, ordersSlice, ordersInitialState } from '.';

describe('[ordersSlice] проверка редьюсеров слайса', () => {
  const initialState: TOrdersSliceState = {
    ...ordersInitialState,
    previewOrder: feedsApiMock.orders[0]
  };
  const error = new Error('test error');
  const blankError = new Error('');
  const previewOrder = feedsApiMock.orders[2];
  const newOrder = feedsApiMock.orders[3];

  test('[#1] обработка экшена получения заказа по номеру: pending', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      isLoading: true,
      previewOrder: null
    };

    const newState = ordersSlice.reducer(
      { ...initialState, error: error.message },
      ordersActions.fetchOrderByNumberThunk.pending('', previewOrder.number)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] обработка экшена получения заказа по номеру: rejected c ошибкой', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = ordersSlice.reducer(
      { ...initialState, isLoading: true },
      ordersActions.fetchOrderByNumberThunk.rejected(
        error,
        '',
        previewOrder.number
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] обработка экшена получения заказа по номеру: rejected без ошибки', () => {
    const expectedState: TOrdersSliceState = initialState;

    const newState = ordersSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      ordersActions.fetchOrderByNumberThunk.rejected(
        blankError,
        '',
        previewOrder.number
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] обработка экшена получения заказа по номеру: fulfilled', () => {
    const expectedState: TOrdersSliceState = { ...initialState, previewOrder };

    const newState = ordersSlice.reducer(
      { ...initialState, isLoading: true },
      ordersActions.fetchOrderByNumberThunk.fulfilled(
        { orders: [previewOrder] },
        '',
        previewOrder.number
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#5] обработка экшена отправки заказа: pending', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      isLoading: true
    };

    const newState = ordersSlice.reducer(
      { ...initialState, error: error.message },
      ordersActions.fetchOrderBurgerThunk.pending('', newOrder.ingredients)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#6] обработка экшена отправки заказа: rejected c ошибкой', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = ordersSlice.reducer(
      { ...initialState, isLoading: true },
      ordersActions.fetchOrderBurgerThunk.rejected(
        error,
        '',
        newOrder.ingredients
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#7] обработка экшена отправки заказа: rejected без ошибки', () => {
    const expectedState: TOrdersSliceState = initialState;

    const newState = ordersSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      ordersActions.fetchOrderBurgerThunk.rejected(
        blankError,
        '',
        newOrder.ingredients
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#8] обработка экшена отправки заказа: fulfilled', () => {
    const expectedState: TOrdersSliceState = { ...initialState, newOrder };

    const newState = ordersSlice.reducer(
      { ...initialState, isLoading: true },
      ordersActions.fetchOrderBurgerThunk.fulfilled(
        { order: newOrder },
        '',
        newOrder.ingredients
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#9] обработка экшена очистки отправленного заказа', () => {
    const expectedState: TOrdersSliceState = initialState;

    const newState = ordersSlice.reducer(
      { ...initialState, newOrder },
      ordersActions.clearNewOrder()
    );

    expect(newState).toEqual(expectedState);
  });
});
