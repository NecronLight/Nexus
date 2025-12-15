import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RankingEmpresas = ({ data }) => {
    // Inverte a ordem para que o maior fique em cima (melhor visualização em barras horizontais)
    const sortedData = [...data].sort((a, b) => a.reclamacoes - b.reclamacoes);

    return (
        <div style={{ padding: '20px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>📈 Ranking: Empresas Mais Reclamadas (Total)</h3>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={sortedData} layout="vertical" margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                    <YAxis 
                        dataKey="nomeFantasia" 
                        type="category" 
                        fontSize={12} 
                        stroke="#333"
                        // Ajuste para evitar corte do nome da empresa
                        width={120}
                    />
                    <XAxis type="number" fontSize={12} />
                    <Tooltip formatter={(value) => [value.toLocaleString('pt-BR'), 'Reclamações']} />
                    <Bar dataKey="reclamacoes" fill="#f7c111ff" /> 
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default RankingEmpresas;