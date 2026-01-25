export function SalaCard({ sala, onToggleEspecial }) {
  const handleCheckboxChange = (e) => {
    onToggleEspecial(sala.id, e.target.checked);
  };

  return (
    <div className={`sala-card ${sala.especial ? 'especial' : ''}`}>
      <div className="sala-info">
        <h3 className="sala-nome">
          {sala.nome}
          {sala.especial && <span className="star-icon"> ⭐</span>}
        </h3>
        <span className="sala-tipo-badge">
          {sala.tipo === 'adulto' ? 'Adulto' : 'Infantil'}
        </span>
      </div>
      
      <div className="sala-controls">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={sala.especial}
            onChange={handleCheckboxChange}
          />
          <span>Marcar como sala especial</span>
        </label>
      </div>
    </div>
  );
}
