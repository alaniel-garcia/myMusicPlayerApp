import { useContext } from 'react';
import OptionsContext from '../context/OptionsContext';

export default function useOptionsContext() {
  const context = useContext(OptionsContext)
  if (context === undefined) {
    throw new Error("useOptionsContext must be within OptionsProvider")
  }

  return context
}