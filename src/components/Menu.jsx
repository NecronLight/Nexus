import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const menuStyle = {
    position: 'fixed',
    top: 0,
    left: '12px',
    right: '12px',
    background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
    padding: '12px 24px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
    borderRadius: '12px',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    alignItems: 'center',
    backdropFilter: 'blur(10px)'
  };

  const logoStyle = {
    fontSize: '28px',
    fontWeight: 700,
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none'
  };

  const linksContainerStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  };

  const linkStyle = {
    color: '#333',
    textDecoration: 'none',
    fontSize: '15px',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    fontWeight: 500
  };

  return (
    <nav style={menuStyle}>
      <Link to="/" style={logoStyle}>
        📖 NEXUS
      </Link>
      <div style={linksContainerStyle}>
        <Link 
          to="/" 
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          dashboard
        </Link>
        <Link 
          to="/direitos" 
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          direitos
        </Link>
        <Link 
          to="/buscar-cdc" 
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          buscar no CDC
        </Link>
        <Link 
          to="/guia" 
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          passo a passo
        </Link>
      </div>
    </nav>
  );
};

export default Menu;
