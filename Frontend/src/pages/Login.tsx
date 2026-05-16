import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Library, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('123Nahu');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5172/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Credenciales inválidas');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.usuario);
      localStorage.setItem('userRol', data.rol.toString());
      onLogin(); // Notify App about the login
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <motion.div 
        className="login-card glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <div className="logo-circle">
            <Library size={32} />
          </div>
          <h1>Bienvenido a LibroHub</h1>
          <p>Gestiona tu inventario con elegancia</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                className="input-field" 
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                className="input-field" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-msg">{error}</motion.p>}

          <button type="submit" className="btn-primary login-btn" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Entrar <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <span>¿No tienes cuenta? Contacta al administrador</span>
        </div>
      </motion.div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 2rem;
        }

        .login-background {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: var(--bg-color);
        }

        .blob {
          position: absolute;
          width: 500px;
          height: 500px;
          filter: blur(100px);
          opacity: 0.2;
          border-radius: 50%;
        }

        .blob-1 {
          background: var(--primary-color);
          top: -100px;
          right: -100px;
        }

        .blob-2 {
          background: #3b82f6;
          bottom: -100px;
          left: -100px;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          padding: 3rem 2.5rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .logo-circle {
          width: 64px;
          height: 64px;
          background: var(--primary-glow);
          color: var(--primary-color);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          border: 1px solid var(--primary-color);
        }

        .login-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .login-header p {
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
        }

        .login-form {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .input-wrapper .input-field {
          padding-left: 3rem;
        }

        .login-btn {
          width: 100%;
          justify-content: center;
          margin-top: 1rem;
          height: 48px;
        }

        .error-msg {
          color: #ef4444;
          font-size: 0.875rem;
          text-align: center;
        }

        .login-footer {
          margin-top: 2rem;
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
