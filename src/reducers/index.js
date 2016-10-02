/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
/* Populated by react-webpack-redux:reducer */
// import { combineReducers } from 'redux'
import { SET_SEARCH_TERM, SET_SEARCH_RESULTS } from '../actions/index'

const initialState = {
  searchTerm: '',
  results: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return reduceSearchTerm(state, action)
    case SET_SEARCH_RESULTS:
      return reduceSearchResults(state, action)
    default:
      return state
  }
}

const reduceSearchTerm = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {searchTerm: action.searchTerm})
  return newState
}

const reduceSearchResults = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {results: action.results, searchTerm: action.searchTerm})
  return newState
}

export default reducer
