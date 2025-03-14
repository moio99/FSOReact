import { useSelector } from 'react-redux'

const AnecdotesInfo = () => {
  
  // Quando cambia state.notification notification tem um novo valor, isto faz que se rederice de novo
  const notification = useSelector(state => state.notification)

  return notification ? <div>{notification}</div> : null
}

export default AnecdotesInfo