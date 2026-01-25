import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSalas } from '../hooks/useSalas';
import { useProducao } from '../hooks/useProducao';
import { ContadorPessoas } from '../components/Checkin/ContadorPessoas';
import { StatusProducaoSala } from '../components/Checkin/StatusProducaoSala';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { STATUS_PRODUCAO } from '../utils/constants';
import './PaginaSala.css';

export function PaginaSala() {
  const navigate = useNavigate();
  const { salas, atualizarPessoas, loading } = useSalas();
  const { statusProducao } = useProducao();
  
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [quantidadePessoas, setQuantidadePessoas] = useState(0);
  const [notificacoes, setNotificacoes] = useState({
    cafe: false,
    alimentoAdulto: false,
    alimentoInfantil: false
  });
  
  const statusAnteriorRef = useRef({
    cafe: null,
    alimentoAdulto: null,
    alimentoInfantil: null
  });

  const salasArray = Object.entries(salas).map(([id, sala]) => ({
    id,
    ...sala
  }));

  salasArray.sort((a, b) => {
    if (a.tipo === 'adulto' && b.tipo === 'infantil') return -1;
    if (a.tipo === 'infantil' && b.tipo === 'adulto') return 1;
    return a.nome.localeCompare(b.nome);
  });

  useEffect(() => {
    if (salaSelecionada && salas[salaSelecionada]) {
      setQuantidadePessoas(salas[salaSelecionada].pessoas || 0);
    }
  }, [salaSelecionada, salas]);

  useEffect(() => {
    if (statusProducao) {
      const mostrarNotificacao = (item) => {
        if (
          statusAnteriorRef.current[item] !== STATUS_PRODUCAO.PRONTO &&
          statusProducao[item]?.status === STATUS_PRODUCAO.PRONTO
        ) {
          setNotificacoes(prev => ({ ...prev, [item]: true }));
          setTimeout(() => {
            setNotificacoes(prev => ({ ...prev, [item]: false }));
          }, 10000);
        }
        statusAnteriorRef.current[item] = statusProducao[item]?.status;
      };

      mostrarNotificacao('cafe');
      mostrarNotificacao('alimentoAdulto');
      mostrarNotificacao('alimentoInfantil');
    }
  }, [statusProducao]);

  const handleSelecionarSala = (e) => {
    const salaId = e.target.value;
    setSalaSelecionada(salaId || null);
  };

  const handleAdicionarPessoa = async () => {
    if (!salaSelecionada) return;
    const novaQuantidade = quantidadePessoas + 1;
    await atualizarPessoas(salaSelecionada, novaQuantidade);
  };

  const handleRemoverPessoa = async () => {
    if (!salaSelecionada || quantidadePessoas === 0) return;
    const novaQuantidade = quantidadePessoas - 1;
    await atualizarPessoas(salaSelecionada, novaQuantidade);
  };

  if (loading) {
    return (
      <div className="pagina-sala">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="pagina-sala">
      <div className="logout-link">
        <button onClick={() => navigate('/')} className="btn-logout">
          🚪 Sair
        </button>
      </div>

      <h1 className="page-title">🏠 Sala</h1>
      <div className="subtitle">Check-in de Participantes</div>

      <div className="container-sala">
        <div className="sala-selector">
          <label htmlFor="selectSala">Selecione sua sala:</label>
          <select
            id="selectSala"
            value={salaSelecionada || ''}
            onChange={handleSelecionarSala}
          >
            <option value="">
              {salasArray.length === 0 ? 'Nenhuma sala criada ainda' : 'Selecione uma sala...'}
            </option>
            {salasArray.map((sala) => (
              <option key={sala.id} value={sala.id}>
                {sala.nome} {sala.especial ? '⭐' : ''}
              </option>
            ))}
          </select>
        </div>

        {salaSelecionada && (
          <div className="checkin-section ativo">
            <h2>CHECK-IN</h2>
            
            <ContadorPessoas
              quantidade={quantidadePessoas}
              onAdicionar={handleAdicionarPessoa}
              onRemover={handleRemoverPessoa}
            />
          </div>
        )}

        <StatusProducaoSala
          statusProducao={statusProducao}
          notificacoes={notificacoes}
        />
      </div>
    </div>
  );
}
