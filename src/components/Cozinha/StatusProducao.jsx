import { STATUS_PRODUCAO, STATUS_EMOJI, STATUS_TEXT } from '../../utils/constants';
import './StatusProducao.css';

export function StatusProducao({ statusProducao, onMarcarPronto }) {
  if (!statusProducao) return null;

  const items = [
    { key: 'cafe', nome: '☕ Café', status: statusProducao.cafe },
    { key: 'alimentoAdulto', nome: '🍰 Alimento Adulto', status: statusProducao.alimentoAdulto },
    { key: 'alimentoInfantil', nome: '🧁 Alimento Infantil', status: statusProducao.alimentoInfantil }
  ];

  return (
    <section className="producao-section">
      <h2>STATUS DE PRODUÇÃO</h2>

      {items.map((item) => {
        if (!item.status) return null;

        const isPronto = item.status.status === STATUS_PRODUCAO.PRONTO;

        return (
          <div key={item.key} className="producao-item">
            <div className="producao-header">
              <div className="producao-nome">{item.nome}</div>
              <div className="producao-status">
                <span className="status-emoji">{STATUS_EMOJI[item.status.status]}</span>
                <span className={`status-texto ${item.status.status}`}>
                  {STATUS_TEXT[item.status.status]}
                </span>
              </div>
            </div>
            <button
              className="btn-pronto"
              onClick={() => onMarcarPronto(item.key)}
              disabled={isPronto}
              aria-label={`Marcar ${item.nome} como pronto`}
            >
              ✔ MARCAR COMO PRONTO
            </button>
          </div>
        );
      })}
    </section>
  );
}
