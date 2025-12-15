import React from 'react';

const KPIBox = ({ title, value, unit, color }) => {
    const boxStyle = {
        flex: 1,
        borderLeft: `5px solid ${color}`,
        padding: '15px',
        margin: '10px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'left'
    };
    const valueStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
        color: color
    };

    return (
        <div style={boxStyle}>
            <small style={{ color: '#555' }}>{title}</small>
            <div style={valueStyle}>
                {value}{unit}
            </div>
        </div>
    );
};
export default KPIBox;