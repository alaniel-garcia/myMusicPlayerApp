import { useContext } from 'react'
import SizeContext from '../context/SizeContext'


export default function useSizeContext() {
  const context = useContext(SizeContext)

  if (context === undefined) {
    throw new Error("useSizeContext must be within SizeProvider")
  }

  return context
}