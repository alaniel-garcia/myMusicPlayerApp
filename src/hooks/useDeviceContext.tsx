import { useContext } from 'react';
import DeviceContext from '../context/DeviceContext';

export default function useDeviceContext() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDeviceContext must be within DeviceProvider")
  }

  return context
}