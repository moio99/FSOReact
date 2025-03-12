import { useSelector, useDispatch } from 'react-redux'

const Notifications = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anect => anect.content.includes(state.filter))
  })
  
  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: id
    })
  }
  
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications