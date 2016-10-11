import promise from 'es6-promise'
promise.polyfill()
import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const SET_BILL = 'SET_BILL'
export const SET_VOTES = 'SET_VOTES'
export const SET_PERSON = 'SET_PERSON'

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

export const setPerson = (person) => (
  {
    type: SET_PERSON,
    person: person
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
/*
export const fetchSearchResults = (searchTerm) => (dispatch) => {
  // const searchURL = `https://congress.api.sunlightfoundation.com/bills/search?query="${searchTerm}"&apikey=a922e6b7b1004c37b7508366cd7500ac`
  // const personURL = `https://www.govtrack.us/api/v2/person?q=${searchTerm}`

  /*
  const fetchBills = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Data results', data.results)
      data.results
    })
    .catch((error) => console.log('request failed', error))
  }

  const fetchPersons = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Data objects', data.objects)
      data.objects
    })
    .catch((error) => console.log('request failed', error))
  }

  Promise.all([fetchBills(searchURL)])
    .then(results => {
      console.log('Results', results)
      dispatch(setSearchResults(results, searchTerm))
      // browserHistory.push('/browse')
    }).catch((error) => {
      console.log('request failed', error)
      // browserHistory.push('/browse')
    })
}
*/

export const fetchSearchResults = (searchTerm) => (dispatch) => {
  const searchURL = `https://congress.api.sunlightfoundation.com/bills/search?query="${searchTerm}"&order=introduced_on&apikey=a922e6b7b1004c37b7508366cd7500ac`
  const personURL = `https://www.govtrack.us/api/v2/person?q=${searchTerm}`

  const fetchBills = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .catch((error) => console.log('request failed', error))
  }

  const fetchPersons = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data.objects)
    .catch((error) => console.log('request failed', error))
  }

  Promise.all([fetchBills(searchURL), fetchPersons(personURL)])
    .then(results => {
      console.log(results)
      dispatch(setSearchResults(results, searchTerm))
      browserHistory.push('/browse')
    }).catch((error) => {
      console.log('request failed', error)
      browserHistory.push('/browse')
    })
}

export const fetchBill = (id, searchTerm) => (dispatch) => {
  // const billURL = `https://congress.api.sunlightfoundation.com/bills?bill_id="${id}"&apikey=a922e6b7b1004c37b7508366cd7500ac`
  // const votesURL = `https://www.govtrack.us/api/v2/vote/?related_bill=${id}`
  const votesURL = `https://congress.api.sunlightfoundation.com/votes?bill_id=${id}&fields=voters,voter_ids, chamber, number, year, congress, voted_at, voted_type, result, voters.vote,voters.voter,breakdown&apikey=a922e6b7b1004c37b7508366cd7500ac`
  const billURL = `https://congress.api.sunlightfoundation.com/bills?bill_id="${id}"&fields=bill_id, bill_type, number, congress, chamber, introduced_on, official_title, short_title, sponsor,related_bill_ids,history,committees,votes,actions,summary,keywords&apikey=a922e6b7b1004c37b7508366cd7500ac`

  const fetchBillData = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data.results[0])
    .catch((error) => console.log('request failed', error))
  }

  const fetchBillVotes = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .catch((error) => console.log('request failed', error))
  }

  Promise.all([fetchBillData(billURL), fetchBillVotes(votesURL)])
    .then(results => {
      dispatch(setBill(results, searchTerm))
      browserHistory.push(`/bill/${id}`)
    }).catch((error) => {
      console.log('request failed', error)
      browserHistory.push(`/bill/${id}`)
    })
}

export const fetchVote = (id) => (dispatch) => {
  const url = `https://www.govtrack.us/api/v2/vote_voter/?vote=${id}`
  return fetch(url)
    .then(response => response.json())
    .then(data => dispatch(setVotes(data.objects)))
}

export const fetchPerson = (id) => (dispatch) => {
  const personURL = `https://www.govtrack.us/api/v2/person/${id}`
  const personVoteHistoryURL = `https://www.govtrack.us/api/v2/vote_voter/?person=${id}&order_by=-created&format=json&fields=vote__id,vote__related_bill,vote__result,created,option__value,vote__category,vote__chamber,vote__question,vote__number`

  const fetchPerson = (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch((error) => console.log('request failed', error))
  }

  const fetchPersonVoteHistory = (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => data.objects)
      .catch((error) => console.log('request failed', error))
  }
  Promise.all([fetchPerson(personURL), fetchPersonVoteHistory(personVoteHistoryURL)])
    .then(results => dispatch(setPerson(results)))
    .catch((error) => console.log('request failed', error))
}

