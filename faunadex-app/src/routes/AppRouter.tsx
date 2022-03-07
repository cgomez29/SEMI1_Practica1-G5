import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { useAppSelector } from '../hooks/useRedux';
import { startLoadingAlbums } from '../redux/actions/album';
import { startProfile } from '../redux/actions/user';
import { AuthRoutes } from './AuthRoutes';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {
  const { logged } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logged) {
      dispatch(startProfile());
      dispatch(startLoadingAlbums());
    }
  }, [dispatch, logged]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoutes>
              <AuthRoutes />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <DashboardRoutes />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
