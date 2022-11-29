import { useContext } from 'react';
import SelectionContext from '../context/SelectionContext';

export default function useSelectionContext() {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error("useSelectionContext must be within SelectionProvider")
  }

  return context
}