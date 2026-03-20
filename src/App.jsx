import React, { useState } from 'react';
import Layout from './components/Layout';
import Inicio from './components/Inicio';
import MascotaList from './components/MascotaList';
import MascotaForm from './components/MascotaForm';
import Geolocalizacion from './components/Geolocalizacion'

function App() {
  const [vista, setVista] = useState('inicio');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMascotaCreada = () => {
    setRefreshKey(prev => prev + 1);
    setVista('lista');
  };

  const renderVista = () => {
    switch(vista) {
      case 'inicio':
        return <Inicio onNavigate={setVista} />;
      case 'lista':
        return <MascotaList key={refreshKey} />;
      case 'formulario':
        return <MascotaForm onMascotaCreada={handleMascotaCreada} />;
      case 'geolocalizacion':
        return <Geolocalizacion />;
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