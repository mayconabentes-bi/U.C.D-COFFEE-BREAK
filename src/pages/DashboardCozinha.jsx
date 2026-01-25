import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSalas } from '../hooks/useSalas';
import { useProducao } from '../hooks/useProducao';
import { useEstoque } from '../hooks/useEstoque';
import { calcularDemanda, formatarNumero } from '../services/calculations';
import { STATUS_PRODUCAO } from '../utils/constants';
import { DemandaCard } from '../components/Cozinha/DemandaCard';
import { StatusProducao } from '../components/Cozinha/StatusProducao';
import { EstoqueDisplay } from '../components/Cozinha/EstoqueDisplay';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import './DashboardCozinha.css';

export function DashboardCozinha() {
  const navigate = useNavigate();
  const { salas, loading: loadingSalas } = useSalas();
  const { statusProducao, marcarComoPronto, calcularDemandaAtual, verificarMudancaDemanda } = useProducao();
  const { estoque, baixarEstoqueAutomatico } = useEstoque();
  
  const [totais, setTotais] = useState({ adultos: 0, criancas: 0, geral: 0 });
  const [demanda, setDemanda] = useState({ cafe: 0, alimentoAdulto: 0, alimentoInfantil: 0, temPessoas: false, temSalaEspecial: false });

  useEffect(() => {
    if (salas) {
      let totalAdultos = 0;
      let totalCriancas = 0;
      let temSalaEspecial = false;

      Object.values(salas).forEach(sala => {
        const pessoas = sala.pessoas || 0;
        if (sala.tipo === 'adulto') {
          totalAdultos += pessoas;
        } else if (sala.tipo === 'infantil') {
          totalCriancas += pessoas;
        }
        if (sala.especial) {
          temSalaEspecial = true;
        }
      });

      setTotais({
        adultos: totalAdultos,
        criancas: totalCriancas,
        geral: totalAdultos + totalCriancas
      });

      const novaDemanda = calcularDemanda(totalAdultos, totalCriancas, temSalaEspecial);
      setDemanda(novaDemanda);
      
      verificarMudancaDemanda(novaDemanda);
    }
  }, [salas, verificarMudancaDemanda]);

  const handleMarcarPronto = async (item) => {
    await marcarComoPronto(item, baixarEstoqueAutomatico);
  };

  const salasArray = Object.entries(salas).map(([id, sala]) => ({
    id,
    ...sala
  }));

  salasArray.sort((a, b) => {
    if (a.especial && !b.especial) return -1;
    if (!a.especial && b.especial) return 1;
    if (a.tipo === 'adulto' && b.tipo === 'infantil') return -1;
    if (a.tipo === 'infantil' && b.tipo === 'adulto') return 1;
    return a.nome.localeCompare(b.nome);
  });

  if (loadingSalas) {
    return (
      <div className="dashboard-cozinha">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="dashboard-cozinha">
      <div className="logout-link">
        <button onClick={() => navigate('/')} className="btn-logout">
          🚪 Sair
        </button>
      </div>

      <h1 className="page-title">🍰 Cozinha</h1>
      <div className="subtitle">Dashboard em Tempo Real</div>

      <div className="dashboard-content">
        <section className="salas-section">
          <h2>SALAS ATIVAS</h2>
          {salasArray.length === 0 ? (
            <p className="empty-message">Nenhuma sala criada ainda.</p>
          ) : (
            <div className="salas-list">
              {salasArray.map((sala) => (
                <div
                  key={sala.id}
                  className={`sala-item ${sala.tipo} ${sala.especial ? 'especial' : ''}`}
                >
                  <span className="sala-nome">
                    {sala.especial && <span className="especial-icon">⭐</span>}
                    {sala.nome}
                  </span>
                  <span className="sala-pessoas">{sala.pessoas || 0}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="totais-section">
          <h2>TOTAIS</h2>
          <div className="total-item">
            <span className="total-label">Adultos:</span>
            <span className="total-valor">{totais.adultos}</span>
          </div>
          <div className="total-item">
            <span className="total-label">Crianças:</span>
            <span className="total-valor">{totais.criancas}</span>
          </div>
          <div className="total-item total-geral">
            <span className="total-label">Total Geral:</span>
            <span className="total-valor">{totais.geral}</span>
          </div>
        </section>

        <DemandaCard demanda={demanda} />

        <EstoqueDisplay estoque={estoque} demanda={demanda} />

        <StatusProducao
          statusProducao={statusProducao}
          onMarcarPronto={handleMarcarPronto}
        />
      </div>
    </div>
  );
}
