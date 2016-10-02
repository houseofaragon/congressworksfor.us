import promise from 'es6-promise'
promise.polyfill()
import fetch from 'isomorphic-fetch'
console.log(fetch)
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'

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

export const fetchSearchResults = (searchTerm) => (dispatch) => {
  const url = `https://congress.api.sunlightfoundation.com/bills/search?query=${searchTerm}&apikey=a922e6b7b1004c37b7508366cd7500ac`
  console.log(url)
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      dispatch(setSearchResults(data.results, searchTerm))
    }).catch(function (error) {
      console.log('request failed', error)
    })
}
