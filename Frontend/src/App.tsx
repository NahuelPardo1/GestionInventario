import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Categorias from './pages/Categorias';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Update auth status when storage changes (e.g. on login)
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/libros" element={<div>Libros (Coming Soon)</div>} />
          <Route path="/autores" element={<div>Autores (Coming Soon)</div>} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ventas" element={<div>Ventas (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
