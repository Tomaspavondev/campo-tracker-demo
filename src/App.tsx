import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ComingSoon } from '@/pages/ComingSoon';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proximamente/:seccion" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
