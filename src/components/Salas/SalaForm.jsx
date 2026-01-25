import { useState } from 'react';

export function SalaForm({ onSubmit }) {
  const [qtdAdulto, setQtdAdulto] = useState(0);
  const [qtdCrianca, setQtdCrianca] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(qtdAdulto, qtdCrianca);
  };

  return (
    <div className="sala-form-container">
      <h2>Configurar Salas</h2>
      
      <form onSubmit={handleSubmit} className="sala-form">
        <div className="form-group">
          <label htmlFor="qtdAdulto">Quantidade de Salas ADULTO:</label>
          <input
            type="number"
            id="qtdAdulto"
            min="0"
            value={qtdAdulto}
            onChange={(e) => setQtdAdulto(parseInt(e.target.value) || 0)}
            placeholder="Ex: 3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="qtdCrianca">Quantidade de Salas CRIANÇA:</label>
          <input
            type="number"
            id="qtdCrianca"
            min="0"
            value={qtdCrianca}
            onChange={(e) => setQtdCrianca(parseInt(e.target.value) || 0)}
            placeholder="Ex: 2"
          />
        </div>

        <button type="submit" className="btn-criar-salas">
          Criar Salas
        </button>
      </form>
    </div>
  );
}
