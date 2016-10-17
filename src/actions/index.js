import promise from 'es6-promise'
promise.polyfill()
import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { groupBy, sortBy } from 'lodash'
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const SET_BILL = 'SET_BILL'
export const SET_VOTES = 'SET_VOTES'
export const SET_PERSON = 'SET_PERSON'
export const SET_OPEN_SEATS = 'SET_OPEN_SEATS'

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

export const setOpenSeats = (openSeats) => (
  {
    type: 'SET_OPEN_SEATS',
    openSeats
  }
)

export const fetchSearchResults = (searchTerm) => (dispatch) => {
  const searchURL = `https://congress.api.sunlightfoundation.com/bills/search?query="${searchTerm}"&apikey=a922e6b7b1004c37b7508366cd7500ac`
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
  const billURL = `https://congress.api.sunlightfoundation.com/bills?bill_id="${id}"&apikey=a922e6b7b1004c37b7508366cd7500ac`
  const billSummaryURL = `https://congress.api.sunlightfoundation.com/bills?bill_id="${id}"&fields=actions,summary,keywords&apikey=a922e6b7b1004c37b7508366cd7500ac`
  const votesURL = `https://congress.api.sunlightfoundation.com/votes?bill_id=${id}&apikey=a922e6b7b1004c37b7508366cd7500ac`

  const fetchBillData = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data.results[0])
    .catch((error) => console.log('request failed', error))
  }

  const fetchBillSummaryData = (url) => {
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

  Promise.all([fetchBillData(billURL), fetchBillVotes(votesURL), fetchBillSummaryData(billSummaryURL)])
    .then(results => {
      dispatch(setBill(results, searchTerm))
      browserHistory.push(`/bill/${id}`)
    }).catch((error) => {
      console.log('request failed', error)
      browserHistory.push(`/bill/${id}`)
    })
}

const groupByKey = (array, key) => {
  let newArray = groupBy(array, (item) => item.vote)
  return newArray
}

const sortByKey = (array, key) => {
  let newArray = sortBy(array, (item) => item.voter.state_name)
  return newArray
}

export const fetchVote = (id) => (dispatch) => {
  // const url = `https://www.govtrack.us/api/v2/vote_voter/?vote=${id}`
  const voteURL = `https://congress.api.sunlightfoundation.com/votes?roll_id=${id}&apikey=a922e6b7b1004c37b7508366cd7500ac`
  const voteDetailsURL = `https://congress.api.sunlightfoundation.com/votes?roll_id=${id}&fields=voters,breakdown&apikey=a922e6b7b1004c37b7508366cd7500ac`

  const fetchVote = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data.results[0])
    .catch((error) => console.log('request failed', error))
  }

  const fetchVoteDetails = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data.results[0])
    .catch((error) => console.log('request failed', error))
  }

  Promise.all([fetchVote(voteURL), fetchVoteDetails(voteDetailsURL)])
    .then(results => {
      groupByKey(results[1].voters, 'vote')
      let sortedResults = sortByKey(results[1].voters, 'voter.state_name')
      dispatch(setVotes([results[0], sortedResults, results[1].breakdown]))
    }).catch((error) => {
      console.log('request failed', error)
    })
}

export const fetchPerson = (id) => (dispatch) => {
  const personURL = `https://www.govtrack.us/api/v2/person/${id}`
  const personVoteHistoryURL = `https://www.govtrack.us/api/v2/vote_voter/?person=${id}&order_by=-created&format=json&fields=vote__id,vote__related_bill,vote__result,created,option__value,vote__category,vote__chamber,vote__question,vote__number`
  const personSponsorHistoryURL = `https://www.govtrack.us/api/v2/bill?sponsor=${id}&fields=title,%20title_without_number,id,introduced_date&sort=-introduced_date`
  // http://www.opensecrets.org/api/?method=candContrib&cid=N00033177&cycle=2016&apikey=6d0462ee1afaf49e79e6419cfd1f9581

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

  const fetchPersonSponsorHistory = (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => data.objects)
      .catch((error) => console.log('request failed', error))
  }

  Promise.all([fetchPerson(personURL), fetchPersonVoteHistory(personVoteHistoryURL), fetchPersonSponsorHistory(personSponsorHistoryURL)])
    .then(results => dispatch(setPerson(results)))
    .catch((error) => console.log('request failed', error))
}

export const fetchOpenSeats = (date) => (dispatch) => {
  const url = `https://congress.api.sunlightfoundation.com/legislators?term_end=${date}&per_page=50&chamber=senate&apikey=a922e6b7b1004c37b7508366cd7500ac`
  return fetch(url)
    .then(response => response.json())
    .then(data => dispatch(setOpenSeats(data.results)))
    .catch((error) => console.log('request failed', error))
}

