import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home.jsx';
import AdminRegistration from './pages/AdminRegistration.jsx';
import AdminUpdate from './pages/AdminUpdate.jsx';

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #0b1020 0%, #0f172a 40%, #1e3a8a 100%)' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/registration" element={<AdminRegistration />} />
        <Route path="/admin/update" element={<AdminUpdate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}


