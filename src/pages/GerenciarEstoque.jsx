import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEstoque } from '../hooks/useEstoque';
import { ItemEstoque } from '../components/Estoque/ItemEstoque';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { Alert } from '../components/shared/Alert';
import './GerenciarEstoque.css';

export function GerenciarEstoque() {
  const navigate = useNavigate();
  const { estoque, entradaEstoque, saidaEstoque, ajustarEstoqueMinimo, loading } = useEstoque();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEntrada = async (itemId, quantidade) => {
    try {
      await entradaEstoque(itemId, quantidade);
      setSuccess(`Entrada de ${quantidade} unidade(s) registrada com sucesso!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleSaida = async (itemId, quantidade) => {
    try {
      await saidaEstoque(itemId, quantidade);
      setSuccess(`Saída de ${quantidade} unidade(s) registrada com sucesso!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleAjustarMinimo = async (itemId, valor) => {
    try {
      await ajustarEstoqueMinimo(itemId, valor);
      setSuccess('Estoque mínimo atualizado com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="gerenciar-estoque-page">
        <LoadingSpinner />
      </div>
    );
  }

  const items = [
    { key: 'cafe', nome: 'Café', emoji: '☕', unidade: 'litros' },
    { key: 'alimentoAdulto', nome: 'Alimento Adulto', emoji: '🍰', unidade: 'kg' },
    { key: 'alimentoInfantil', nome: 'Alimento Infantil', emoji: '🧁', unidade: 'kg' }
  ];

  const alertas = [];
  items.forEach(config => {
    const item = estoque?.[config.key];
    if (item && item.quantidadeAtual <= item.estoqueMinimo) {
      alertas.push(config);
    }
  });

  return (
    <div className="gerenciar-estoque-page">
      <div className="logout-link">
        <button onClick={() => navigate('/')} className="btn-logout">
          🚪 Sair
        </button>
      </div>

      <h1 className="page-title">📦 Controle de Estoque</h1>
      <div className="subtitle">Gestão de Insumos</div>

      <div className="container-estoque">
        {error && <Alert type="error">{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}

        {alertas.length > 0 && (
          <div className="alertas-resumo ativo">
            <h3>⚠️ ATENÇÃO: Estoque Baixo</h3>
            <ul className="alertas-lista">
              {alertas.map(config => {
                const item = estoque[config.key];
                return (
                  <li key={config.key}>
                    {config.emoji} {config.nome}: {item.quantidadeAtual.toFixed(1)} {item.unidade} 
                    (mínimo: {item.estoqueMinimo.toFixed(1)})
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <h2>ITENS DO ESTOQUE</h2>

        <div className="itens-estoque-list">
          {items.map(config => {
            const item = estoque?.[config.key];
            if (!item) return null;

            return (
              <ItemEstoque
                key={config.key}
                itemId={config.key}
                nome={config.nome}
                emoji={config.emoji}
                unidade={config.unidade}
                quantidadeAtual={item.quantidadeAtual}
                estoqueMinimo={item.estoqueMinimo}
                onEntrada={handleEntrada}
                onSaida={handleSaida}
                onAjustarMinimo={handleAjustarMinimo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
