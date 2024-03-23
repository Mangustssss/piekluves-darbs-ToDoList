import { PartsContext } from '../context/PartsContext'
import { useContext } from 'react'

export const usePartsContext = () => {
  const context = useContext(PartsContext)

  if (!context) {
    throw Error('usePartsContext must be used inside an PartsContextProvider')
  }

  return context
}