import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { TThunkSliceState } from '../types';
import { INGREDIENTS_SLICE_NAME } from '../slice-names';

export const fetchIngredientsThunk = createAsyncThunk<TIngredient[]>(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  getIngredientsApi
);

export type TIngredientsSliceState = TThunkSliceState & {
  ingredients: TIngredient[];
};

export const initialState: TIngredientsSliceState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});
