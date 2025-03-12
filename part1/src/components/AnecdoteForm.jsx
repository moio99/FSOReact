import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/anecdoteReducer'

const AddNotification = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.notification.value
    event.target.notification.value = ''
    dispatch(createNotification(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <input name="notification" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AddNotification