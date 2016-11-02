// import { combineReducers } from 'redux'
import { SET_SEARCH_TERM, SET_SEARCH_RESULTS, MERGE_ENTITIES, SET_BILL, SET_VOTES, SET_PERSON, SET_OPEN_SEATS, SET_FILTER_VOTERS } from '../actions/index'
import merge from 'lodash/fp/merge'
import statesData from '../data/states-data'

const initialState = {
  searchTerm: '',
  results: [[], []],
  bill: [{}, [], {}],
  person: [{}, [], []],
  openSeats: [],
  selectedDem: true,
  selectedRep: true,
  selectedYesVote: true,
  selectedNoVote: true,
  selectedNotVoting: true,
  voters: [],
  voteInfo: {},
  voteTotalBreakDown: {},
  votePartyBreakDown: {},
  visiblevoters: [],
  regionData: statesData,
  emptyRegions: []
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
    case SET_OPEN_SEATS:
      return reduceSetOpenSeats(state, action)
    case SET_FILTER_VOTERS:
      return reduceSetFilteredVoters(state, action)
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
  Object.assign(newState, state, {bill: action.bill, sponsor: action.bill[0].sponsor, sponsor_id: action.bill[0].sponsor_id})
  return newState
}

const reduceSetVotes = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {voteInfo: action.votes[0], visibleVoters: action.votes[1], voters: action.votes[1], voteTotalBreakDown: action.votes[2], votePartyBreakDown: action.votes[3]})
  return newState
}

const reduceSetPerson = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {person: action.person})
  return newState
}

const reduceSetOpenSeats = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {openSeats: action.openSeats})
  return newState
}

const reduceMergeEntities = (state, action) => {
  return merge(action.entities, state, {})
}

const reduceSetFilteredVoters = (state, action) => {
  const newState = {}
  console.log('action', action)
  Object.assign(newState, state, {visibleVoters: action.visibleVoters, selectedDem: action.selectedDem, selectedRep: action.selectedRep, selectedYesVote: action.selectedYesVote, selectedNoVote: action.selectedNoVote, selectedNotVoting: action.selectedNotVoting})
  return newState
}

export default reducer
