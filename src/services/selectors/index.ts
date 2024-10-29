import { RootState } from '../store';
import {
  constructorBurgerSlice,
  feedOrdersSlice,
  ingredientsSlice,
  ordersSlice,
  userSlice,
  userOrdersSlice
} from '@slices';

export const constructorBurgerSelectors = constructorBurgerSlice.selectors;
export const feedOrdersSelectors = feedOrdersSlice.selectors;
export const ingredientsSelectors = ingredientsSlice.selectors;
export const ordersSelectors = ordersSlice.selectors;
export const userSelectors = userSlice.selectors;
export const userOrdersSelectors = userOrdersSlice.selectors;

export const orderInfoSelector = (number: string) => (state: RootState) => {
  if (state.feedOrders.orders.length) {
    const order = state.feedOrders.orders.find(
      (order) => order.number === Number(number)
    );

    if (order) return order;
  }

  if (state.userOrders.orders.length) {
    const order = state.userOrders.orders.find(
      (order) => order.number === Number(number)
    );

    if (order) return order;
  }

  if (state.orders.previewOrder?.number === Number(number)) {
    return state.orders.previewOrder;
  }

  return null;
};
