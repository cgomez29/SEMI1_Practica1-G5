import { Routes, Route } from 'react-router-dom';

import { Navbar } from '../components/nav/Navbar';
import { AlbumPage, DashboardPage, PhotoPage, ProfilePage, UploadPage } from '../pages';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="p-5">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/photo" element={<PhotoPage />} />
          {/* <Route path="/auth/register" element={<RegisterPage />} /> */}

          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </div>
    </>
  );
};
