import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedOrdersActions } from '@slices';
import { feedOrdersSelectors } from '@selectors';

export const Feed: FC = () => {
  const orders = useSelector(feedOrdersSelectors.selectOrders);
  const isOrdersLoading = useSelector(feedOrdersSelectors.selectIsLoading);
  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(feedOrdersActions.fetchFeedsThunk());
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (isOrdersLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
