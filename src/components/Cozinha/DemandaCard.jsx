import { formatarNumero } from '../../services/calculations';
import './DemandaCard.css';

export function DemandaCard({ demanda }) {
  return (
    <section className="demanda-section">
      <h2>DEMANDA ATUAL</h2>
      
      <div className="demanda-item">
        <span className="demanda-label">Café:</span>
        <span className="demanda-valor">{formatarNumero(demanda.cafe)} L</span>
      </div>
      
      <div className="demanda-item">
        <span className="demanda-label">Alimento adulto:</span>
        <span className="demanda-valor">{formatarNumero(demanda.alimentoAdulto)} kg</span>
      </div>
      
      <div className="demanda-item">
        <span className="demanda-label">Alimento infantil:</span>
        <span className="demanda-valor">{formatarNumero(demanda.alimentoInfantil)} kg</span>
      </div>

      {demanda.temPessoas && (
        <div className="alerta-produzir ativo">
          ⚠️ PRODUZIR AGORA
        </div>
      )}

      {demanda.temSalaEspecial && (
        <div className="alerta-especial ativo">
          ⭐ Sala especial ativa – priorizar
        </div>
      )}
    </section>
  );
}
