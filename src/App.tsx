import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute>{user => <Home user={user} />}</ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={<ProtectedRoute>{user => <Profile user={user} />}</ProtectedRoute>}
      />
    </Routes>
  );
}
