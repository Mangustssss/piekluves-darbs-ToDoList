import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import PartDetails from '../components/PartDetails'
import PartsForm from '../components/PartsForm'
import { usePartsContext } from '../hooks/usePartsContext'

const Home = () => {
  const {parts, dispatch} = usePartsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchParts = async () => {
      const response = await fetch('/api/parts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchParts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="parts">
        {parts && parts.map((part) => (
          <PartDetails key={part._id} part={part} />
        ))}
      </div>
      <PartsForm />
    </div>
  )
}

export default Home