import {
  fetchIngredientsThunk,
  ingredientsSlice,
  initialState as ingredientsInitialState
} from './ingredients-slice';

export const ingredientsActions = {
  ...ingredientsSlice.actions,
  fetchIngredientsThunk
};
export { ingredientsSlice, ingredientsInitialState };
