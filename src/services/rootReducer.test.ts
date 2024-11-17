import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect } from '@jest/globals';
import { rootReducer } from './rootReducer';
import {
  CONSTRUCTOR_BURGER_SLICE_NAME,
  FEED_ORDERS_SLICE_NAME,
  INGREDIENTS_SLICE_NAME,
  ORDERS_SLICE_NAME,
  USER_SLICE_NAME,
  USER_ORDERS_SLICE_NAME
} from './slices/slice-names';
import {
  constructorBurgerInitialState,
  feedOrdersInitialState,
  ingredientsInitialState,
  ordersInitialState,
  userInitialState,
  userOrdersInitialState
} from '@slices';

describe('[rootReducer] проверка инициализации', () => {
  test('проверка начального состояния хранилища', () => {
    const expectedInitialState = {
      [CONSTRUCTOR_BURGER_SLICE_NAME]: constructorBurgerInitialState,
      [FEED_ORDERS_SLICE_NAME]: feedOrdersInitialState,
      [INGREDIENTS_SLICE_NAME]: ingredientsInitialState,
      [ORDERS_SLICE_NAME]: ordersInitialState,
      [USER_SLICE_NAME]: userInitialState,
      [USER_ORDERS_SLICE_NAME]: userOrdersInitialState
    };
    const store = configureStore({ reducer: rootReducer });
    const expectedStoreInitialState = store.getState();

    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual(expectedInitialState);
    expect(initialState).toEqual(expectedStoreInitialState);
  });
});
