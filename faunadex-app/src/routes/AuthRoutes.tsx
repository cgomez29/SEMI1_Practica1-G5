import { Routes, Route } from 'react-router-dom';

import { NavbarLogin } from '../components/nav/NavbarLogin';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

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
