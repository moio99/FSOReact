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
    createAnecdote(state, action) {   // Nom tem return porque nom crea um novo estado só o modifica
      // Esta funçom modifica o estado directamente utilizando state.push(newAnecdote),
      // graças a Immer, que está integrado em Redux Toolkit.
      // Immer permite escrever mutaçons "aparentes" sem violar a inmutabilidade em Redux.
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    },
    vote(state, action) {
      console.log(current(state))
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : changedAnecdote 
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

export const { createAnecdote, vote, showInfo, appendAnecdote, setAnecdotes } = anecSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecSlice.reducer