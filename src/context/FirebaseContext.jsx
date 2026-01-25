// FirebaseContext.jsx
// Context for Firebase access throughout the application

import React, { createContext, useContext } from 'react';
import { database } from '../services/firebase';

const FirebaseContext = createContext(null);

export function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={{ database }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebaseContext() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebaseContext must be used within a FirebaseProvider');
  }
  return context;
}
