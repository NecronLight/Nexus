import React, { useState } from "react";
import { Link } from "react-router-dom";
import guideData from "../data/guideData.json";
import "../styles/consumer-guide.css";

const ConsumerGuide = () => {
  const [selectedType, setSelectedType] = useState("produtos");
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (id) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  return (
    <div className="guide-page">
      <h1 className="guide-title">Guia Prático do Consumidor</h1>

      <p className="guide-desc">
        Siga o caminho passo a passo para resolver sua reclamação, desde o primeiro contato até a resolução final
      </p>

      {/* FILTRO POR TIPO DE PROBLEMA */}
      <div className="filter-container">
        <h3 className="filter-label">Tipo de Problema:</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${selectedType === "produtos" ? "active" : ""}`}
            onClick={() => setSelectedType("produtos")}
          >
            📦 Produto
          </button>
          <button
            className={`filter-btn ${selectedType === "servicos" ? "active" : ""}`}
            onClick={() => setSelectedType("servicos")}
          >
            🔧 Serviço
          </button>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="timeline-container">
        {guideData.guiaEtapas.map((step) => (
          <div key={step.id} className="timeline-item">
            {/* CONECTOR */}
            {step.id < guideData.guiaEtapas.length && <div className="timeline-line"></div>}

            {/* ETAPA */}
            <div className="timeline-step">
              <div className="step-number">{step.numero}</div>

              <div
                className={`step-content ${expandedStep === step.id ? "expanded" : ""}`}
                onClick={() => toggleStep(step.id)}
              >
                <div className="step-header">
                  <span className="step-icon">{step.icone}</span>
                  <div className="step-info">
                    <h3 className="step-title">{step.titulo}</h3>
                    <p className="step-description">{step.descricao}</p>
                  </div>
                  <span className={`expand-icon ${expandedStep === step.id ? "rotated" : ""}`}>
                    ▼
                  </span>
                </div>

                {/* CONTEÚDO EXPANDIDO */}
                {expandedStep === step.id && (
                  <div className="step-details">
                    <div className="detail-section">
                      <h4 className="detail-content">
                        {selectedType === "produtos" ? step.produtos.conteudo : step.servicos.conteudo}
                      </h4>
                      <div className="detail-box">
                        <strong>📌 Informação importante:</strong>
                        <p>
                          {selectedType === "produtos" ? step.produtos.prazos : step.servicos.prazos}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
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

export default ConsumerGuide;
