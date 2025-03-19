/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import Menu from './componets/Menu'
import About from './componets/About'
import Footer from './componets/Footer'
import AnecdotesInfo from './componets/AnecdotesInfo'
import  { useField } from './hooks'
import './index.css'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <div>{anecdote.content}, by {anecdote.author}</div>
      <div>has {anecdote.votes} votes</div>
    </div>
  )
}

const AnecdoteWrapper = ({ anecdotes }) => {
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return <Anecdote anecdote={anecdote} />
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const url = useField('url')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name)
    props.addNew({ content: content.value, author: author.value, info: url.value, votes: 0 })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type={content.type} value={content.value} onChange={content.onChange} /> 
        </div>
        <div>
          author
          <input type={author.type} value={author.value} onChange={author.onChange} /> 
        </div>
        <div>
          url for more info
          <input type={url.type} value={url.value} onChange={url.onChange} /> 
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [notification, setNotification] = useState('')

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    showInfo(`A new anecdote "${anecdote.content}" created!`)
  }

  const showInfo = (info) => {
    setNotification(info)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <AnecdotesInfo info={notification} />
        <Routes>
          <Route path="/anecdotes/:id" element={
            <AnecdoteWrapper anecdotes={anecdotes} />
          } />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
