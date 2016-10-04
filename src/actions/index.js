import promise from 'es6-promise'
promise.polyfill()
import fetch from 'isomorphic-fetch'
// import { normalize } from 'normalizr'
// import { arrayOfResults } from '../schemas/result'

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const SET_BILL = 'SET_BILL'
export const SET_VOTES = 'SET_VOTES'

// export const MERGE_ENTITIES = 'MERGE_ENTITIES'

export const setSearchTerm = (searchTerm) => (
  {
    type: SET_SEARCH_TERM,
    searchTerm: searchTerm
  }
)

export const setSearchResults = (results, searchTerm) => (
  {
    type: SET_SEARCH_RESULTS,
    results: results,
    searchTerm: searchTerm
  }
)

export const setBill = (bill) => (
  {
    type: SET_BILL,
    bill: bill
  }
)

export const setVotes = (votes) => (
  {
    type: SET_VOTES,
    votes: votes
  }
)

export const mergeEntities = (entities) => (
  {
    type: 'MERGE_ENTITIES',
    entities
  }
)

export const fetchSearchResults = (searchTerm) => (dispatch) => {
  console.log('fetching')
  const url = `https://www.govtrack.us/api/v2/bill?q=${searchTerm}&order_by=-current_status_date`
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(setSearchResults(data.objects, searchTerm))
    }).catch(function (error) {
      console.log('request failed', error)
    })
}

export const fetchBill = (id) => (dispatch) => {
  const url = `https://www.govtrack.us/api/v2/bill/${id}`
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(setBill(data))
    }).catch(function (error) {
      console.log('request failed', error)
    })
}

export const fetchVotes = (id) => (dispatch) => {
  const url = `https://www.govtrack.us/api/v2/vote/?related_bill=${id}`
  return fetch(url)
    .then(response => response.json())
    .then(data => dispatch(setVotes(data.objects)))
}

export const fetchVote = (id) => (dispatch) => {
  const url = `https://www.govtrack.us/api/v2/vote_voter/?vote=${id}`
  return fetch(url)
    .then(response => response.json())
    .then(data => dispatch(setVotes(data.objects)))
}

// fetch('https://www.govtrack.us/api/v2/vote_voter/?vote=' + obj.id)

export const fetchLegislators = (searchTerm) => (dispatch) => {
  const url = 'https://congress.api.sunlightfoundation.com/legislators?apikey=a922e6b7b1004c37b7508366cd7500ac'
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(setSearchResults(data.results, searchTerm))
    }).catch(function (error) {
      console.log('request failed', error)
    })
}

