import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { CONSTRUCTOR_BURGER_SLICE_NAME } from '../slice-names';

export type TConstructorBurgerSliceState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};

export const initialState: TConstructorBurgerSliceState = {
  ingredients: [],
  bun: null
};

export const constructorBurgerSlice = createSlice({
  name: CONSTRUCTOR_BURGER_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') state.bun = action.payload;
        else state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    reorderIngredients: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    clearIngredients: (state) => (state = initialState)
  },
  selectors: {
    selectIngredients: (state) => state
  }
});
