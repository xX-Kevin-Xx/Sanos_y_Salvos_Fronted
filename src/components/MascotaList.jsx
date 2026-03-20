import React, { useState } from 'react';
import { mascotasMock } from '../data/mascotasMock';
import '../styles/MascotaList.css';

const MascotaList = () => {
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const mascotasFiltradas = mascotasMock.filter(mascota => {
    if (filtro === 'perdidos' && mascota.estado !== 'perdido') return false;
    if (filtro === 'encontrados' && mascota.estado !== 'encontrado') return false;
    
    if (busqueda) {
      const texto = busqueda.toLowerCase();
      return mascota.nombre.toLowerCase().includes(texto) ||
             mascota.raza.toLowerCase().includes(texto) ||
             mascota.ubicacion.toLowerCase().includes(texto);
    }
    
    return true;
  });

  return (
    <div className="mascota-list-container">
      <div className="mascota-list-header">
        <h2>🐾 Mascotas Reportadas</h2>
        <span className="mascota-list-count">
          {mascotasFiltradas.length} {mascotasFiltradas.length === 1 ? 'reporte' : 'reportes'}
        </span>
      </div>

      {/* PRIMERO: Barra de búsqueda */}
      <div className="mascota-search">
        <span className="mascota-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre, raza o ubicación..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* SEGUNDO: Botones de filtro */}
      <div className="mascota-filter-buttons">
        <button
          className={`filter-btn ${filtro === 'todos' ? 'active' : ''}`}
          onClick={() => setFiltro('todos')}
        >
          Todos
        </button>
        <button
          className={`filter-btn ${filtro === 'perdidos' ? 'active' : ''}`}
          onClick={() => setFiltro('perdidos')}
        >
          🐾 Perdidos
        </button>
        <button
          className={`filter-btn ${filtro === 'encontrados' ? 'active' : ''}`}
          onClick={() => setFiltro('encontrados')}
        >
          ✅ Encontrados
        </button>
      </div>

      {mascotasFiltradas.length === 0 ? (
        <div className="no-results">
          <p>No hay mascotas que coincidan con tu búsqueda</p>
          <button onClick={() => { setBusqueda(''); setFiltro('todos'); }}>
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="mascota-grid">
          {mascotasFiltradas.map((mascota) => (
            <div key={mascota.id} className="mascota-card">
              <div className="mascota-card-image">
                <img src={mascota.foto} alt={mascota.nombre} />
                <span className={`mascota-card-status ${
                  mascota.estado === 'perdido' ? 'status-perdido' : 'status-encontrado'
                }`}>
                  {mascota.estado === 'perdido' ? '🐾 Perdido' : '✅ Encontrado'}
                </span>
              </div>
              
              <div className="mascota-card-content">
                <h3>{mascota.nombre}</h3>
                
                <div className="mascota-card-detail">
                  <span>🐕</span> {mascota.tipo} • {mascota.raza}
                </div>
                
                <div className="mascota-card-detail">
                  <span>🎨</span> {mascota.color}
                </div>
                
                <div className="mascota-card-detail">
                  <span>📏</span> Tamaño: {mascota.tamaño}
                </div>
                
                <div className="mascota-card-detail">
                  <span>📍</span> {mascota.ubicacion}
                </div>
                
                {mascota.descripcion && (
                  <div className="mascota-card-description">
                    "{mascota.descripcion}"
                  </div>
                )}
                
                <div className="mascota-card-contact">
                  <span>📞 {mascota.contacto}</span>
                  <span className="mascota-card-date">
                    {new Date(mascota.fechaReporte).toLocaleDateString('es-CL')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MascotaList;