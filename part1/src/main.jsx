import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import counterReducer from './reducers/reducer'
import './index.css'

const store = createStore(counterReducer)

const App = () => {
  const handleDispatch = (type) => {
    store.dispatch({ type })
  }

  const { good, ok, bad } = store.getState()

  return (
    <div>
      <button onClick={() => handleDispatch('GOOD')}>good</button>
      <button onClick={() => handleDispatch('OK')}>ok</button>
      <button onClick={() => handleDispatch('BAD')}>bad</button>
      <button onClick={() => handleDispatch('ZERO')}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
