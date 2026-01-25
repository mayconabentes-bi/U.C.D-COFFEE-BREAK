// Alert.jsx
// Shared alert component

import React from 'react';
import './Alert.css';

export function Alert({ 
  children, 
  type = 'info', 
  className = '', 
  onClose,
  ...props 
}) {
  return (
    <div className={`alert alert-${type} ${className}`} {...props}>
      <div className="alert-content">{children}</div>
      {onClose && (
        <button className="alert-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
      )}
    </div>
  );
}
