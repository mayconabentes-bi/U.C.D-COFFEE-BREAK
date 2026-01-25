import { STATUS_PRODUCAO, STATUS_EMOJI, STATUS_TEXT } from '../../utils/constants';
import './StatusProducaoSala.css';

export function StatusProducaoSala({ statusProducao, notificacoes }) {
  if (!statusProducao) return null;

  const items = [
    { key: 'cafe', nome: '☕ Café', status: statusProducao.cafe, notificacao: 'Café pronto!' },
    { key: 'alimentoAdulto', nome: '🍰 Alimento Adulto', status: statusProducao.alimentoAdulto, notificacao: 'Lanche adulto pronto!' },
    { key: 'alimentoInfantil', nome: '🧁 Alimento Infantil', status: statusProducao.alimentoInfantil, notificacao: 'Lanche infantil pronto!' }
  ];

  return (
    <div className="status-producao-sala">
      <h2>STATUS DA PRODUÇÃO</h2>

      {items.map((item) => {
        if (!item.status) return null;

        return (
          <div key={item.key} className="status-item">
            <span className="status-nome">{item.nome}</span>
            <div className={`status-badge ${item.status.status}`}>
              <span>{STATUS_EMOJI[item.status.status]}</span>
              <span>{STATUS_TEXT[item.status.status]}</span>
            </div>
          </div>
        );
      })}

      {notificacoes.cafe && (
        <div className="notificacao-pronto ativo">
          ☕ Café pronto!
        </div>
      )}

      {notificacoes.alimentoAdulto && (
        <div className="notificacao-pronto ativo">
          🍰 Lanche adulto pronto!
        </div>
      )}

      {notificacoes.alimentoInfantil && (
        <div className="notificacao-pronto ativo">
          🧁 Lanche infantil pronto!
        </div>
      )}
    </div>
  );
}
