import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { constructorBurgerActions, ordersActions } from '@slices';
import {
  constructorBurgerSelectors,
  ordersSelectors,
  userSelectors
} from '@selectors';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    constructorBurgerSelectors.selectIngredients
  );

  const orderRequest = useSelector(ordersSelectors.selectIsLoading);
  const orderModalData = useSelector(ordersSelectors.selectNewOrder);
  const isUserChecked = useSelector(userSelectors.selectIsUserChecked);
  const user = useSelector(userSelectors.selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!user || !isUserChecked) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ing) => ing._id),
      constructorItems.bun._id
    ];

    dispatch(ordersActions.fetchOrderBurgerThunk(order)).finally(() => {
      dispatch(constructorBurgerActions.clearIngredients());
    });
  };

  const closeOrderModal = () => {
    dispatch(ordersActions.clearNewOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
