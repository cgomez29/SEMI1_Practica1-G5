import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';

interface Props {
  children?: ReactElement | ReactElement[];
}

export const PublicRoutes = ({ children }: Props) => {
  const { logged } = useAppSelector((state) => state.auth);
  return <>{logged ? <Navigate to="/" /> : children}</>;
};
