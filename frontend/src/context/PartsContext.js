import { createContext, useReducer } from 'react'

export const PartContext = createContext()

export const partsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PARTS': 
      return {
        parts: action.payload
      }
    case 'CREATE_PART':
      return {
        parts: [action.payload, ...state.parts]
      }
    case 'DELETE_PART':
      return {
        parts: state.parts.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const PartsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, {
    parts: null
  })

  return (
    <PartContext.Provider value={{...state, dispatch}}>
      { children }
    </PartContext.Provider>
  )
}