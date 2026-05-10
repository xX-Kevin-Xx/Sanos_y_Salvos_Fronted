import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import '../styles/PublicacionDetalle.css'; 
import { PublicacionService } from '../services/publicacionService';

const PublicacionDetalle = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      if (!id) return; 
      
      try {
        setLoading(true);
        const data = await PublicacionService.getDetalleCompleto(id);
        setDatos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [id]);

  if (loading) return <div className="loading-detalle">Cargando detalles de la publicación... 🐾</div>;
  if (error) return <div className="error-detalle">❌ Error: {error}</div>;
  if (!datos) return <div className="error-detalle">No se encontró la publicación.</div>;

  const { publicacion, mascota } = datos;

  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'No especificada';
    return new Date(fechaString).toLocaleDateString('es-CL', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="detalle-container">

      <button className="btn-volver" onClick={() => navigate(-1)}>
        ⬅ Volver a la lista
      </button>

      <div className="detalle-card">
        <div className="detalle-header">
          <h2>{publicacion.titulo}</h2>
          <span className={`badge-estado ${publicacion.tipoPublicacion === 'PERDIDA' ? 'badge-perdida' : 'badge-encontrada'}`}>
            {publicacion.tipoPublicacion === 'PERDIDA' ? '🐾 Se Busca' : '✅ Encontrado'}
          </span>
        </div>
        <div className="detalle-content-grid">
          <div className="detalle-seccion">
            <h3>📝 Datos de la Mascota</h3>
            {mascota.error ? (
              <p className="mascota-error">⚠️ {mascota.error}</p>
            ) : (
              <ul className="detalle-lista">
                <li><strong>Nombre:</strong> {mascota.name || 'Desconocido'}</li>
                <li><strong>Especie:</strong> {mascota.species || 'No especificado'}</li>
                <li><strong>Color:</strong> {mascota.color || 'No especificado'}</li>
                <li><strong>Tamaño (kg aprox):</strong> {mascota.size || 'No especificado'}</li>
              </ul>
            )}
          </div>
          <div className="detalle-seccion">
            <h3>📍 Detalles del Reporte</h3>
            <ul className="detalle-lista">
              <li><strong>Fecha del suceso:</strong> {formatearFecha(publicacion.fechaExtravioOEncuentro)}</li>
              <li><strong>Ubicación:</strong> {publicacion.direccionReferencia}</li>
              <li><strong>Publicado el:</strong> {formatearFecha(publicacion.fechaPublicacion)}</li>
            </ul>
          </div>
        </div>
        <div className="detalle-seccion descripcion-seccion">
          <h3>Detalles Adicionales</h3>
          <p>{publicacion.descripcion || 'No se proporcionaron detalles adicionales.'}</p>
        </div>
        <div className="detalle-contacto">
          <h3>📞 Información de Contacto</h3>
          <div className="contacto-info">
            <p><strong>Contactar a:</strong> {publicacion.nombreContacto}</p>
            <p><strong>Teléfono:</strong> {publicacion.telefonoContacto}</p>
          </div>
          <a href={`https://wa.me/${publicacion.telefonoContacto?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default PublicacionDetalle;