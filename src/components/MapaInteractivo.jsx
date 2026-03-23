import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corregir el problema de los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapaInteractivo = ({ ubicaciones, centro = [-33.4372, -70.6506], zoom = 12 }) => {
  return (
    <MapContainer
      center={centro}
      zoom={zoom}
      style={{ height: '400px', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {ubicaciones.map((ubic) => (
        <Marker
          key={ubic.id}
          position={[ubic.latitud, ubic.longitud]}
        >
          <Popup>
            <strong>{ubic.nombre}</strong><br />
            {ubic.tipo} • {ubic.estado === 'perdido' ? '🐾 Perdido' : '✅ Encontrado'}<br />
            {ubic.direccion}<br />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${ubic.latitud},${ubic.longitud}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#667eea' }}
            >
              Abrir en Google Maps →
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaInteractivo;