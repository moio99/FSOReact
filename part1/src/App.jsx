import { useEffect } from 'react'
import Filter from './components/Filter'
import AnecdotesList from './components/AnecdoteList'
import AddNotification from './components/AnecdoteForm'
import AnecdotesInfo from './components/AnecdoteInfo'
import anecdoteService from './services/anecdotes'
import { setAnecdotes} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdote => dispatch(setAnecdotes(anecdote))
    )
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesInfo></AnecdotesInfo>
      <Filter></Filter>
      <AnecdotesList></AnecdotesList>
      <AddNotification></AddNotification>
    </div>
  )
}

export default App