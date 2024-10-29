import { FC } from 'react';

import { TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { feedOrdersSelectors } from '@selectors';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(feedOrdersSelectors.selectOrders);
  const feed = {
    total: useSelector(feedOrdersSelectors.selectTotal),
    totalToday: useSelector(feedOrdersSelectors.selectTotalToday)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
