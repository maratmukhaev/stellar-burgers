import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import {
  userSelector,
  isAuthCheckSelector
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthCheck = useSelector(isAuthCheckSelector);
  const user = useSelector(userSelector);
  const location = useLocation();

  if (!isAuthCheck) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
