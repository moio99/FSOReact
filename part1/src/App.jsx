import Filter from './components/Filter'
import Notifications from './components/AnecdoteList'
import AddNotification from './components/AnecdoteForm'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <Notifications></Notifications>
      <AddNotification></AddNotification>
    </div>
  )
}

export default App