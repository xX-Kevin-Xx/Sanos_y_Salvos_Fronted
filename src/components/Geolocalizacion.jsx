import React, { useState, useEffect } from 'react';
import { geoService } from '../services/geolocalizacionApi';
import '../styles/Geolocalizacion.css';
import MapaInteractivo from './MapaInteractivo';

const Geolocalizacion = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('todos');
  const [selectedUbicacion, setSelectedUbicacion] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Cargar ubicaciones desde el backend al montar el componente
  useEffect(() => {
    cargarUbicaciones();
  }, []);

  // Cargar según filtro cuando cambie
  useEffect(() => {
    if (filtro === 'todos') {
      cargarUbicaciones();
    } else {
      cargarPorEstado(filtro);
    }
  }, [filtro]);

  const cargarUbicaciones = async () => {
    try {
      setLoading(true);
      const data = await geoService.getAll();
      setUbicaciones(data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar las ubicaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cargarPorEstado = async (estado) => {
    try {
      setLoading(true);
      const data = await geoService.getByEstado(estado);
      setUbicaciones(data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar las ubicaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar por estado (ya que el backend ya filtra, solo mostramos)
  const ubicacionesFiltradas = ubicaciones;

  // Estadísticas
  const total = ubicaciones.length;
  const perdidos = ubicaciones.filter(u => u.estado === 'perdido').length;
  const encontrados = ubicaciones.filter(u => u.estado === 'encontrado').length;

  const abrirModal = (ubicacion) => {
    setSelectedUbicacion(ubicacion);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setSelectedUbicacion(null);
  };

  const abrirEnGoogleMaps = (lat, lng, direccion) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  if (loading && ubicaciones.length === 0) {
    return (
      <div className="geo-container">
        <div className="loading-container">
          <p>Cargando ubicaciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="geo-container">
        <div className="error-container">
          <p>❌ {error}</p>
          <button onClick={cargarUbicaciones}>Reintentar</button>
        </div>
      </div>
    );
  }

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
            className={`geo-filter-btn ${filtro === 'perdido' ? 'active' : ''}`}
            onClick={() => setFiltro('perdido')}
          >
            🐾 Perdidos ({perdidos})
          </button>
          <button
            className={`geo-filter-btn ${filtro === 'encontrado' ? 'active' : ''}`}
            onClick={() => setFiltro('encontrado')}
          >
            ✅ Encontrados ({encontrados})
          </button>
        </div>
      </div>

      {/* Mapa*/}
      <div className="map-container">
        <MapaInteractivo ubicaciones={ubicacionesFiltradas} />
      </div>

      {/* Lista de ubicaciones */}
      <div className="ubicaciones-lista">
        <h3>📍 Reportes por ubicación</h3>

        {ubicacionesFiltradas.length === 0 ? (
          <div className="no-ubicaciones">
            <p>No hay reportes para mostrar con este filtro</p>
            {filtro !== 'todos' && (
              <button onClick={() => setFiltro('todos')}>
                Ver todos los reportes
              </button>
            )}
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
                  <img
                    src={ubic.fotoUrl || 'https://placehold.co/100x100/e2e8f0/4a5568?text=Mascota'}
                    alt={ubic.nombre}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/100x100/e2e8f0/4a5568?text=Mascota';
                    }}
                  />
                  <div>
                    <h4>{ubic.nombre}</h4>
                    <span className={`ubicacion-estado ${ubic.estado === 'perdido' ? 'estado-perdido' : 'estado-encontrado'
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
                  Reportado: {new Date(ubic.fechaReporte).toLocaleDateString('es-CL')}
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
              <img
                src={selectedUbicacion.fotoUrl || 'https://placehold.co/100x100/e2e8f0/4a5568?text=Mascota'}
                alt={selectedUbicacion.nombre}
                onError={(e) => {
                  e.target.src = 'https://placehold.co/100x100/e2e8f0/4a5568?text=Mascota';
                }}
              />
              <div>
                <h3>{selectedUbicacion.nombre}</h3>
                <span className={`ubicacion-estado ${selectedUbicacion.estado === 'perdido' ? 'estado-perdido' : 'estado-encontrado'
                  }`}>
                  {selectedUbicacion.estado === 'perdido' ? '🐾 Perdido' : '✅ Encontrado'}
                </span>
              </div>
            </div>

            <div className="modal-body">
              <p><strong>🐕 Tipo:</strong> {selectedUbicacion.tipo}</p>
              <p><strong>📍 Dirección:</strong> {selectedUbicacion.direccion}</p>
              {selectedUbicacion.descripcion && (
                <p><strong>📝 Descripción:</strong> {selectedUbicacion.descripcion}</p>
              )}
              <p><strong>📅 Fecha:</strong> {new Date(selectedUbicacion.fechaReporte).toLocaleDateString('es-CL')}</p>
              <p><strong>🗺️ Coordenadas:</strong> {selectedUbicacion.latitud}, {selectedUbicacion.longitud}</p>
            </div>

            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-primary"
                onClick={() => abrirEnGoogleMaps(selectedUbicacion.latitud, selectedUbicacion.longitud, selectedUbicacion.direccion)}
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