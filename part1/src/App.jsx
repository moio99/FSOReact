import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdoteVote } from './requests'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return null
    default:
      return state
  }
}

const App = () => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()

  const showInfo = (text) => {
    dispatchNotification({ type: 'SHOW', payload: text })
    setTimeout(() => {
      dispatchNotification({ type: 'HIDE' })
    }, 5000)
  }

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdoteVote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showInfo(`Anecdote '${updatedAnecdote.content}' voted`)
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (isPending) return <span>Loading...</span>
  if (isError) return <span>Error: {error.message}</span>
  if ( data.isLoading ) return <div>loading data...</div>
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={notification} />
      <AnecdoteForm showInfo={showInfo} />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
