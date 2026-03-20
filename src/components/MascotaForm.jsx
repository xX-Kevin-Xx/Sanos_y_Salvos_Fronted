import React, { useState } from 'react';
import '../styles/MascotaForm.css';

const MascotaForm = ({ onMascotaCreada }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'perro',
    raza: '',
    color: '',
    tamaño: 'mediano',
    estado: 'perdido',
    ubicacion: '',
    descripcion: '',
    contacto: ''
  });

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    
    setTimeout(() => {
      console.log('Mascota reportada:', formData);
      
      setMensaje({
        tipo: 'success',
        texto: '✅ ¡Mascota reportada exitosamente! Pronto conectaremos con el backend real.'
      });
      
      setFormData({
        nombre: '',
        tipo: 'perro',
        raza: '',
        color: '',
        tamaño: 'mediano',
        estado: 'perdido',
        ubicacion: '',
        descripcion: '',
        contacto: ''
      });
      
      setEnviando(false);
      
      if (onMascotaCreada) onMascotaCreada();
      
      setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
    }, 1000);
  };

  return (
    <div className="mascota-form-container">
      <div className="mascota-form-header">
        <h2>Reportar Mascota</h2>
        <p>Completa el formulario para ayudar a encontrar una mascota</p>
      </div>
      
      {mensaje.texto && (
        <div className={`form-message ${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mascota-form">
        <div className="form-row">
          <div className="form-group">
            <label>
              Nombre <span className="required">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Luna"
              required
            />
          </div>
          
          <div className="form-group">
            <label>
              Tipo <span className="required">*</span>
            </label>
            <select name="tipo" value={formData.tipo} onChange={handleChange}>
              <option value="perro">🐕 Perro</option>
              <option value="gato">🐈 Gato</option>
              <option value="otro">🐾 Otro</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Raza</label>
            <input
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              placeholder="Ej: Labrador"
            />
          </div>
          
          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Ej: Marrón"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tamaño</label>
            <select name="tamaño" value={formData.tamaño} onChange={handleChange}>
              <option value="pequeño">Pequeño (menos de 5 kg)</option>
              <option value="mediano">Mediano (5-15 kg)</option>
              <option value="grande">Grande (más de 15 kg)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>
              Estado <span className="required">*</span>
            </label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="perdido">🐾 Perdido</option>
              <option value="encontrado">✅ Encontrado</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>
            Ubicación <span className="required">*</span>
          </label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            placeholder="Ej: Providencia, cerca del parque"
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Señas particulares, comportamiento, etc."
          />
        </div>

        <div className="form-group">
          <label>
            Contacto <span className="required">*</span>
          </label>
          <input
            type="text"
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
            placeholder="Teléfono o email"
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={enviando}
          >
            {enviando ? 'Enviando...' : '📢 Reportar Mascota'}
          </button>
          
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setFormData({
              nombre: '',
              tipo: 'perro',
              raza: '',
              color: '',
              tamaño: 'mediano',
              estado: 'perdido',
              ubicacion: '',
              descripcion: '',
              contacto: ''
            })}
          >
            Limpiar
          </button>
        </div>

        <div className="development-notice">
          <span>⚡</span>
          <span>Modo desarrollo - Los datos se guardan localmente</span>
        </div>
      </form>
    </div>
  );
};

export default MascotaForm;