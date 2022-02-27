import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/nav/Navbar';
import { DashboardPage } from '../pages/DashboardPage';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="p-5">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/auth/register" element={<RegisterPage />} /> */}

          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </div>
    </>
  );
};
