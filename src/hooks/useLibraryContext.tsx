import { useContext } from 'react'
import LibraryContext from '../context/LibraryContext'

export default function useLibraryContext() {
  const context = useContext(LibraryContext)
  if (context === undefined) {
    throw new Error("useLibraryContext must be within TodoProvider")
  }

  return context
}