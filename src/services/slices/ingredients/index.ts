import { fetchIngredientsThunk, ingredientsSlice } from './ingredients-slice';

export const ingredientsActions = {
  ...ingredientsSlice.actions,
  fetchIngredientsThunk
};
export { ingredientsSlice };
