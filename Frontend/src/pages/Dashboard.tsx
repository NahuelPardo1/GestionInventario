import React from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  Plus
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Libros', value: '1,284', icon: Book, trend: '+12%', color: '#10b981' },
    { label: 'Autores', value: '142', icon: Users, trend: '+3%', color: '#3b82f6' },
    { label: 'Ventas Mes', value: '$42,500', icon: TrendingUp, trend: '+18%', color: '#f59e0b' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard"
    >
      <header className="page-header">
        <div>
          <h1>Panel de Control</h1>
          <p>Bienvenido de nuevo, Nahuel. Aquí está el resumen de hoy.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> Nuevo Libro
        </button>
      </header>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            className="stat-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-value-row">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-trend">
                  <ArrowUpRight size={14} /> {stat.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel main-chart">
          <h3>Rendimiento Semanal</h3>
          <div className="placeholder-chart">
            {/* Visual placeholder for a chart */}
            <div className="chart-bar" style={{ height: '40%' }} />
            <div className="chart-bar" style={{ height: '70%' }} />
            <div className="chart-bar" style={{ height: '55%' }} />
            <div className="chart-bar" style={{ height: '90%' }} />
            <div className="chart-bar" style={{ height: '65%' }} />
            <div className="chart-bar" style={{ height: '80%' }} />
            <div className="chart-bar" style={{ height: '45%' }} />
          </div>
        </div>
        
        <div className="glass-panel recent-activity">
          <h3>Actividad Reciente</h3>
          <div className="activity-list">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="activity-item">
                <div className="activity-dot" />
                <div className="activity-info">
                  <p>Venta registrada: "Clean Code"</p>
                  <span>Hace {i * 10} minutos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
        }

        .page-header h1 {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: var(--text-secondary);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 0.25rem;
        }

        .stat-value-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .stat-trend {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary-color);
          display: flex;
          align-items: center;
          gap: 0.125rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .glass-panel h3 {
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .main-chart {
          padding: 1.5rem;
          min-height: 300px;
        }

        .placeholder-chart {
          height: 200px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 1rem;
          gap: 1rem;
        }

        .chart-bar {
          flex: 1;
          background: var(--primary-glow);
          border: 1px solid var(--primary-color);
          border-radius: 4px 4px 0 0;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .chart-bar:hover {
          opacity: 1;
        }

        .recent-activity {
          padding: 1.5rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          background: var(--primary-color);
          border-radius: 50%;
          margin-top: 0.4rem;
          box-shadow: 0 0 10px var(--primary-color);
        }

        .activity-info p {
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .activity-info span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </motion.div>
  );
};

export default Dashboard;
