import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './components/Inicio';
import PublicationList from './components/PublicationList';
import MascotaForm from './components/MascotaForm';
import PublicacionDetalle from './components/PublicacionDetalle';

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/publicaciones" element={<PublicationList />} />
          <Route path="/publicaciones/:id" element={<PublicacionDetalle />} />
          <Route path="/reportar" element={<MascotaForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;