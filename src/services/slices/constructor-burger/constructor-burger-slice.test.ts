import { describe, test, expect, afterAll } from '@jest/globals';
import { ingredientsApiMock } from '../apiMock';
import { TConstructorBurgerSliceState } from './constructor-burger-slice';
import {
  constructorBurgerActions,
  constructorBurgerSlice,
  constructorBurgerInitialState
} from '.';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => '5'
}));

describe('[constructorBurgerSlice] проверка редьюсеров слайса', () => {
  const initialState: TConstructorBurgerSliceState = {
    ingredients: [
      { ...ingredientsApiMock[2], id: '1' },
      { ...ingredientsApiMock[4], id: '2' },
      { ...ingredientsApiMock[7], id: '3' }
    ],
    bun: { ...ingredientsApiMock[0], id: '4' }
  };

  test('[#1] обработка экшена добавления ингредиента: начинки', () => {
    const expectedState: TConstructorBurgerSliceState = {
      ...initialState,
      ingredients: [
        ...initialState.ingredients,
        { ...ingredientsApiMock[5], id: '5' }
      ]
    };

    const newState = constructorBurgerSlice.reducer(
      initialState,
      constructorBurgerActions.addIngredient(ingredientsApiMock[5])
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] обработка экшена добавления ингредиента: булки', () => {
    const expectedState: TConstructorBurgerSliceState = {
      ...initialState,
      bun: { ...ingredientsApiMock[1], id: '5' }
    };

    const newState = constructorBurgerSlice.reducer(
      initialState,
      constructorBurgerActions.addIngredient(ingredientsApiMock[1])
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] обработка экшена удаления ингредиента', () => {
    const expectedState: TConstructorBurgerSliceState = {
      ...initialState,
      ingredients: [
        { ...ingredientsApiMock[2], id: '1' },
        { ...ingredientsApiMock[7], id: '3' }
      ]
    };

    const newState = constructorBurgerSlice.reducer(
      initialState,
      constructorBurgerActions.removeIngredient('2')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] обработка экшена изменения порядка ингредиентов', () => {
    const expectedState: TConstructorBurgerSliceState = {
      ...initialState,
      ingredients: [
        { ...ingredientsApiMock[7], id: '3' },
        { ...ingredientsApiMock[2], id: '1' },
        { ...ingredientsApiMock[4], id: '2' }
      ]
    };

    const newState = constructorBurgerSlice.reducer(
      initialState,
      constructorBurgerActions.reorderIngredients({ from: 2, to: 0 })
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#5] обработка экшена очистки ингредиентов', () => {
    const expectedState: TConstructorBurgerSliceState =
      constructorBurgerInitialState;

    const newState = constructorBurgerSlice.reducer(
      initialState,
      constructorBurgerActions.clearIngredients()
    );

    expect(newState).toEqual(expectedState);
  });
});
