// LoadingSpinner.jsx
// Shared loading spinner component

import React from 'react';
import './LoadingSpinner.css';

export function LoadingSpinner({ message = 'Carregando...' }) {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}
