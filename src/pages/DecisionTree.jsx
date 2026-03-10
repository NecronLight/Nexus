import React, { useState, useCallback } from "react";
import treeData from "../data/decisionTreeData.json";
import "../styles/decision-tree.css";

const formatarData = (dataISO) => {
  if (!dataISO) return "Não informada";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
};

const formatarValor = (valor) => {
  if (!valor) return "Não informado";
  return parseFloat(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const GeradorDePeticao = ({ dados, onVoltar, onReiniciar }) => {
  const descricao = dados.descricaoProduto || dados.descricaoServico || "Não especificado";
  const valor = dados.valorProduto || dados.valorServico;
  const data = dados.dataCompra || dados.dataContratacao;

  const gerarTexto = () => {
    return `NOTIFICAÇÃO EXTRAJUDICIAL

Data: ${new Date().toLocaleDateString("pt-BR")}

À empresa responsável,

Prezados Senhores,

Venho por meio desta formalizar reclamação de consumo, com fundamento no Código de Defesa do Consumidor (Lei nº 8.078/1990).

OBJETO DA RECLAMAÇÃO:
- Descrição: ${descricao}
- Valor: ${formatarValor(valor)}
- Data da aquisição/contratação: ${formatarData(data)}

RELATÓRIO DA OCORRÊNCIA:
- Categoria: ${dados.inicio || "Não especificado"}
- Natureza: ${dados.naturezaProduto || dados.naturezaServico || "Não especificado"}
- Canal de Aquisição: ${dados.canalCompra || "Não especificado"}
- Problema Identificado: ${dados.tipoProblema || dados.tipoProblemaServico || "Não especificado"}
- Solução Pretendida: ${dados.acaoDesejadaPadrao || dados.acaoDesejadaPadraoServico || "Não especificado"}

FUNDAMENTAÇÃO LEGAL:
${dados.fundamento || "Normas gerais do Código de Defesa do Consumidor (CDC)."}

SOLICITAÇÃO:
Diante do exposto, solicito a imediata resolução da demanda acima relatada, dentro do prazo legal de 30 (trinta) dias, conforme previsto no CDC.

O não atendimento desta notificação ensejará a adoção das medidas cabíveis, incluindo a abertura de reclamação junto aos órgãos de proteção ao consumidor (PROCON) e, se necessário, a propositura de ação judicial competente.

Atenciosamente,
[Nome do Consumidor]
[CPF]
[Endereço]
[Telefone / E-mail]`;
  };

  const copiarTexto = () => {
    navigator.clipboard.writeText(gerarTexto());
  };

  return (
    <div className="dt-page">
      <h1 className="titulo-principal">
        <span className="titulo-text">Criando sua Reclamação</span>
      </h1>

      <div className="dt-container dt-fade-in">
        <div className="dt-final-card dt-success">
          <div className="dt-final-icon">📜</div>
          <h2 className="dt-final-titulo">Reclamação Gerada com Sucesso</h2>

          <div className="dt-peticao-wrapper">
            <textarea
              readOnly
              value={gerarTexto()}
              className="dt-peticao-textarea"
              rows="22"
            />
          </div>

          <div className="dt-final-acoes">
            <button className="dt-btn dt-btn-secondary" onClick={onVoltar}>
              ← Voltar
            </button>
            <button className="dt-btn dt-btn-outline" onClick={copiarTexto}>
              📋 Copiar texto
            </button>
            <button className="dt-btn dt-btn-primary" onClick={() => window.print()}>
              🖨️ Imprimir / PDF
            </button>
            <button className="dt-btn dt-btn-secondary" onClick={onReiniciar}>
              🔄 Recomeçar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DecisionTree = () => {
  const [historico, setHistorico] = useState([]);
  const [etapaAtual, setEtapaAtual] = useState("inicio");
  const [dados, setDados] = useState({});
  const [animando, setAnimando] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [formErros, setFormErros] = useState({});

  const etapa = treeData[etapaAtual];

  const avancar = useCallback((opcao) => {
    setAnimando(true);

    const novosDados = {
      ...dados,
      [etapaAtual]: opcao.label,
      fundamento: opcao.textoJuridico || dados.fundamento,
    };

    setDados(novosDados);
    setHistorico((prev) => [...prev, etapaAtual]);

    setTimeout(() => {
      setEtapaAtual(opcao.proximo);
      setAnimando(false);
    }, 300);
  }, [etapaAtual, dados]);

  const enviarFormulario = useCallback(() => {
    const campos = etapa.campos || [];
    const erros = {};

    campos.forEach((campo) => {
      if (campo.obrigatorio && !formValues[campo.nome]?.trim()) {
        erros[campo.nome] = "Campo obrigatório";
      }
    });

    if (Object.keys(erros).length > 0) {
      setFormErros(erros);
      return;
    }

    setAnimando(true);
    const novosDados = { ...dados, ...formValues };
    setDados(novosDados);
    setHistorico((prev) => [...prev, etapaAtual]);
    setFormValues({});
    setFormErros({});

    setTimeout(() => {
      setEtapaAtual(etapa.proximo);
      setAnimando(false);
    }, 300);
  }, [etapaAtual, etapa, dados, formValues]);

  const voltar = useCallback(() => {
    if (historico.length === 0) return;
    setAnimando(true);

    setTimeout(() => {
      const novoHistorico = [...historico];
      const anterior = novoHistorico.pop();
      setHistorico(novoHistorico);
      setEtapaAtual(anterior);
      setAnimando(false);
    }, 300);
  }, [historico]);

  const reiniciar = useCallback(() => {
    setAnimando(true);
    setTimeout(() => {
      setHistorico([]);
      setEtapaAtual("inicio");
      setDados({});
      setAnimando(false);
    }, 300);
  }, []);

  // Progress bar
  const totalEtapas = Object.keys(treeData).length;
  const etapasVisitadas = historico.length + 1;
  const progresso = Math.min((etapasVisitadas / (totalEtapas * 0.5)) * 100, 100);

  // Tela final — gerador de petição
  if (etapaAtual === "fim") {
    return <GeradorDePeticao dados={dados} onVoltar={voltar} onReiniciar={reiniciar} />;
  }

  // Tela de etapa com opções
  return (
    <div className="dt-page">
      <h1 className="titulo-principal">
        <span className="titulo-text">Criando sua Reclamação</span>
      </h1>

      <p className="dt-descricao">
        Responda as perguntas abaixo e te guiaremos pelo melhor caminho para resolver sua situação
      </p>

      {/* Barra de progresso */}
      <div className="dt-progress-container">
        <div className="dt-progress-bar">
          <div
            className="dt-progress-fill"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <span className="dt-progress-label">Etapa {etapasVisitadas}</span>
      </div>

      <div className={`dt-container ${animando ? "dt-fade-out" : "dt-fade-in"}`}>
        {/* Breadcrumb */}
        {historico.length > 0 && (
          <div className="dt-breadcrumb">
            {historico.map((chave, i) => (
              <span key={chave} className="dt-breadcrumb-item">
                {dados[chave] || treeData[chave]?.pergunta}
                {i < historico.length - 1 && <span className="dt-breadcrumb-sep">›</span>}
              </span>
            ))}
          </div>
        )}

        {/* Card da pergunta */}
        <div className="dt-question-card">
          <h2 className="dt-pergunta">{etapa.pergunta}</h2>

          {/* Alerta (ex: bloqueio Art. 49) */}
          {etapa.alerta && (
            <div className="dt-alerta">
              <span className="dt-alerta-icon">⚠️</span>
              <p>{etapa.alerta}</p>
            </div>
          )}

          {/* Formulário de inputs */}
          {etapa.tipo === "FORMULARIO" ? (
            <div className="dt-form">
              {etapa.campos.map((campo) => (
                <div key={campo.nome} className="dt-form-group">
                  <label className="dt-form-label" htmlFor={campo.nome}>
                    {campo.label}
                    {campo.obrigatorio && <span className="dt-form-required">*</span>}
                  </label>
                  <input
                    id={campo.nome}
                    type={campo.tipo}
                    placeholder={campo.placeholder || ""}
                    className={`dt-form-input ${formErros[campo.nome] ? "dt-form-input-erro" : ""}`}
                    value={formValues[campo.nome] || ""}
                    onChange={(e) => {
                      setFormValues((prev) => ({ ...prev, [campo.nome]: e.target.value }));
                      if (formErros[campo.nome]) {
                        setFormErros((prev) => {
                          const novo = { ...prev };
                          delete novo[campo.nome];
                          return novo;
                        });
                      }
                    }}
                    step={campo.tipo === "number" ? "0.01" : undefined}
                    min={campo.tipo === "number" ? "0" : undefined}
                  />
                  {formErros[campo.nome] && (
                    <span className="dt-form-erro-msg">{formErros[campo.nome]}</span>
                  )}
                </div>
              ))}
              <button className="dt-btn dt-btn-primary dt-btn-continuar" onClick={enviarFormulario}>
                Continuar →
              </button>
            </div>
          ) : (
            /* Botões de opção */
            <div className="dt-opcoes">
              {etapa.opcoes.map((opcao) => (
                <button
                  key={opcao.valor}
                  className="dt-opcao-btn"
                  onClick={() => avancar(opcao)}
                >
                  <span className="dt-opcao-label">{opcao.label}</span>
                  <span className="dt-opcao-arrow">→</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Botão voltar */}
        {historico.length > 0 && (
          <button className="dt-btn dt-btn-back" onClick={voltar}>
            ← Voltar à etapa anterior
          </button>
        )}
      </div>
    </div>
  );
};

export default DecisionTree;
