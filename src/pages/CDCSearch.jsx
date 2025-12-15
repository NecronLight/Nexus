import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import cdcData from "../data/cdcData.json";
import "../styles/cdc-search.css";

const CDCSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArtigos = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const searchLower = searchTerm.toLowerCase();
    return cdcData.artigos.filter((artigo) => {
      // Busca nas palavras-chave
      const palavrasChaveMatch = artigo.palavrasChave.some((palavra) =>
        palavra.toLowerCase().includes(searchLower)
      );

      // Busca no título e texto
      const textoMatch =
        artigo.titulo.toLowerCase().includes(searchLower) ||
        artigo.texto.toLowerCase().includes(searchLower) ||
        artigo.numero.toLowerCase().includes(searchLower);

      return palavrasChaveMatch || textoMatch;
    });
  }, [searchTerm]);

  return (
    <div className="cdc-page">
      <h1 className="cdc-title">Encontre o que precisa no Código de Defesa do Consumidor</h1>

      <p className="cdc-desc">
        Digite palavras-chave como "arrependimento", "devolução", "abusivo", "defeito" para encontrar artigos relevantes
      </p>

      {/* BARRA DE PESQUISA */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Digite uma palavra-chave..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>

      {/* RESULTADOS */}
      <div className="results-container">
        {searchTerm.trim() === "" ? (
          <div className="empty-state">
            <p>Digite uma palavra-chave para começar a busca</p>
          </div>
        ) : filteredArtigos.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum artigo encontrado para "{searchTerm}"</p>
            <p className="empty-hint">Tente palavras como: arrependimento, devolução, defeito, garantia, informação</p>
          </div>
        ) : (
          <>
            <p className="results-count">
              {filteredArtigos.length} artigo{filteredArtigos.length !== 1 ? "s" : ""} encontrado{filteredArtigos.length !== 1 ? "s" : ""}
            </p>
            <div className="articles-list">
              {filteredArtigos.map((artigo) => (
                <div key={artigo.id} className="article-card">
                  <div className="article-header">
                    <span className="article-numero">{artigo.numero}</span>
                    <h3 className="article-titulo">{artigo.titulo}</h3>
                  </div>
                  <p className="article-texto">{artigo.texto}</p>
                  <div className="article-tags">
                    {artigo.palavrasChave.map((palavra, idx) => (
                      <span key={idx} className="tag">
                        {palavra}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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

export default CDCSearch;
