import React from 'react';

const DashboardHeader = () => {
    const headerStyle = {
        padding: '20px',
        textAlign: 'center',
        margin: '0',
        backgroundColor: 'transparent'
    };

    const inputStyle = {
        padding: '10px 14px',
        width: '100%',
        maxWidth: '400px',
        marginTop: '12px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        fontSize: '14px',
        fontFamily: 'inherit',
        outline: 'none',
        transition: 'border-color 0.2s ease'
    };

    const buttonStyle = {
        margin: '0 6px',
        padding: '8px 14px',
        border: '1px solid #ddd',
        backgroundColor: 'white',
        color: '#333',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderRadius: '4px'
    };

    return (
        <header style={headerStyle}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '28px', fontWeight: '600', color: '#333' }}>Número de reclamações de empresas em 2025</h2>
            <input 
                type="text" 
                placeholder="Buscar empresa ou setor..." 
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#0fbd0f'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <div style={{ marginTop: '16px' }}>
                <button 
                    style={buttonStyle}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#f0f0f0'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; }}
                >
                    Últimos 30 dias
                </button>
                <button 
                    style={buttonStyle}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#f0f0f0'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; }}
                >
                    6 Meses
                </button>
                <button 
                    style={buttonStyle}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#f0f0f0'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; }}
                >
                    Todos
                </button>
            </div>
        </header>
    );
};
export default DashboardHeader;