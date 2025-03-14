import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AddNotification = () => {
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.notification.value
    event.target.notification.value = ''
    await anecdoteService.createNew({
      content: content, id: getId(), votes: 0
    })
    dispatch(createAnecdote(content))
    dispatch(setNotification(`Created '${content}'`))
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