// constants.js
// Business logic constants for U.C.D Coffee Break

/**
 * Consumption parameters per person
 */
export const CONSUMO = {
  ADULTO: {
    CAFE_ML: 150,      // ml per person
    ALIMENTO_G: 250    // g per person
  },
  CRIANCA: {
    CAFE_ML: 0,        // ml per person (children don't consume coffee)
    ALIMENTO_G: 180    // g per person
  }
};

/**
 * Safety margin for calculations (10%)
 */
export const MARGEM_SEGURANCA = 0.1;

/**
 * Production status constants
 */
export const STATUS_PRODUCAO = {
  A_PRODUZIR: "A_PRODUZIR",
  EM_PRODUCAO: "EM_PRODUCAO",
  PRONTO: "PRONTO"
};

/**
 * Color scheme
 */
export const COLORS = {
  PRIMARY: '#2196F3',
  PRIMARY_DARK: '#1976D2',
  SUCCESS: '#4CAF50',
  ERROR: '#f44336',
  WARNING: '#FF9800',
  TEXT: '#1a1a1a',
  TEXT_LIGHT: '#666'
};

/**
 * Status emoji mapping
 */
export const STATUS_EMOJI = {
  [STATUS_PRODUCAO.A_PRODUZIR]: "🟡",
  [STATUS_PRODUCAO.EM_PRODUCAO]: "🔴",
  [STATUS_PRODUCAO.PRONTO]: "🟢"
};

/**
 * Status text mapping
 */
export const STATUS_TEXT = {
  [STATUS_PRODUCAO.A_PRODUZIR]: "A PRODUZIR",
  [STATUS_PRODUCAO.EM_PRODUCAO]: "EM PRODUÇÃO",
  [STATUS_PRODUCAO.PRONTO]: "PRONTO"
};

/**
 * User credentials for simple authentication
 */
export const CREDENTIALS = {
  admin: { senha: 'ucd123', redirect: '/admin' },
  cozinha: { senha: 'cafe', redirect: '/cozinha' },
  sala: { senha: 'voluntario', redirect: '/sala' },
  estoque: { senha: 'ucdstock', redirect: '/estoque' }
};
