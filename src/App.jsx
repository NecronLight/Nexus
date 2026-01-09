import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Menu from './components/Menu.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import DireitosConsumidor from './pages/Rights.jsx';
import CDCSearch from './pages/CDCSearch.jsx';
import ConsumerGuide from './pages/ConsumerGuide.jsx';

const App = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Menu />
      <div style={{ marginTop: '70px' }}>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<DashboardPage />} />

          {/* Nova página Direitos do Consumidor */}
          <Route path="/direitos" element={<DireitosConsumidor />} />

          {/* Página de Busca CDC */}
          <Route path="/buscar-cdc" element={<CDCSearch />} />

          {/* Página Guia do Consumidor */}
          <Route path="/guia" element={<ConsumerGuide />} />

          {/* 404 */}
          <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
