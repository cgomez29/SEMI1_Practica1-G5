import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginRoutes } from './LoginRoutes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LoginRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};
