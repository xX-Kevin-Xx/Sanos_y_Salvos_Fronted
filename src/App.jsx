import React, { useState } from 'react';
import Layout from './components/Layout';
import Inicio from './components/Inicio';
import PublicationList from './components/PublicationList';
import MascotaForm from './components/MascotaForm';
import Geolocalizacion from './components/Geolocalizacion';
import PublicacionDetalle from './components/PublicacionDetalle'; 
function App() {
  const [vista, setVista] = useState('inicio');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  const handleMascotaCreada = () => {
    setRefreshKey(prev => prev + 1);
    setVista('lista');
  };

  const handleVerDetalle = (id) => {
    setIdSeleccionado(id);
    setVista('detalle');
  };

  const renderVista = () => {
    switch(vista) {
      case 'inicio':
        return <Inicio onNavigate={setVista} />;
      case 'lista':
        return <PublicationList key={refreshKey} onVerDetalle={handleVerDetalle} />;
      case 'formulario':
        return <MascotaForm onMascotaCreada={handleMascotaCreada} />;
      case 'geolocalizacion':
        return <Geolocalizacion />;
      case 'detalle':
        return <PublicacionDetalle id={idSeleccionado} onVolver={() => setVista('lista')} />;
      default:
        return <Inicio onNavigate={setVista} />;
    }
  };

  return (
    <Layout currentView={vista} onNavigate={setVista}>
      {renderVista()}
    </Layout>
  );
}

export default App;