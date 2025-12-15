import React from "react";
import { Link } from "react-router-dom";
import "../styles/rights.css";

const rights = [
  {
    title: "Proteção à Vida, Saúde e Segurança",
    text: "Produtos e serviços não podem colocar o consumidor em risco. Riscos potenciais devem ser informados claramente.",
    icon: "🛡️",
  },
  {
    title: "Informação Clara e Completa",
    text: "Preço, composição, validade, riscos e características devem ser apresentados de forma verdadeira e acessível.",
    icon: "📝",
  },
  {
    title: "Publicidade Não Enganosa",
    text: "Anúncios devem ser honestos. Toda oferta feita pela empresa deve ser cumprida exatamente como anunciada.",
    icon: "🎯",
  },
  {
    title: "Reparação de Danos",
    text: "O consumidor tem direito à indenização em casos de danos materiais ou morais causados por produtos ou serviços.",
    icon: "💰",
  },
  {
    title: "Acesso a Órgãos de Defesa",
    text: "É garantido ao consumidor acesso fácil a canais como Procon, SAC e plataformas oficiais de atendimento.",
    icon: "📞",
  },
  {
    title: "Práticas Comerciais Leais",
    text: "Cláusulas abusivas são proibidas. O consumidor não pode ser submetido a condições injustas ou desequilibradas.",
    icon: "⚖️",
  },
  {
    title: "Direito de Arrependimento (7 dias)",
    text: "Compras online, telefone ou catálogo podem ser canceladas em até 7 dias, com reembolso total.",
    icon: "↩️",
  },
  {
    title: "Garantia e Troca",
    text: "Todo produto possui garantia. Se apresentar defeito, o fornecedor deve resolver em até 30 dias.",
    icon: "🔄",
  },
];

const DireitosConsumidor = () => {

  return (
    <div className="rights-page">
      <h1 className="rights-title">Direitos Básicos do Consumidor</h1>

      <p className="rights-desc">
        Conheça os principais direitos garantidos pelo Código de Defesa do Consumidor.
      </p>

      {/* GRID DE CARDS */}
      <div className="rights-grid">
        {rights.map((item, index) => (
          <div key={index} className="card">
            <div className="card-icon">{item.icon}</div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-text">{item.text}</p>
          </div>
        ))}
      </div>

      <br />

      {/* BOTÃO VOLTAR */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link to="/" className="back-btn">
          ⬅ Voltar ao Dashboard
        </Link>
      </div>
    </div>
  );
};

export default DireitosConsumidor;
