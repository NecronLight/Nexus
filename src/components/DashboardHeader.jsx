import React from 'react';

const DashboardHeader = () => {
    // Estilos inline básicos para demonstração
    const headerStyle = {
        padding: '25px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
        margin: '20px'
    };
    const inputStyle = {
        padding: '10px',
        width: '80%',
        marginTop: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };

    return (
        <header style={headerStyle}>
            <h1 className="titulo-principal"><span className="titulo-text">CONTROLE DE RECLAMAÇÕES</span></h1>
            <input type="text" placeholder="Buscar Empresa ou Setor Específico (Ex: Claro, Bancos)" style={inputStyle} />
            <div style={{ marginTop: '15px' }}>
                <button style={{ margin: '0 8px', padding: '10px 18px', border: '2px solid #66b3ff', backgroundColor: 'transparent', color: '#66b3ff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '6px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#66b3ff'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#66b3ff'; }}>Últimos 30 dias</button>
                <button style={{ margin: '0 8px', padding: '10px 18px', border: '2px solid #66b3ff', backgroundColor: 'transparent', color: '#66b3ff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '6px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#66b3ff'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#66b3ff'; }}>6 Meses</button>
                <button style={{ margin: '0 8px', padding: '10px 18px', border: '2px solid #66b3ff', backgroundColor: 'transparent', color: '#66b3ff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '6px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#66b3ff'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#66b3ff'; }}>Todos</button>
            </div>
        </header>
    );
};
export default DashboardHeader;