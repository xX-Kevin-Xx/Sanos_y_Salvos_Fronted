import React from 'react';
import { mascotasMock } from '../data/mascotasMock';
import '../styles/Inicio.css';

const Inicio = ({ onNavigate }) => {
  const totalMascotas = mascotasMock.length;
  const perdidos = mascotasMock.filter(m => m.estado === 'perdido').length;
  const encontrados = mascotasMock.filter(m => m.estado === 'encontrado').length;

  return (
    <div className="inicio-container">
      <div className="inicio-hero">
        <h2>Bienvenido a Sanos y Salvos 🐾</h2>
        <p>
          Una plataforma inteligente para ayudar a reunir mascotas perdidas
          con sus familias
        </p>

        <div className="inicio-stats">
          <div className="stat-item">
            <span className="stat-number">{totalMascotas}</span>
            <span className="stat-label">Total Reportes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" style={{ color: '#e53e3e' }}>{perdidos}</span>
            <span className="stat-label">Mascotas Perdidas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" style={{ color: '#38a169' }}>{encontrados}</span>
            <span className="stat-label">Mascotas Encontradas</span>
          </div>
        </div>
      </div>

      <h3 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '2rem' }}>
        ¿Qué deseas hacer hoy?
      </h3>

      <div className="inicio-menu">
        {/* Módulo 1: Gestión de Mascotas (ACTIVO) */}
        <div className="menu-card">
          <div className="menu-card-icon">🐕</div>
          <h3>Gestión de Mascotas</h3>
          <p>
            Registra mascotas perdidas o encontradas, consulta reportes
            y mantén actualizada la información.
          </p>
          <button
            className="menu-card-button"
            onClick={() => onNavigate('lista')}
          >
            Ver Mascotas
          </button>
        </div>

        <div className="menu-card">
          <div className="menu-card-icon">📍</div>
          <h3>Sistema de Geolocalización</h3>
          <p>
            Visualiza en un mapa los reportes de mascotas perdidas y encontradas,
            identifica zonas con mayor incidencia.
          </p>
          <button
            className="menu-card-button"
            onClick={() => onNavigate('geolocalizacion')}
          >
            Ver Mapa
          </button>
        </div>

        {/* Módulo 3: Motor de Coincidencias (PRÓXIMAMENTE) */}
        <div className="menu-card coming-soon">
          <span className="coming-soon-badge">Próximamente</span>
          <div className="menu-card-icon">🤖</div>
          <h3>Motor de Coincidencias</h3>
          <p>
            Analiza reportes y encuentra posibles coincidencias entre mascotas
            perdidas y encontradas.
          </p>
          <button className="menu-card-button" disabled style={{ opacity: 0.5 }}>
            En desarrollo
          </button>
        </div>
      </div>

      {/* Botón rápido para reportar */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ color: '#718096', marginBottom: '1rem' }}>
          ¿Encontraste una mascota o perdiste la tuya?
        </p>
        <button
          onClick={() => onNavigate('formulario')}
          style={{
            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 3rem',
            borderRadius: '9999px',
            fontSize: '1.2rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(72, 187, 120, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Reportar Ahora
        </button>
      </div>
    </div>
  );
};

export default Inicio;