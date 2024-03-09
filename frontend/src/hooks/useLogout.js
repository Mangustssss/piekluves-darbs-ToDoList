import { useAuthContext } from './useAuthContext'
import { usePartsContext } from './usePartsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchParts } = usePartsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchParts({ type: 'SET_PARTS', payload: null })
  }

  return { logout }
}