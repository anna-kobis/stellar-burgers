import { combineReducers } from '@reduxjs/toolkit';
import {
  constructorBurgerSlice,
  feedOrdersSlice,
  ingredientsSlice,
  ordersSlice,
  userSlice,
  userOrdersSlice
} from '@slices';

export const rootReducer = combineReducers({
  [constructorBurgerSlice.name]: constructorBurgerSlice.reducer,
  [feedOrdersSlice.name]: feedOrdersSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});
