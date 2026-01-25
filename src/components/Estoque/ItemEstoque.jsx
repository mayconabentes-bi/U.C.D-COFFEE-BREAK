import { useState } from 'react';
import { formatarNumero } from '../../services/calculations';
import './ItemEstoque.css';

export function ItemEstoque({
  itemId,
  nome,
  emoji,
  unidade,
  quantidadeAtual,
  estoqueMinimo,
  onEntrada,
  onSaida,
  onAjustarMinimo
}) {
  const [novoMinimo, setNovoMinimo] = useState(estoqueMinimo);
  const emAlerta = quantidadeAtual <= estoqueMinimo;

  const handleSalvarMinimo = () => {
    if (novoMinimo >= 0) {
      onAjustarMinimo(itemId, novoMinimo);
    } else {
      alert('Por favor, informe um valor válido para o estoque mínimo');
    }
  };

  return (
    <div className={`item-estoque ${emAlerta ? 'alerta' : ''}`}>
      <div className="item-header">
        <div className="item-nome">
          <span className="emoji">{emoji}</span>
          {nome}
        </div>
        {emAlerta && (
          <div className="alerta-badge ativo">
            ⚠️ ESTOQUE BAIXO
          </div>
        )}
      </div>

      <div className="item-info">
        <div className="info-box">
          <div className="info-label">Quantidade Atual</div>
          <div>
            <span className="info-valor">{formatarNumero(quantidadeAtual)}</span>
            <span className="info-unidade">{unidade}</span>
          </div>
        </div>
        <div className="info-box">
          <div className="info-label">Estoque Mínimo</div>
          <div>
            <span className="info-valor">{formatarNumero(estoqueMinimo)}</span>
            <span className="info-unidade">{unidade}</span>
          </div>
        </div>
        <div className="info-box">
          <div className="info-label">Status</div>
          <div>
            <span className="info-valor" style={{ color: emAlerta ? '#f44336' : '#4CAF50' }}>
              {emAlerta ? '⚠️' : '✓'}
            </span>
          </div>
        </div>
      </div>

      <div className="controles">
        <div className="controle-group">
          <div className="controle-label">Entrada/Saída Manual</div>
          <div className="btn-group">
            <button
              className="btn-adicionar"
              onClick={() => onEntrada(itemId, 1)}
            >
              + 1
            </button>
            <button
              className="btn-remover"
              onClick={() => onSaida(itemId, 1)}
            >
              - 1
            </button>
          </div>
        </div>

        <div className="controle-group">
          <div className="controle-label">Entrada Rápida</div>
          <div className="btn-group">
            <button
              className="btn-adicionar"
              onClick={() => onEntrada(itemId, 5)}
            >
              + 5
            </button>
            <button
              className="btn-adicionar"
              onClick={() => onEntrada(itemId, 10)}
            >
              + 10
            </button>
          </div>
        </div>

        <div className="controle-group">
          <div className="controle-label">Ajustar Estoque Mínimo</div>
          <input
            type="number"
            min="0"
            step="0.5"
            value={novoMinimo}
            onChange={(e) => setNovoMinimo(parseFloat(e.target.value) || 0)}
            className="input-minimo"
          />
          <button
            className="btn-salvar"
            onClick={handleSalvarMinimo}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
