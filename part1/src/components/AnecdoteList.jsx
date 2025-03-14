import { useSelector, useDispatch } from 'react-redux'
import { changeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anect => anect.content.includes(state.filter))
  })

  const sendVote = (anecdote) => {
    dispatch(changeAnecdote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }
  
  return (
    <div>
      {[...anecdotes]   // .sort() muta o matriz original polo que há que fazer umha copia
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => sendVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdotesList