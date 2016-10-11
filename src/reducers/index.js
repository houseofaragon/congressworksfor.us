// import { combineReducers } from 'redux'
import { SET_SEARCH_TERM, SET_SEARCH_RESULTS, MERGE_ENTITIES, SET_BILL, SET_VOTES, SET_PERSON } from '../actions/index'
import merge from 'lodash/fp/merge'

const initialState = {
  searchTerm: '',
  results: [],
  bill: [],
  votes: [],
  person: [{}, []]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return reduceSearchTerm(state, action)
    case SET_SEARCH_RESULTS:
      return reduceSearchResults(state, action)
    case MERGE_ENTITIES:
      return reduceMergeEntities(state, action)
    case SET_BILL:
      return reduceSetBill(state, action)
    case SET_VOTES:
      return reduceSetVotes(state, action)
    case SET_PERSON:
      return reduceSetPerson(state, action)
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

const reduceSetBill = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {bill: action.bill})
  return newState
}

const reduceSetVotes = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {votes: action.votes})
  return newState
}

const reduceSetPerson = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {person: action.person})
  return newState
}

const reduceMergeEntities = (state, action) => {
  return merge(action.entities, state, {})
}

export default reducer
