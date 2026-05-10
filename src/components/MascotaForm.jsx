import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MascotaForm.css';
import { PublicacionService } from '../services/publicacionService';

const MascotaForm = () => {
  const navigate = useNavigate(); // 🚀 Hook de navegación

  const [formData, setFormData] = useState({
    titulo: '', nombre: '', tipo: 'Perro', color: '',
    tamaño: 'mediano', estado: 'perdido', ubicacion: '',
    fecha: new Date().toISOString().split('T')[0], 
    descripcion: '', nombreContacto: '', telefonoContacto: ''
  });

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje({ tipo: '', texto: '' });
    
    try {
      const payloadBFF = {
        titulo: formData.titulo, nombre: formData.nombre,
        tipo: formData.tipo, color: formData.color,
        tamaño: formData.tamaño === 'pequeño' ? 5.0 : formData.tamaño === 'mediano' ? 15.0 : 30.0,
        estado: formData.estado, ubicacion: formData.ubicacion,
        fecha: formData.fecha, descripcion: formData.descripcion,
        nombreContacto: formData.nombreContacto, telefonoContacto: formData.telefonoContacto,
        usuarioId: "2df6d4ba-ef5e-4ad3-a148-ecb48ff8f933", 
        latitud: -33.68, longitud: -71.21
      };

      await PublicacionService.crearReporteOrquestado(payloadBFF);

      setMensaje({
        tipo: 'success',
        texto: '✅ ¡Reporte publicado exitosamente! Redirigiendo...'
      });
      
      setTimeout(() => {
        navigate('/publicaciones');
      }, 2000);

    } catch (error) {
      console.error("Error al crear el reporte:", error);
      setMensaje({
        tipo: 'error',
        texto: `❌ Error al guardar: ${error.response?.data?.message || error.message}`
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="mascota-form-container">
      <div className="mascota-form-header">
        <h2>Reportar Mascota</h2>
        <p>Completa el formulario para ayudar a encontrar una mascota</p>
      </div>
      
      {mensaje.texto && (
        <div 
          className={`form-message ${mensaje.tipo === 'success' ? 'form-message-success' : 'form-message-error'}`} 
          style={{ 
            padding: '10px', marginBottom: '15px', borderRadius: '5px', 
            backgroundColor: mensaje.tipo === 'success' ? '#d4edda' : '#f8d7da',
            color: mensaje.tipo === 'success' ? '#155724' : '#721c24'
          }}
        >
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mascota-form">
        <div className="form-group">
          <label>Título del reporte <span className="required">*</span></label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Ej: Busco a mi perrito Luna" required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre de la mascota <span className="required">*</span></label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Tipo <span className="required">*</span></label>
            <select name="tipo" value={formData.tipo} onChange={handleChange}>
              <option value="Perro">🐕 Perro</option>
              <option value="Gato">🐈 Gato</option>
              <option value="Otro">🐾 Otro</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Color</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tamaño</label>
            <select name="tamaño" value={formData.tamaño} onChange={handleChange}>
              <option value="pequeño">Pequeño (menos de 5 kg)</option>
              <option value="mediano">Mediano (5-15 kg)</option>
              <option value="grande">Grande (más de 15 kg)</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Estado <span className="required">*</span></label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="perdido">🐾 Se Busca</option>
              <option value="encontrado">✅ Encontrado</option>
            </select>
          </div>
          <div className="form-group">
            <label>Fecha de extravío/encuentro <span className="required">*</span></label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label>Ubicación de referencia <span className="required">*</span></label>
          <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descripción detallada</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Tu Nombre <span className="required">*</span></label>
            <input type="text" name="nombreContacto" value={formData.nombreContacto} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Teléfono <span className="required">*</span></label>
            <input type="text" name="telefonoContacto" value={formData.telefonoContacto} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-actions" style={{ marginTop: '20px' }}>
          <button type="submit" className="btn-primary" disabled={enviando} style={{ width: '100%', padding: '12px', fontSize: '16px' }}>
            {enviando ? 'Guardando reporte...' : '📢 Publicar Reporte'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MascotaForm;