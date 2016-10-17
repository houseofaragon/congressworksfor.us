import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import reducer from '../reducers'
import { routerMiddleware } from 'react-router-redux'

const router = routerMiddleware(browserHistory)

export default function configureStore (initialState) {
  return applyMiddleware(thunk, router, createLogger())(createStore)(reducer, initialState, window.devToolsExtension && window.devToolsExtension())
}

// Disable the logger for better performance
// export default function configureStore(initialState) {
//   return createStore(reducer, initialState);
// }
