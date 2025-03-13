import Filter from './components/Filter'
import AnecdotesList from './components/AnecdoteList'
import AddNotification from './components/AnecdoteForm'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <AnecdotesList></AnecdotesList>
      <AddNotification></AddNotification>
    </div>
  )
}

export default App