import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ComingSoon } from '@/pages/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/proximamente/:seccion" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
