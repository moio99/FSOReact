import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import anecReducer from './reducers/anecdoteReducer'
import './index.css'

const store = createStore(anecReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)