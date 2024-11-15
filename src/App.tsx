import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Apps from './pages/Apps';
import Layout from './components/Layout';
import RNCList from './pages/RNCList';
import RNCDetail from './pages/RNCDetail';
import RNCEdit from './pages/RNCEdit';
import Reports from './pages/Reports';
import Team from './pages/Team';
import Settings from './pages/Settings';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/apps" element={
            <PrivateRoute>
              <Apps />
            </PrivateRoute>
          } />
          <Route path="/quality" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="rnc" replace />} />
            <Route path="rnc" element={<RNCList />} />
            <Route path="rnc/:id" element={<RNCDetail />} />
            <Route path="rnc/:id/edit" element={<RNCEdit />} />
            <Route path="reports" element={<Reports />} />
            <Route path="team" element={<Team />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;