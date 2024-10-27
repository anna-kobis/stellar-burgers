import { FC } from 'react';
import { useSelector } from '../../services/store';
import { userSelectors } from '@selectors';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.selectUser)?.name;

  return <AppHeaderUI userName={userName} />;
};
