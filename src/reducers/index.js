// import { combineReducers } from 'redux'
import { SET_DNC, SET_USER, SET_SEARCH_TERM, SET_BILL_RESULTS, SET_LEGISLATOR_RESULTS, MERGE_ENTITIES, SET_BILL, SET_VOTES, SET_PERSON, SET_OPEN_SEATS, SET_FILTER_VOTERS, SET_LEGISLATORS, SET_CURRENT_LEGISLATORS, SET_CURRENT_BILLS } from '../actions/index'
import merge from 'lodash/fp/merge'
import statesData from '../data/states-data'

const initialState = {
  searchTerm: '',
  bill: [{}, [], {}],
  person: [{}, [], []],
  openSeats: [],
  selectedDem: true,
  selectedRep: true,
  selectedYesVote: true,
  selectedNoVote: true,
  selectedNotVoting: true,
  votes: [],
  voters: [],
  voteInfo: {},
  voteTotalBreakDown: {},
  votePartyBreakDown: {},
  visiblevoters: [],
  regionData: statesData,
  emptyRegions: [],
  currentLegislators: [],
  legislators: {},
  bills: [],
  showCurrentLegs: true,
  showCurrentBills: true,
  activePage: 1,
  major_actions: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return reduceSearchTerm(state, action)
    case SET_BILL_RESULTS:
      return reduceSetBillResults(state, action)
    case SET_LEGISLATOR_RESULTS:
      return reduceLegislatorResults(state, action)
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
    case SET_LEGISLATORS:
      return reduceSetLegislators(state, action)
    case SET_CURRENT_LEGISLATORS:
      return reduceSetCurrentLegislators(state, action)
    case SET_CURRENT_BILLS:
      return reduceSetCurrentBills(state, action)
    case SET_USER:
      return reduceSetUser(state, action)
    case SET_DNC:
      return reduceSetDNC(state, action)
    default:
      return state
  }
}

const reduceSetDNC = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {delegates: action.delegates})
  return newState
}

const reduceSetUser = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {success: true})
  return newState
}

const reduceSearchTerm = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {searchTerm: action.searchTerm})
  return newState
}

const reduceSetBill = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {bill: action.bill, major_actions: action.bill.major_actions, votes: action.votes, searchTerm: action.searchTerm})
  return newState
}

const reduceSetCurrentBills = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {bills: action.bills, showCurrentBills: true, activePage: action.activePage})
  return newState
}

const reduceSetBillResults = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {bills: action.bills, searchTerm: action.searchTerm, showCurrentBills: false, activePage: 1})
  return newState
}

const reduceSetPerson = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {person: action.person, searchTerm: action.searchTerm})
  return newState
}

const reduceSetLegislators = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {legislators: action.legislators, total: action.total, searchTerm: action.searchTerm, showReps: true, showCurrentLegs: false})
  return newState
}

const reduceLegislatorResults = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {currentLegislators: action.results, searchTerm: action.searchTerm, showReps: false, showCurrentLegs: false})
  return newState
}

const reduceSetCurrentLegislators = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {currentLegislators: action.currentLegislators, showReps: false, showCurrentLegs: true, activePage: action.activePage})
  return newState
}

const reduceSetVotes = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {voteInfo: action.votes[0], voteBill: action.votes[0].vote, visibleVoters: action.votes, voters: action.votes, voteTotalBreakDown: action.votes[2], votePartyBreakDown: action.votes[3]})
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
  Object.assign(newState, state, {visibleVoters: action.visibleVoters, voteBill: action.visibleVoters[0].vote, selectedDem: action.selectedDem, selectedRep: action.selectedRep, selectedYesVote: action.selectedYesVote, selectedNoVote: action.selectedNoVote, selectedNotVoting: action.selectedNotVoting})
  return newState
}

export default reducer
