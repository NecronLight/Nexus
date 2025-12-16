import React, { useState, useMemo } from 'react';
import statesComplaintsData from '../data/statesComplaintsData.json';

const BrasilMapComplaints = () => {
  const [hoveredState, setHoveredState] = useState(null);

  // Calcula min e max para normalizar as cores
  const complaints = statesComplaintsData.statesComplaints.map(s => s.complaints);
  const minComplaints = Math.min(...complaints);
  const maxComplaints = Math.max(...complaints);

  // Função para obter cor baseada no número de reclamações
  const getColor = (complaintCount) => {
    const normalized = (complaintCount - minComplaints) / (maxComplaints - minComplaints);
    
    if (normalized < 0.25) {
      return '#4caf50'; // Verde
    } else if (normalized < 0.5) {
      return '#8bc34a'; // Verde-limão
    } else if (normalized < 0.75) {
      return '#ffc107'; // Amarelo
    } else if (normalized < 0.9) {
      return '#ff9800'; // Laranja
    } else {
      return '#f44336'; // Vermelho
    }
  };

  // Encontra o estado com os dados
  const stateData = useMemo(() => {
    return statesComplaintsData.statesComplaints.reduce((acc, state) => {
      acc[state.state] = state;
      return acc;
    }, {});
  }, []);

  // Cria um mapa de cores para cada estado
  const stateColors = useMemo(() => {
    const colors = {};
    statesComplaintsData.statesComplaints.forEach(state => {
      colors[state.state] = getColor(state.complaints);
    });
    return colors;
  }, []);

  // Agrupamento dos estados por região (ordenados alfabeticamente)
  const regions = {
    Norte: ['AC', 'AM', 'AP', 'MT', 'PA', 'RO', 'RR', 'TO'],
    Nordeste: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
    'Centro-Oeste': ['DF', 'GO', 'MS'],
    Sudeste: ['ES', 'MG', 'RJ', 'SP'],
    Sul: ['PR', 'RS', 'SC']
  };

  const StateButton = ({ stateCode }) => {
    const color = stateColors[stateCode];
    const state = stateData[stateCode];
    const isHovered = hoveredState === stateCode;

    return (
      <div
        key={stateCode}
        onMouseEnter={() => setHoveredState(stateCode)}
        onMouseLeave={() => setHoveredState(null)}
        style={{
          padding: '12px 16px',
          backgroundColor: color,
          border: '2px solid #ddd',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          boxShadow: isHovered ? '0 6px 16px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
          fontWeight: '600',
          fontSize: '13px',
          color: color === '#4caf50' || color === '#8bc34a' ? '#000' : '#fff',
          opacity: isHovered ? 1 : 0.9,
          textAlign: 'center',
          minWidth: '45px'
        }}
      >
        {stateCode}
      </div>
    );
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      maxWidth: '100%',
      width: '100%'
    }}>
      <h3 style={{ marginBottom: '20px' }}>🗺️ Número de reclamações por Estado brasileiro (em 2025)</h3>
      
      {/* Legenda de cores */}
      <div style={{ marginBottom: '25px', display: 'flex', gap: '15px', flexWrap: 'wrap', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#4caf50', borderRadius: '3px' }} />
          <span>Baixo ({minComplaints.toLocaleString('pt-BR')})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#8bc34a', borderRadius: '3px' }} />
          <span>Médio-Baixo</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#ffc107', borderRadius: '3px' }} />
          <span>Médio</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#ff9800', borderRadius: '3px' }} />
          <span>Médio-Alto</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#f44336', borderRadius: '3px' }} />
          <span>Alto ({maxComplaints.toLocaleString('pt-BR')})</span>
        </div>
      </div>

      {/* Container com duas colunas: Estados e Info */}
      <div style={{
        display: 'flex',
        gap: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        border: '1px solid #ddd',
        overflow: 'hidden'
      }}>
        {/* Coluna esquerda: Lista de estados */}
        <div style={{
          flex: 1,
          padding: '20px',
          minHeight: '400px'
        }}>
          {Object.entries(regions).map(([region, states]) => (
            <div key={region} style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                {region}
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
                gap: '12px'
              }}>
                {states.map(stateCode => (
                  <StateButton key={stateCode} stateCode={stateCode} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coluna direita: Informações do hover */}
        <div style={{
          width: '300px',
          padding: '30px 20px',
          backgroundColor: '#fff',
          borderLeft: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px'
        }}>
          {hoveredState && stateData[hoveredState] ? (
            <div style={{
              textAlign: 'center',
              animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: stateColors[hoveredState],
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '32px',
                color: stateColors[hoveredState] === '#4caf50' || stateColors[hoveredState] === '#8bc34a' ? '#000' : '#fff'
              }}>
                {hoveredState}
              </div>
              
              <strong style={{ fontSize: '16px', color: '#333', display: 'block', marginBottom: '12px' }}>
                {stateData[hoveredState].name}
              </strong>
              
              <div style={{ 
                fontSize: '24px', 
                marginBottom: '8px', 
                color: stateColors[hoveredState],
                fontWeight: '700'
              }}>
                {stateData[hoveredState].complaints.toLocaleString('pt-BR')}
              </div>
              
              <div style={{ 
                fontSize: '12px',
                color: '#999',
                marginBottom: '12px'
              }}>
                reclamações
              </div>

              <div style={{
                fontSize: '13px',
                color: stateColors[hoveredState],
                fontWeight: '600',
                padding: '8px 12px',
                backgroundColor: `${stateColors[hoveredState]}15`,
                borderRadius: '6px'
              }}>
                {((stateData[hoveredState].complaints / 
                  statesComplaintsData.statesComplaints.reduce((sum, s) => sum + s.complaints, 0)) * 100).toFixed(1)}% do total
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              color: '#999',
              fontSize: '14px'
            }}>
              Passe o mouse sobre um estado para ver os detalhes
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BrasilMapComplaints;
