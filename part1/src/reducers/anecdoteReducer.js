import { createSlice, current } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote, id: getId(), votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecSlice = createSlice({
  // O createSlice é umha funcionalidade do Redux Toolkit que simplifica a criaçom de redutores no Redux.
  // Em vez de escrever um grande caso de switch num redutor tradicional, 
  // o createSlice permite definir o estado inicial, os redutores e as açons, todo num só local.
  name: 'anecdotes',
  initialState: initialState,
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
  },
})

export const { createAnecdote, vote, showInfo } = anecSlice.actions
export default anecSlice.reducer