import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Library, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  LogOut, 
  BookOpen, 
  LayoutDashboard,
  Menu,
  X,
  Tags,
  Sun,
  Moon,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName') || 'Usuario';
  const userRol = localStorage.getItem('userRol') === '1' ? 'Administrador' : 'Vendedor';
  const userInitial = userName.charAt(0).toUpperCase();

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (!newMode) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/libros', name: 'Inventario', icon: BookOpen },
    { path: '/autores', name: 'Autores', icon: Users },
    { path: '/categorias', name: 'Categorías', icon: Tags },
    { path: '/ventas', name: 'Ventas', icon: ShoppingCart },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRol');
    navigate('/login');
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <motion.aside 
        className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
      >
        <div className="sidebar-header">
          <Library className="logo-icon" size={28} />
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="logo-text"
            >
              LibroHub
            </motion.span>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.name}</span>}
                {isActive && <motion.div layoutId="active-pill" className="active-pill" />}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info-section">
            <div className="user-avatar-small">
              {userInitial}
            </div>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="user-details"
              >
                <span className="user-display-name">{userName}</span>
                <span className="user-role">{userRol}</span>
              </motion.div>
            )}
          </div>
          
          <div className="footer-actions">
            <button onClick={toggleTheme} className="theme-toggle-btn" title="Cambiar Tema">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              {isSidebarOpen && <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>}
            </button>
            <button onClick={handleLogout} className="logout-btn" title="Cerrar Sesión">
              <LogOut size={18} />
              {isSidebarOpen && <span>Salir</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <button 
            className="toggle-sidebar" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="header-right">
             <div className="header-date">
                {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
             </div>
          </div>
        </header>
        
        <div className="page-container">
          <Outlet />
        </div>
      </main>

      <style>{`
        .layout-container {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          background: var(--surface-color);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          height: 100vh;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }

        .logo-icon {
          color: var(--primary-color);
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: var(--text-secondary);
          position: relative;
          transition: all 0.2s;
        }

        .nav-item:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
        }

        .nav-item.active {
          color: var(--primary-color);
          background: var(--primary-glow);
        }

        .active-pill {
          position: absolute;
          left: -1rem;
          width: 4px;
          height: 20px;
          background: var(--primary-color);
          border-radius: 0 4px 4px 0;
        }

        .sidebar-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .user-info-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: var(--surface-hover);
          border-radius: 12px;
          margin-bottom: 0.5rem;
        }

        .user-avatar-small {
          width: 32px;
          height: 32px;
          min-width: 32px;
          background: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .user-display-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-transform: capitalize;
        }

        .user-role {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .footer-actions {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .theme-toggle-btn, .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .theme-toggle-btn:hover {
          color: var(--primary-color);
          background: var(--primary-glow);
        }

        .logout-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--bg-color);
        }

        .content-header {
          height: 64px;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          background: var(--header-bg);
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .toggle-sidebar {
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: 6px;
        }

        .toggle-sidebar:hover {
          background: var(--surface-hover);
          color: var(--text-primary);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .header-date {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-transform: capitalize;
        }

        .page-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
