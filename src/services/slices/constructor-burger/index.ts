import {
  constructorBurgerSlice,
  initialState as constructorBurgerInitialState
} from './constructor-burger-slice';

export const constructorBurgerActions = {
  ...constructorBurgerSlice.actions
};
export { constructorBurgerSlice, constructorBurgerInitialState };
