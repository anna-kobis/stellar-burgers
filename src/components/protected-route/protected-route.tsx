import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProtectedRouteProps } from './type';
import { useSelector } from '../../services/store';
import { userSelectors } from '@selectors';
import { Preloader } from '@ui';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  isPublic
}) => {
  const isUserChecked = useSelector(userSelectors.selectIsUserChecked);
  const user = useSelector(userSelectors.selectUser);
  const location = useLocation();

  if (!isUserChecked) return <Preloader />;

  if (!isPublic && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };

    return (
      <Navigate
        replace
        to={from}
        state={{ background: from?.state?.background }}
      />
    );
  }

  return children;
};
