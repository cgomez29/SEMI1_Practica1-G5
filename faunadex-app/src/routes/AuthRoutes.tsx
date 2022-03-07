import { Routes, Route } from 'react-router-dom';

import { NavbarLogin } from '../components/nav/NavbarLogin';
import { LoginPage, RegisterPage } from '../pages';

export const AuthRoutes = () => {
  return (
    <>
      <NavbarLogin />
      <div className="p-5">
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="*" element={<LoginPage />} />
          {/* <Route path="*" element={<Navigate to="/auth/login" />} /> */}
        </Routes>
      </div>
    </>
  );
};
