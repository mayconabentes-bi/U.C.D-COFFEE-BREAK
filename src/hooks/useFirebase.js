// useFirebase.js
// Custom hook for Firebase database operations

import { useEffect, useState, useCallback } from 'react';
import { database, ref, set, get, update, onValue, off } from '../services/firebase';

export function useFirebase() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (database) {
      setIsConnected(true);
    }
  }, []);

  const dbRef = useCallback((path) => {
    return ref(database, path);
  }, []);

  const dbSet = useCallback(async (path, data) => {
    const reference = ref(database, path);
    return await set(reference, data);
  }, []);

  const dbGet = useCallback(async (path) => {
    const reference = ref(database, path);
    const snapshot = await get(reference);
    return snapshot.exists() ? snapshot.val() : null;
  }, []);

  const dbUpdate = useCallback(async (path, data) => {
    const reference = ref(database, path);
    return await update(reference, data);
  }, []);

  const dbListen = useCallback((path, callback) => {
    const reference = ref(database, path);
    onValue(reference, (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
    
    // Return cleanup function
    return () => {
      off(reference);
    };
  }, []);

  return {
    isConnected,
    dbRef,
    dbSet,
    dbGet,
    dbUpdate,
    dbListen
  };
}
