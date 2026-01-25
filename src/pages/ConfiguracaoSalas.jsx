import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSalas } from '../hooks/useSalas';
import { SalaForm } from '../components/Salas/SalaForm';
import { SalaCard } from '../components/Salas/SalaCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { Alert } from '../components/shared/Alert';
import './ConfiguracaoSalas.css';

export function ConfiguracaoSalas() {
  const navigate = useNavigate();
  const { salas, criarSalas, marcarSalaEspecial, loading, error } = useSalas();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCriarSalas = async (qtdAdulto, qtdCrianca) => {
    const success = await criarSalas(qtdAdulto, qtdCrianca);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleSalaEspecial = async (salaId, isChecked) => {
    await marcarSalaEspecial(salaId, isChecked);
  };

  const salasArray = Object.entries(salas).map(([id, sala]) => ({
    id,
    ...sala
  }));

  salasArray.sort((a, b) => {
    if (a.tipo === 'adulto' && b.tipo === 'infantil') return -1;
    if (a.tipo === 'infantil' && b.tipo === 'adulto') return 1;
    return a.nome.localeCompare(b.nome);
  });

  return (
    <div className="config-salas-page">
      <div className="logout-link">
        <button onClick={() => navigate('/')} className="btn-logout">
          🚪 Sair
        </button>
      </div>

      <h1>U.C.D Coffee Break</h1>

      <div className="info-box">
        <strong>Fase 2:</strong> Configuração Inicial de Salas do Evento
      </div>

      {error && <Alert type="error">{error}</Alert>}
      {showSuccess && <Alert type="success">Salas criadas com sucesso!</Alert>}

      <SalaForm onSubmit={handleCriarSalas} />

      <div className="salas-list-section">
        <h2>Salas Criadas</h2>
        
        {loading && <LoadingSpinner />}
        
        {!loading && salasArray.length === 0 && (
          <p className="empty-message">Nenhuma sala criada ainda.</p>
        )}
        
        {!loading && salasArray.length > 0 && (
          <div className="salas-list">
            {salasArray.map((sala) => (
              <SalaCard
                key={sala.id}
                sala={sala}
                onToggleEspecial={handleSalaEspecial}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
