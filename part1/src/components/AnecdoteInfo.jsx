import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const AnecdotesInfo = () => {
  const dispatch = useDispatch()
  
  // Quando cambia state.notification notification tem um novo valor, isto faz que se rederice de novo
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])  // O efecto ejecúta-se quando o notification ou dispatch cambiem
  
  return notification ? <div>{notification}</div> : null
}

export default AnecdotesInfo