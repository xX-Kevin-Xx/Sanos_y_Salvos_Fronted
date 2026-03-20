import React from 'react';
import '../styles/Layout.css';

const Layout = ({ children, currentView, onNavigate }) => {
  return (
    <>
      <header className="layout-header">
        <div className="layout-header-content">
          <div className="layout-logo">
            <h1>
              <span>🐕</span> Sanos y Salvos
            </h1>
            <p>Plataforma inteligente para la localización de mascotas perdidas</p>
          </div>
          <div className="layout-header-image">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=100"
              alt="Mascota feliz"
              style={{ borderRadius: '50%', width: '60px', height: '60px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </header>

      <nav className="layout-nav">
        <div className="layout-nav-content">
          <ul className="layout-nav-list">
            <li
              className={`layout-nav-item ${currentView === 'inicio' ? 'active' : ''}`}
              onClick={() => onNavigate('inicio')}
            >
              🏠 Inicio
            </li>
            <li
              className={`layout-nav-item ${currentView === 'lista' ? 'active' : ''}`}
              onClick={() => onNavigate('lista')}
            >
              📋 Ver Mascotas
            </li>
            <li
              className={`layout-nav-item ${currentView === 'formulario' ? 'active' : ''}`}
              onClick={() => onNavigate('formulario')}
            >
              ➕ Reportar Mascota
            </li>
            <li
              className={`layout-nav-item ${currentView === 'geolocalizacion' ? 'active' : ''}`}
              onClick={() => onNavigate('geolocalizacion')}
            >
              🗺️ Mapa
            </li>
          </ul>
        </div>
      </nav>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <div className="layout-footer-content">
          <p>🐾 Sanos y Salvos - Ayudando a reunir familias desde 2024</p>
          <div className="development-badge">
            <span className="development-badge-dot"></span>
            <span>Modo desarrollo - Datos locales</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;