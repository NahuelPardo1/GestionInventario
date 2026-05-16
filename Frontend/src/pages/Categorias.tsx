import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tags,
  Plus,
  Trash2,
  Edit3,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface Categoria {
  id: number;
  nombre: string;
}

const Categorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Categoria | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchCategorias = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:5172/api/Categorias', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al cargar categorías');
      const data = await response.json();
      setCategorias(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:5172/api/Categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: newCategoryName })
      });

      if (!response.ok) throw new Error('Error al crear categoría');

      setSuccessMsg('Categoría creada exitosamente');
      setNewCategoryName('');
      setIsModalOpen(false);
      fetchCategorias();

      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.nombre.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5172/api/Categorias/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: editingCategory.nombre })
      });

      if (!response.ok) throw new Error('Error al actualizar categoría');

      setSuccessMsg('Categoría actualizada exitosamente');
      setIsEditModalOpen(false);
      setEditingCategory(null);
      fetchCategorias();

      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5172/api/Categorias/${categoryToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Error al eliminar categoría');
      
      setCategorias(categorias.filter(c => c.id !== categoryToDelete.id));
      setSuccessMsg('Categoría eliminada exitosamente');
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCategorias = categorias.filter(c =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="categorias-page"
    >
      <header className="page-header">
        <div>
          <div className="breadcrumb">
            <Tags size={14} /> <span>Administración</span>
          </div>
          <h1>Categorías</h1>
          <p>Gestiona las etiquetas y géneros de tus libros</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nueva Categoría
        </button>
      </header>

      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, height: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, scale: 0.95, y: -20, height: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="success-banner"
          >
            <div className="success-banner-content">
              <CheckCircle2 size={18} /> {successMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="table-controls glass-panel">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-panel table-container">
        {isLoading ? (
          <div className="loading-state">
            <Loader2 className="animate-spin" size={32} />
            <p>Cargando categorías...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <AlertCircle size={32} />
            <p>{error}</p>
            <button onClick={fetchCategorias}>Reintentar</button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th className="actions-column">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategorias.map((cat) => (
                <tr key={cat.id}>
                  <td className="id-cell">#{cat.id}</td>
                  <td className="name-cell">{cat.nombre}</td>
                  <td className="actions-cell">
                    <button
                      className="action-btn edit"
                      title="Editar"
                      onClick={() => {
                        setEditingCategory(cat);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      className="action-btn delete"
                      title="Eliminar"
                      onClick={() => {
                        setCategoryToDelete(cat);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCategorias.length === 0 && (
                <tr>
                  <td colSpan={3} className="empty-row">
                    No se encontraron categorías.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="modal-content glass-panel"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.05 }}
            >
              <h3>Nueva Categoría</h3>
              <form onSubmit={handleCreateCategory}>
                <div className="input-group">
                  <label>Nombre de la Categoría</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ej: Fantasía, Ciencia Ficción..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Guardar Categoría'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingCategory && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="modal-content glass-panel"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.05 }}
            >
              <h3>Editar Categoría</h3>
              <form onSubmit={handleEditCategory}>
                <div className="input-group">
                  <label>Nombre de la Categoría</label>
                  <input
                    type="text"
                    className="input-field"
                    value={editingCategory.nombre}
                    onChange={(e) => setEditingCategory({ ...editingCategory, nombre: e.target.value })}
                    autoFocus
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingCategory(null);
                  }}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Actualizar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && categoryToDelete && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="modal-content glass-panel"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.05 }}
            >
              <h3>Confirmar Eliminación</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                ¿Estás seguro de que deseas eliminar la categoría <strong>"{categoryToDelete.nombre}"</strong>? 
                Esta acción no se puede deshacer.
              </p>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setCategoryToDelete(null);
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn-primary" 
                  style={{ background: '#ef4444', borderColor: '#ef4444' }}
                  onClick={handleDeleteCategory}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Eliminar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .categorias-page {
          max-width: 900px;
          margin: 0 auto;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 2.25rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .success-banner {
          background: var(--primary-glow);
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          border-radius: 8px;
          margin-bottom: 1.5rem;
          overflow: hidden;
        }

        .success-banner-content {
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .table-controls {
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .search-wrapper {
          position: relative;
          max-width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-wrapper input {
          width: 100%;
          background: var(--surface-hover);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.6rem 1rem 0.6rem 2.8rem;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s;
        }

        .search-wrapper input:focus {
          border-color: var(--primary-color);
        }

        .table-container {
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .data-table th {
          padding: 1.25rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
          background: var(--surface-hover);
        }

        .data-table td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.95rem;
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .data-table tr:hover {
          background: var(--surface-hover);
          opacity: 0.8;
        }

        .id-cell {
          color: var(--text-muted);
          font-family: monospace;
          width: 80px;
        }

        .name-cell {
          font-weight: 500;
        }

        .actions-column {
          text-align: right;
        }

        .actions-cell {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .action-btn:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
        }

        .action-btn.delete:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .empty-row {
          text-align: center;
          padding: 3rem !important;
          color: var(--text-muted);
        }

        .loading-state, .error-state {
          padding: 4rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 2rem;
        }

        .modal-content {
          width: 100%;
          max-width: 450px;
          padding: 2rem;
          border: 1px solid var(--border-color);
        }

        .modal-content h3 {
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-secondary {
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background: var(--surface-hover);
          color: var(--text-primary);
        }
      `}</style>
    </motion.div>
  );
};

export default Categorias;
