import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import KPIBox from '../components/KPIBox';
import RankingEmpresas from '../components/RankingEmpresas';
import DistribuicaoProblemas from '../components/DistribuicaoProblemas';
import BrasilMapComplaints from '../components/BrasilMapComplaints';
import dashboardData from '../data/dashboardData.json';

const DashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(dashboardData);
  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <DashboardHeader />
      
      <div style={{ padding: '20px' }}>
        {/* KPIs Section */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px', flexWrap: 'wrap' }}>
          <KPIBox 
            title="Total de Reclamações" 
            value={data.kpis.totalReclamacoes.toLocaleString('pt-BR')} 
            unit=""
            color="#f7c111ff"
          />
          <KPIBox 
            title="Índice de Solução" 
            value={(data.kpis.indiceSolucao * 100).toFixed(1)} 
            unit="%"
            color="#4caf50"
          />
          <KPIBox 
            title="Tempo Médio de Resposta" 
            value={data.kpis.tempoMedioRespostaDias} 
            unit=" dias"
            color="#2196f3"
          />
        </div>

        {/* Charts Section */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
          <RankingEmpresas data={data.rankingEmpresas} />
          <DistribuicaoProblemas />
        </div>

        {/* Brazil Map Section */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BrasilMapComplaints />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
