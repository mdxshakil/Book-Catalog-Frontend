import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import Spinner from './Spinner';

interface IProps {
  children: ReactNode;
}

const PrivateRoutes = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <Spinner/>;
  }
  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoutes;
