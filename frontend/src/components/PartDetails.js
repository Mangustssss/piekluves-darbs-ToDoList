import { usePartsContext } from '../hooks/usePartsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PartDetails = ({ part }) => {
  const { dispatch } = usePartsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/parts/' + part._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_PART', payload: json})
    }
  }

  return (
    <div className="part-details">
      <h4>{part.title}</h4>
      <p><strong>Daudzums: </strong>{part.ammount}</p>
      <p><strong>Cena (Eur): </strong>{part.price}</p>
      <p>{formatDistanceToNow(new Date(part.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default PartDetails