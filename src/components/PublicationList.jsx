import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/MascotaList.css'; 
import { PublicacionService } from '../services/publicacionService';

const PublicacionList = () => {
  const navigate = useNavigate(); 

  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        setLoading(true);
        const data = await PublicacionService.getAll();
        setPublicaciones(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  const publicacionesFiltradas = publicaciones.filter(publicacion => {
    const tipo = publicacion.tipoPublicacion?.toUpperCase() || '';
    if (filtro === 'perdidos' && tipo !== 'PERDIDA' && tipo !== 'PERDIDO') return false;
    if (filtro === 'encontrados' && tipo !== 'ENCONTRADA' && tipo !== 'ENCONTRADO') return false;
    if (busqueda) {
      const texto = busqueda.toLowerCase();
      const titulo = publicacion.titulo?.toLowerCase() || '';
      const direccion = publicacion.direccionReferencia?.toLowerCase() || '';
      const descripcion = publicacion.descripcion?.toLowerCase() || '';
      return titulo.includes(texto) || direccion.includes(texto) || descripcion.includes(texto);
    }
    return true;
  });

  if (loading) return <div className="loading-spinner">Cargando publicaciones...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="mascota-list-container">
      <div className="mascota-list-header">
        <h2>📢 Tablón de Publicaciones</h2>
        <span className="mascota-list-count">{publicacionesFiltradas.length} {publicacionesFiltradas.length === 1 ? 'publicación' : 'publicaciones'}</span>
      </div>
      <div className="mascota-search">
        <span className="mascota-search-icon">🔍</span>
        <input type="text" placeholder="Buscar por título, ubicación o descripción..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      </div>
      <div className="mascota-filter-buttons">
        <button className={`filter-btn ${filtro === 'todos' ? 'active' : ''}`} onClick={() => setFiltro('todos')}>Todos</button>
        <button className={`filter-btn ${filtro === 'perdidos' ? 'active' : ''}`} onClick={() => setFiltro('perdidos')}>🐾 Se Buscan</button>
        <button className={`filter-btn ${filtro === 'encontrados' ? 'active' : ''}`} onClick={() => setFiltro('encontrados')}>✅ Encontrados</button>
      </div>

      {publicacionesFiltradas.length === 0 ? (
        <div className="no-results">
          <p>No hay publicaciones que coincidan con tu búsqueda</p>
          <button onClick={() => { setBusqueda(''); setFiltro('todos'); }}>Limpiar filtros</button>
        </div>
      ) : (
        <div className="mascota-grid">
          {publicacionesFiltradas.map((publicacion) => (
            <div key={publicacion.idPublicacion} className="mascota-card">
              <div className="mascota-card-image">
                <img src={publicacion.urlFoto || 'https://via.placeholder.com/300x200?text=Sin+Imagen'} alt={publicacion.titulo} />
                <span className={`mascota-card-status ${publicacion.tipoPublicacion === 'PERDIDA' ? 'status-perdido' : 'status-encontrado'}`}>
                  {publicacion.tipoPublicacion === 'PERDIDA' ? '🐾 Perdido' : '✅ Encontrado'}
                </span>
              </div>
              <div className="mascota-card-content">
                <h3>{publicacion.titulo}</h3>
                <div className="mascota-card-detail"><span>📍</span> {publicacion.direccionReferencia || 'Ubicación no especificada'}</div>
                {publicacion.descripcion && (
                  <div className="mascota-card-description">
                    "{publicacion.descripcion.length > 80 ? `${publicacion.descripcion.substring(0, 80)}...` : publicacion.descripcion}"
                  </div>
                )}
                <div className="mascota-card-contact">
                  <span>📞 {publicacion.nombreContacto} ({publicacion.telefonoContacto})</span>
                  <span className="mascota-card-date">{new Date(publicacion.fechaPublicacion).toLocaleDateString('es-CL')}</span>
                </div>

                <button 
                  className="ver-detalle-btn"
                  onClick={() => navigate(`/publicaciones/${publicacion.idPublicacion}`)}
                >
                  Ver más detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicacionList;
