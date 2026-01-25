// calculations.js
// Calculation service for demand and rounding

import { CONSUMO, MARGEM_SEGURANCA } from '../utils/constants';

/**
 * Rounds value to the next 0.5 multiple
 * Examples: 12.3 → 12.5 | 12.6 → 13.0 | 12.0 → 12.0 | 12.5 → 12.5
 * @param {number} valor - Value to round
 * @returns {number} Rounded value
 */
export function arredondarPratico(valor) {
  return Math.ceil(valor * 2) / 2;
}

/**
 * Formats number with comma (Brazilian standard)
 * @param {number} numero - Number to format
 * @param {number} decimais - Number of decimal places (default: 1)
 * @returns {string} Formatted number
 */
export function formatarNumero(numero, decimais = 1) {
  return numero.toFixed(decimais).replace('.', ',');
}

/**
 * Calculates demand for coffee and food
 * @param {number} totalAdultos - Total adults
 * @param {number} totalCriancas - Total children
 * @param {boolean} temSalaEspecial - Has special room
 * @returns {object} Demand object with cafe, alimentoAdulto, alimentoInfantil
 */
export function calcularDemanda(totalAdultos, totalCriancas, temSalaEspecial) {
  // Base calculations
  const cafeBase = totalAdultos * CONSUMO.ADULTO.CAFE_ML;
  const alimentoAdultoBase = totalAdultos * CONSUMO.ADULTO.ALIMENTO_G;
  const alimentoInfantilBase = totalCriancas * CONSUMO.CRIANCA.ALIMENTO_G;
  
  // Apply safety margin
  const margem = 1 + MARGEM_SEGURANCA;
  const cafe = cafeBase * margem;
  const alimentoAdulto = alimentoAdultoBase * margem;
  const alimentoInfantil = alimentoInfantilBase * margem;
  
  // Convert to appropriate units and round
  const cafeLitros = arredondarPratico(cafe / 1000);
  const alimentoAdultoKg = arredondarPratico(alimentoAdulto / 1000);
  const alimentoInfantilKg = arredondarPratico(alimentoInfantil / 1000);
  
  return {
    cafe: cafeLitros,
    alimentoAdulto: alimentoAdultoKg,
    alimentoInfantil: alimentoInfantilKg,
    temPessoas: (totalAdultos + totalCriancas) > 0,
    temSalaEspecial: temSalaEspecial
  };
}
