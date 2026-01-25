// useProducao.js
// Custom hook for managing producao (production)

import { useState, useEffect, useCallback, useRef } from 'react';
import { useFirebase } from './useFirebase';
import { STATUS_PRODUCAO } from '../utils/constants';
import { calcularDemanda } from '../services/calculations';

export function useProducao() {
  const { dbSet, dbGet, dbUpdate, dbListen } = useFirebase();
  const [statusProducao, setStatusProducao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const demandaAnteriorRef = useRef({ cafe: 0, alimentoAdulto: 0, alimentoInfantil: 0 });

  // Initialize production structure if it doesn't exist
  useEffect(() => {
    const initializeProduction = async () => {
      try {
        const producaoAtual = await dbGet('/producao');
        
        if (!producaoAtual) {
          const producaoInicial = {
            cafe: {
              status: STATUS_PRODUCAO.A_PRODUZIR,
              atualizadoEm: new Date().toISOString()
            },
            alimentoAdulto: {
              status: STATUS_PRODUCAO.A_PRODUZIR,
              atualizadoEm: new Date().toISOString()
            },
            alimentoInfantil: {
              status: STATUS_PRODUCAO.A_PRODUZIR,
              atualizadoEm: new Date().toISOString()
            }
          };
          
          await dbSet('/producao', producaoInicial);
        }
      } catch (err) {
        console.error('Error initializing production:', err);
      }
    };

    initializeProduction();
  }, [dbGet, dbSet]);

  // Listen to production status changes
  useEffect(() => {
    const unsubscribe = dbListen('/producao', (data) => {
      setStatusProducao(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [dbListen]);

  // Update production status
  const atualizarStatus = useCallback(async (item, novoStatus) => {
    try {
      const update = {
        status: novoStatus,
        atualizadoEm: new Date().toISOString()
      };
      
      await dbUpdate(`/producao/${item}`, update);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [dbUpdate]);

  // Mark item as ready with automatic stock deduction
  const marcarComoPronto = useCallback(async (item, baixarEstoque) => {
    try {
      const producaoAtual = await dbGet(`/producao/${item}`);
      
      if (producaoAtual && producaoAtual.status === STATUS_PRODUCAO.PRONTO) {
        return; // Already ready
      }

      // Get current salas to calculate demand
      const salas = await dbGet('/salas');
      let totalAdultos = 0;
      let totalCriancas = 0;

      if (salas) {
        Object.values(salas).forEach(sala => {
          const pessoas = sala.pessoas || 0;
          if (sala.tipo === 'adulto') {
            totalAdultos += pessoas;
          } else if (sala.tipo === 'infantil') {
            totalCriancas += pessoas;
          }
        });
      }

      const demanda = calcularDemanda(totalAdultos, totalCriancas, false);

      // Calculate quantity to deduct
      let quantidadeBaixar = 0;
      if (item === 'cafe') {
        quantidadeBaixar = demanda.cafe;
      } else if (item === 'alimentoAdulto') {
        quantidadeBaixar = demanda.alimentoAdulto;
      } else if (item === 'alimentoInfantil') {
        quantidadeBaixar = demanda.alimentoInfantil;
      }

      // Deduct from stock if needed
      if (quantidadeBaixar > 0 && baixarEstoque) {
        await baixarEstoque(item, quantidadeBaixar);
      }

      // Update status to PRONTO
      await atualizarStatus(item, STATUS_PRODUCAO.PRONTO);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [dbGet, atualizarStatus]);

  // Calculate current demand
  const calcularDemandaAtual = useCallback(async () => {
    try {
      const salas = await dbGet('/salas');
      let totalAdultos = 0;
      let totalCriancas = 0;
      let temSalaEspecial = false;

      if (salas) {
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
      }

      return calcularDemanda(totalAdultos, totalCriancas, temSalaEspecial);
    } catch (err) {
      setError(err.message);
      return { cafe: 0, alimentoAdulto: 0, alimentoInfantil: 0, temPessoas: false, temSalaEspecial: false };
    }
  }, [dbGet]);

  // Check if demand increased and reset status if needed
  const verificarMudancaDemanda = useCallback(async (demandaAtual) => {
    try {
      const demandaAnterior = demandaAnteriorRef.current;
      
      const aumentouCafe = demandaAtual.cafe > demandaAnterior.cafe;
      const aumentouAlimentoAdulto = demandaAtual.alimentoAdulto > demandaAnterior.alimentoAdulto;
      const aumentouAlimentoInfantil = demandaAtual.alimentoInfantil > demandaAnterior.alimentoInfantil;

      if (aumentouCafe || aumentouAlimentoAdulto || aumentouAlimentoInfantil) {
        const producao = await dbGet('/producao');
        
        if (producao) {
          const updates = {};

          if (aumentouCafe && producao.cafe.status === STATUS_PRODUCAO.PRONTO) {
            updates['/producao/cafe'] = {
              status: STATUS_PRODUCAO.A_PRODUZIR,
              atualizadoEm: new Date().toISOString()
            };
          }

          if (aumentouAlimentoAdulto && producao.alimentoAdulto.status === STATUS_PRODUCAO.PRONTO) {
            updates['/producao/alimentoAdulto'] = {
              status: STATUS_PRODUCAO.A_PRODUZIR,
              atualizadoEm: new Date().toISOString()
            };
          }

          if (aumentouAlimentoInfantil && producao.alimentoInfantil.status === STATUS_PRODUCAO.PRONTO) {
            updates['/producao/alimentoInfantil'] = {
              status: STATUS_PRODUCAO.A_PRODUZIR,
              atualizadoEm: new Date().toISOString()
            };
          }

          if (Object.keys(updates).length > 0) {
            for (const [path, data] of Object.entries(updates)) {
              await dbUpdate(path, data);
            }
          }
        }
      }

      demandaAnteriorRef.current = {
        cafe: demandaAtual.cafe,
        alimentoAdulto: demandaAtual.alimentoAdulto,
        alimentoInfantil: demandaAtual.alimentoInfantil
      };
    } catch (err) {
      setError(err.message);
    }
  }, [dbGet, dbUpdate]);

  return {
    statusProducao,
    atualizarStatus,
    marcarComoPronto,
    calcularDemandaAtual,
    verificarMudancaDemanda,
    loading,
    error
  };
}
