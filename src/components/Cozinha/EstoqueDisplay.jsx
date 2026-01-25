import { useNavigate } from 'react-router-dom';
import { formatarNumero } from '../../services/calculations';
import './EstoqueDisplay.css';

export function EstoqueDisplay({ estoque, demanda }) {
  const navigate = useNavigate();

  if (!estoque) {
    return (
      <section className="estoque-section">
        <h2>ESTOQUE ATUAL</h2>
        <p>Carregando estoque...</p>
      </section>
    );
  }

  const items = [
    { key: 'cafe', nome: 'Café', emoji: '☕', unidade: 'L' },
    { key: 'alimentoAdulto', nome: 'Alimento adulto', emoji: '🍰', unidade: 'kg' },
    { key: 'alimentoInfantil', nome: 'Alimento infantil', emoji: '🧁', unidade: 'kg' }
  ];

  const alertas = [];

  return (
    <section className="estoque-section">
      <h2>ESTOQUE ATUAL</h2>

      {items.map((config) => {
        const item = estoque[config.key];
        if (!item) return null;

        const emAlerta = item.quantidadeAtual <= item.estoqueMinimo;
        const demandaKey = config.key === 'alimentoAdulto' ? 'alimentoAdulto' : 
                           config.key === 'alimentoInfantil' ? 'alimentoInfantil' : 'cafe';
        const suficiente = item.quantidadeAtual >= demanda[demandaKey];

        if (emAlerta) {
          alertas.push(`${config.emoji} ${config.nome}: ${formatarNumero(item.quantidadeAtual)} ${item.unidade} (mínimo: ${formatarNumero(item.estoqueMinimo)})`);
        }

        return (
          <div
            key={config.key}
            className={`estoque-item ${emAlerta ? 'alerta' : ''}`}
          >
            <span className="estoque-label">{config.emoji} {config.nome}:</span>
            <span className={`estoque-valor ${emAlerta ? 'alerta' : ''}`}>
              {formatarNumero(item.quantidadeAtual)} {config.unidade}
            </span>
          </div>
        );
      })}

      {alertas.length > 0 && (
        <div className="alerta-estoque ativo">
          🚨 ESTOQUE INSUFICIENTE
          <ul className="alerta-estoque-lista">
            {alertas.map((alerta, index) => (
              <li key={index}>{alerta}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => navigate('/estoque')}
        className="btn-estoque"
      >
        📦 GERENCIAR ESTOQUE
      </button>
    </section>
  );
}
