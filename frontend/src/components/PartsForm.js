import { useState } from "react"
import { usePartsContext } from "../hooks/usePartsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const PartsForm = () => {
  const { dispatch } = usePartsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [ammount, setAmmount] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const part = {title, ammount, price}

    const response = await fetch('/api/parts', {
      method: 'POST',
      body: JSON.stringify(part),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setAmmount('')
      setPrice('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_PART', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Iepirkumi</h3>

      <label>
        Kas jāpērk?
        <input 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />      
      </label>

      <label>
        Cik daudz:
        <input 
        type="number"
        onChange={(e) => setAmmount(e.target.value)}
        value={ammount}
        className={emptyFields.includes('ammount') ? 'error' : ''}
        />
      </label>
      

      <label>
        Cena:
      <input 
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes('price') ? 'error' : ''}
      />
      </label>

      <button>Add Part to list</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PartsForm