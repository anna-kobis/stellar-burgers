import { describe, test, expect } from '@jest/globals';
import { ingredientsApiMock } from '../apiMock';
import { TIngredientsSliceState } from './ingredients-slice';
import {
  ingredientsActions,
  ingredientsSlice,
  ingredientsInitialState
} from '.';

describe('[ingredientsSlice] проверка редьюсеров слайса', () => {
  const initialState: TIngredientsSliceState = ingredientsInitialState;
  const error = new Error('test error');

  test('[#1] обработка экшена получения ингредиентов: pending', () => {
    const expectedState: TIngredientsSliceState = {
      ...initialState,
      isLoading: true
    };

    const newState = ingredientsSlice.reducer(
      { ...initialState, error: error.message },
      ingredientsActions.fetchIngredientsThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] обработка экшена получения ингредиентов: rejected c ошибкой', () => {
    const expectedState: TIngredientsSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = ingredientsSlice.reducer(
      { ...initialState, isLoading: true },
      ingredientsActions.fetchIngredientsThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] обработка экшена получения ингредиентов: rejected без ошибки', () => {
    const expectedState: TIngredientsSliceState = initialState;

    const newState = ingredientsSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      ingredientsActions.fetchIngredientsThunk.rejected(new Error(''), '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] обработка экшена получения ингредиентов: fulfilled', () => {
    const expectedState: TIngredientsSliceState = {
      ...initialState,
      ingredients: ingredientsApiMock
    };

    const newState = ingredientsSlice.reducer(
      { ...initialState, isLoading: true },
      ingredientsActions.fetchIngredientsThunk.fulfilled(ingredientsApiMock, '')
    );

    expect(newState).toEqual(expectedState);
  });
});
