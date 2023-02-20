
import { useContext } from 'react';
import IDBContext from '../context/IDBContext';

export default function useIDBContext() {
  const context = useContext(IDBContext)
  if (context === undefined) {
    throw new Error("useIDBContext must be within IDBProvider")
  }

  return context
}