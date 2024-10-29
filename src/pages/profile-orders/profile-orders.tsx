import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userOrdersActions } from '@slices';
import { userOrdersSelectors, userSelectors } from '@selectors';

export const ProfileOrders: FC = () => {
  const orders = useSelector(userOrdersSelectors.selectOrders);
  const isOrdersLoading = useSelector(userOrdersSelectors.selectIsLoading);
  const isLoading = useSelector(userSelectors.selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersActions.fetchOrdersThunk());
  }, []);

  return (
    <ProfileOrdersUI
      orders={orders}
      isOrdersLoading={isOrdersLoading || isLoading}
    />
  );
};
