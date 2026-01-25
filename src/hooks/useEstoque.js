// useEstoque.js
// Custom hook for managing estoque (inventory/stock)

import { useState, useEffect, useCallback } from 'react';
import { useFirebase } from './useFirebase';

export function useEstoque() {
  const { dbSet, dbGet, dbUpdate, dbListen } = useFirebase();
  const [estoque, setEstoque] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize stock structure if it doesn't exist
  useEffect(() => {
    const initializeStock = async () => {
      try {
        const estoqueAtual = await dbGet('/estoque');
        
        if (!estoqueAtual) {
          const estoqueInicial = {
            cafe: {
              nome: 'Café',
              unidade: 'litros',
              quantidadeAtual: 10,
              estoqueMinimo: 5
            },
            alimentoAdulto: {
              nome: 'Alimento Adulto',
              unidade: 'kg',
              quantidadeAtual: 15,
              estoqueMinimo: 5
            },
            alimentoInfantil: {
              nome: 'Alimento Infantil',
              unidade: 'kg',
              quantidadeAtual: 10,
              estoqueMinimo: 3
            }
          };
          
          await dbSet('/estoque', estoqueInicial);
        }
      } catch (err) {
        console.error('Error initializing stock:', err);
      }
    };

    initializeStock();
  }, [dbGet, dbSet]);

  // Listen to stock changes
  useEffect(() => {
    const unsubscribe = dbListen('/estoque', (data) => {
      setEstoque(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [dbListen]);

  // Add to stock (entrada)
  const entradaEstoque = useCallback(async (itemId, quantidade) => {
    try {
      const item = await dbGet(`/estoque/${itemId}`);
      if (item) {
        const novaQuantidade = item.quantidadeAtual + quantidade;
        await dbUpdate(`/estoque/${itemId}`, { quantidadeAtual: novaQuantidade });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [dbGet, dbUpdate]);

  // Remove from stock (saída)
  const saidaEstoque = useCallback(async (itemId, quantidade) => {
    try {
      const item = await dbGet(`/estoque/${itemId}`);
      if (item) {
        const novaQuantidade = Math.max(0, item.quantidadeAtual - quantidade);
        
        if (item.quantidadeAtual === 0) {
          throw new Error('Estoque já está zerado!');
        }
        
        await dbUpdate(`/estoque/${itemId}`, { quantidadeAtual: novaQuantidade });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [dbGet, dbUpdate]);

  // Adjust minimum stock
  const ajustarEstoqueMinimo = useCallback(async (itemId, valor) => {
    try {
      await dbUpdate(`/estoque/${itemId}`, { estoqueMinimo: valor });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [dbUpdate]);

  // Check if stock is sufficient
  const verificarEstoqueSuficiente = useCallback(async (itemId, quantidadeNecessaria) => {
    try {
      const item = await dbGet(`/estoque/${itemId}`);
      if (!item) return false;
      
      return item.quantidadeAtual >= quantidadeNecessaria;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [dbGet]);

  // Automatic stock deduction
  const baixarEstoqueAutomatico = useCallback(async (itemId, quantidadeProduzida) => {
    try {
      const item = await dbGet(`/estoque/${itemId}`);
      if (item) {
        const novaQuantidade = Math.max(0, item.quantidadeAtual - quantidadeProduzida);
        await dbUpdate(`/estoque/${itemId}`, { quantidadeAtual: novaQuantidade });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [dbGet, dbUpdate]);

  return {
    estoque,
    entradaEstoque,
    saidaEstoque,
    ajustarEstoqueMinimo,
    verificarEstoqueSuficiente,
    baixarEstoqueAutomatico,
    loading,
    error
  };
}
