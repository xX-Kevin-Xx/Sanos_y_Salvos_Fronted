// components/Geolocalizacion.jsx
import React, { useState } from 'react';
import { ubicacionesMock } from '../data/ubicacionesMock';
import '../styles/Geolocalizacion.css';

const Geolocalizacion = () => {
  const [filtro, setFiltro] = useState('todos'); // 'todos', 'perdidos', 'encontrados'
  const [selectedUbicacion, setSelectedUbicacion] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Filtrar ubicaciones por estado
  const ubicacionesFiltradas = ubicacionesMock.filter(ubic => {
    if (filtro === 'perdidos') return ubic.estado === 'perdido';
    if (filtro === 'encontrados') return ubic.estado === 'encontrado';
    return true;
  });

  // Estadísticas para el mapa
  const total = ubicacionesMock.length;
  const perdidos = ubicacionesMock.filter(u => u.estado === 'perdido').length;
  const encontrados = ubicacionesMock.filter(u => u.estado === 'encontrado').length;

  const abrirModal = (ubicacion) => {
    setSelectedUbicacion(ubicacion);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setSelectedUbicacion(null);
  };

  // Función para abrir Google Maps con las coordenadas
  const abrirEnGoogleMaps = (lat, lng, direccion) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="geo-container">
      {/* Header con estadísticas */}
      <div className="geo-header">
        <h2>
          <span>📍</span> Mapa de Reportes
        </h2>
        <div className="geo-controls">
          <button
            className={`geo-filter-btn ${filtro === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltro('todos')}
          >
            Todos ({total})
          </button>
          <button
            className={`geo-filter-btn ${filtro === 'perdidos' ? 'active' : ''}`}
            onClick={() => setFiltro('perdidos')}
          >
            🐾 Perdidos ({perdidos})
          </button>
          <button
            className={`geo-filter-btn ${filtro === 'encontrados' ? 'active' : ''}`}
            onClick={() => setFiltro('encontrados')}
          >
            ✅ Encontrados ({encontrados})
          </button>
        </div>
      </div>

      {/* Mapa (placeholder - después integrarás Leaflet o Google Maps) */}
      <div className="map-placeholder">
        <img
          src="https://static-maps.yandex.ru/1.x/?ll=-70.6506,-33.4372&size=600,400&z=12&l=map&pt=-70.6506,-33.4372,pm2rdm"
          alt="Mapa de ubicaciones"
          className="map-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/e2e8f0/4a5568?text=Mapa+de+Santiago";
          }}
        />
        <div className="map-note">
          📍 Mostrando {ubicacionesFiltradas.length} ubicaciones en Santiago 
          (integración con Google Maps/Leaflet próximamente)
        </div>
      </div>

      {/* Lista de ubicaciones */}
      <div className="ubicaciones-lista">
        <h3>📍 Reportes por ubicación</h3>
        
        {ubicacionesFiltradas.length === 0 ? (
          <div className="no-ubicaciones">
            <p>No hay reportes para mostrar con este filtro</p>
          </div>
        ) : (
          <div className="ubicaciones-grid">
            {ubicacionesFiltradas.map((ubic) => (
              <div
                key={ubic.id}
                className={`ubicacion-card ${selectedUbicacion?.id === ubic.id ? 'selected' : ''}`}
                onClick={() => abrirModal(ubic)}
              >
                <div className="ubicacion-card-header">
                  <img src={ubic.foto} alt={ubic.nombre} />
                  <div>
                    <h4>{ubic.nombre}</h4>
                    <span className={`ubicacion-estado ${
                      ubic.estado === 'perdido' ? 'estado-perdido' : 'estado-encontrado'
                    }`}>
                      {ubic.estado === 'perdido' ? '🐾 Perdido' : '✅ Encontrado'}
                    </span>
                  </div>
                </div>
                <p>
                  <span>📍</span> {ubic.direccion}
                </p>
                <p>
                  <span>🐕</span> {ubic.tipo}
                </p>
                <small>
                  Reportado: {new Date(ubic.fecha).toLocaleDateString('es-CL')}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalle */}
      {modalAbierto && selectedUbicacion && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarModal}>✕</button>
            
            <div className="modal-header">
              <img src={selectedUbicacion.foto} alt={selectedUbicacion.nombre} />
              <div>
                <h3>{selectedUbicacion.nombre}</h3>
                <span className={`ubicacion-estado ${
                  selectedUbicacion.estado === 'perdido' ? 'estado-perdido' : 'estado-encontrado'
                }`}>
                  {selectedUbicacion.estado === 'perdido' ? '🐾 Perdido' : '✅ Encontrado'}
                </span>
              </div>
            </div>
            
            <div className="modal-body">
              <p><strong>🐕 Tipo:</strong> {selectedUbicacion.tipo}</p>
              <p><strong>📍 Dirección:</strong> {selectedUbicacion.direccion}</p>
              <p><strong>📅 Fecha:</strong> {new Date(selectedUbicacion.fecha).toLocaleDateString('es-CL')}</p>
              <p><strong>🗺️ Coordenadas:</strong> {selectedUbicacion.lat}, {selectedUbicacion.lng}</p>
            </div>
            
            <div className="modal-actions">
              <button 
                className="modal-btn modal-btn-primary"
                onClick={() => abrirEnGoogleMaps(selectedUbicacion.lat, selectedUbicacion.lng, selectedUbicacion.direccion)}
              >
                🗺️ Ver en Google Maps
              </button>
              <button 
                className="modal-btn modal-btn-secondary"
                onClick={cerrarModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Geolocalizacion;