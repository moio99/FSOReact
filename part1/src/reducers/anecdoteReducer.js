import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote, id: getId(), votes: 0
  }
}

const anecSlice = createSlice({
  // O createSlice é umha funcionalidade do Redux Toolkit que simplifica a criaçom de redutores no Redux.
  // Em vez de escrever um grande caso de switch num redutor tradicional, 
  // o createSlice permite definir o estado inicial, os redutores e as açons, todo num só local.
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      console.log(current(state))
      const id = action.payload.id
      return state.map(a => 
        a.id !== id ? a : { ...a, votes: action.payload.votes }
      )  
    },
    appendAnecdote(state, action) {   // Para engadir as notas umha por umha dende o anecdoteService.getAll()
      state.push(action.payload)
    },
    setAnecdotes(state, action) {     // Para engadir toas as notas dende o anecdoteService.getAll()
      return action.payload
    }
  },
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecSlice.actions

// Estos som os 'action creator':

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = asObject(content)
    const createAnecdote = await anecdoteService.createNew(newAnecdote)
    dispatch(appendAnecdote(createAnecdote))
  }
}

export const changeAnecdote = id => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes
    const anecdoteToChange = state.find(a => a.id === id)
    if (!anecdoteToChange) return

    const updatedAnecdote = { 
      ...anecdoteToChange, 
      votes: anecdoteToChange.votes + 1 
    }
    const changeAnecdote = await anecdoteService.changeVotes(id, updatedAnecdote)
    dispatch(voteAnecdote(changeAnecdote))
  }
}

export default anecSlice.reducer