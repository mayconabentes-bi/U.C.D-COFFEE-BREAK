// useSalas.js
// Custom hook for managing salas (rooms)

import { useState, useEffect, useCallback } from 'react';
import { useFirebase } from './useFirebase';

export function useSalas() {
  const { dbSet, dbGet, dbUpdate, dbListen } = useFirebase();
  const [salas, setSalas] = useState({});
  const [configuracao, setConfiguracao] = useState({
    salasAdulto: 0,
    salasCrianca: 0,
    salaEspecialId: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen to salas changes
  useEffect(() => {
    const unsubscribeSalas = dbListen('/salas', (data) => {
      setSalas(data || {});
      setLoading(false);
    });

    const unsubscribeConfig = dbListen('/configuracao', (data) => {
      if (data) {
        setConfiguracao(data);
      }
    });

    return () => {
      unsubscribeSalas();
      unsubscribeConfig();
    };
  }, [dbListen]);

  // Create salas
  const criarSalas = useCallback(async (qtdAdulto, qtdCrianca) => {
    try {
      setLoading(true);
      setError(null);

      if (qtdAdulto === 0 && qtdCrianca === 0) {
        throw new Error('Por favor, informe a quantidade de salas!');
      }

      const novasSalas = {};

      // Create adult rooms
      for (let i = 1; i <= qtdAdulto; i++) {
        novasSalas[`adulto_${i}`] = {
          nome: `Sala Adulto ${i}`,
          tipo: 'adulto',
          especial: false,
          pessoas: 0
        };
      }

      // Create children rooms
      for (let i = 1; i <= qtdCrianca; i++) {
        novasSalas[`infantil_${i}`] = {
          nome: `Sala Infantil ${i}`,
          tipo: 'infantil',
          especial: false,
          pessoas: 0
        };
      }

      const novaConfiguracao = {
        salasAdulto: qtdAdulto,
        salasCrianca: qtdCrianca,
        salaEspecialId: ''
      };

      await dbSet('/configuracao', novaConfiguracao);
      await dbSet('/salas', novasSalas);

      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  }, [dbSet]);

  // Mark room as special
  const marcarSalaEspecial = useCallback(async (salaId, isChecked) => {
    try {
      const salasAtuais = await dbGet('/salas');
      
      if (salasAtuais) {
        // Update all rooms
        if (isChecked) {
          for (const id in salasAtuais) {
            salasAtuais[id].especial = (id === salaId);
          }
        } else {
          if (salasAtuais[salaId]) {
            salasAtuais[salaId].especial = false;
          }
        }

        const salaEspecialId = isChecked ? salaId : '';

        await dbSet('/salas', salasAtuais);
        await dbUpdate('/configuracao', { salaEspecialId });
      }
    } catch (err) {
      setError(err.message);
    }
  }, [dbGet, dbSet, dbUpdate]);

  // Update people count in a room
  const atualizarPessoas = useCallback(async (salaId, quantidade) => {
    try {
      await dbUpdate(`/salas/${salaId}`, { pessoas: quantidade });
    } catch (err) {
      setError(err.message);
    }
  }, [dbUpdate]);

  return {
    salas,
    configuracao,
    criarSalas,
    marcarSalaEspecial,
    atualizarPessoas,
    loading,
    error
  };
}
