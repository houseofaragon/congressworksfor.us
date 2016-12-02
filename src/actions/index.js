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
export const SET_FILTER_VOTERS = 'SET_FILTER_VOTERS'
export const SET_LEGISLATORS = 'SET_LEGISLATORS'

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

export const setFilteredVoters = (selectedDem, selectedRep, selectedYesVote, selectedNoVote, selectedNotVoting, visibleVoters) => (
  {
    type: 'SET_FILTER_VOTERS',
    visibleVoters,
    selectedDem, selectedRep, selectedYesVote, selectedNoVote, selectedNotVoting
  }
)

export const setLegislators = (legislators) => (
  {
    type: 'SET_LEGISLATORS',
    legislators: legislators
  }
)

export const fetchSearchResults = (searchTerm) => (dispatch) => {
  const searchURL = `https://www.govtrack.us/api/v2/bill?q=${searchTerm}`
  const personURL = `https://www.govtrack.us/api/v2/person?q=${searchTerm}`

  const fetchBills = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data.objects)
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
  let newArray = sortBy(array, (item) => item.voter.state_name).map((item) => Object.assign({}, item.voter, {'vote': item.vote}))
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
      dispatch(setVotes([results[0], sortedResults, results[1].breakdown.total, results[1].breakdown.party]))
    }).catch((error) => {
      console.log('request failed', error)
    })
}

export const getLegislators = (address) => (dispatch) => {
  const url = `https://search.mapzen.com/v1/search?text=${address}`

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const state = data.features[0].properties.region_a
      const coordinates = data.features[0].geometry.coordinates
      const url = `https://houseofaragon.carto.com/api/v2/sql?q=SELECT cd115fp FROM tl_2016_us_cd115 where st_within(st_setsrid(st_point(${coordinates[0]}, ${coordinates[1]}), 4326), the_geom)`
      fetch(url)
      .then(response => response.json())
      .then(data => {
        const district = data.rows[0].cd115fp
        const url = `https://www.govtrack.us/api/v2/role/?current=true&state=${state}&district=${district}`
        fetch(url)
        .then(response => response.json())
        .then(data => {
          const legislators = data
          const url = `https://www.govtrack.us/api/v2/role/?current=true&state=${state}&district=null`
          fetch(url)
          .then(response => response.json())
          .then(data => {
            legislators['senators'] = data
            dispatch(setLegislators(legislators))
            browserHistory.push('/legislators')
          })
        })
      })
    })
    .catch((error) => console.log('request failed', error))
}

export const fetchPerson = (id) => (dispatch) => {
  const personURL = `https://www.govtrack.us/api/v2/person/${id}`
  const personVoteHistoryURL = `https://www.govtrack.us/api/v2/vote_voter/?person=${id}&order_by=-created&format=json&fields=vote__id,vote__related_bill,vote__result,created,option__value,vote__category,vote__chamber,vote__question,vote__number`
  const personSponsorHistoryURL = `https://www.govtrack.us/api/v2/bill?sponsor=${id}&fields=title,%20title_without_number,id,display_number,congress,introduced_date&sort=-introduced_date`

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
  const url = `https://congress.api.sunlightfoundation.com/legislators?term_end=${date}&per_page=100&chamber=senate&apikey=a922e6b7b1004c37b7508366cd7500ac`
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      let sortedResults = sortBy(data.results, (item) => item.state_name)
      dispatch(setOpenSeats(sortedResults))
    })
    .catch((error) => console.log('request failed', error))
}

export const getFilteredVotes = (filter, selectedDem, selectedRep, selectedYesVote, selectedNoVote, selectedNotVoting, voters) => (dispatch) => {
  let visibleVoters = []
  if (selectedRep && selectedDem && selectedYesVote && selectedNoVote && selectedNotVoting) visibleVoters = voters
  else if (selectedRep && selectedDem && !selectedYesVote && selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.vote !== 'Yea')
  else if (selectedRep && selectedDem && selectedYesVote && !selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.vote !== 'Nay')
  else if (selectedRep && selectedDem && selectedYesVote && selectedNoVote && !selectedNotVoting) visibleVoters = voters.filter((v) => v.vote !== 'Not Voting')
  else if (selectedRep && selectedDem && selectedYesVote && !selectedNoVote && !selectedNotVoting) visibleVoters = voters.filter((v) => v.vote === 'Yea')
  else if (selectedRep && selectedDem && !selectedYesVote && !selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.vote === 'Not Voting')
  else if (selectedRep && selectedDem && !selectedYesVote && selectedNoVote && !selectedNotVoting) visibleVoters = voters.filter((v) => v.vote === 'Nay')

  else if (!selectedRep && selectedDem && selectedYesVote && selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'D')
  else if (!selectedRep && selectedDem && !selectedYesVote && selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'D' && v.vote !== 'Yea')
  else if (!selectedRep && selectedDem && selectedYesVote && !selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'D' && v.vote !== 'Nay')
  else if (!selectedRep && selectedDem && selectedYesVote && selectedNoVote && !selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'D' && v.vote !== 'Not Voting')
  else if (!selectedRep && selectedDem && selectedYesVote && !selectedNoVote && !selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'D' && v.vote === 'Yea')
  else if (!selectedRep && selectedDem && !selectedYesVote && !selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'D' && v.vote === 'Not Voting')
  else if (!selectedRep && selectedDem && !selectedYesVote && selectedNoVote && !selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'D' && v.vote === 'Nay')

  else if (selectedRep && !selectedDem && selectedYesVote && selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'R')
  else if (selectedRep && !selectedDem && !selectedYesVote && selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'R' && v.vote !== 'Yea')
  else if (selectedRep && !selectedDem && selectedYesVote && !selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'R' && v.vote !== 'Nay')
  else if (selectedRep && !selectedDem && selectedYesVote && selectedNoVote && !selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'R' && v.vote !== 'Not Voting')
  else if (selectedRep && !selectedDem && selectedYesVote && !selectedNoVote && !selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'R' && v.vote === 'Yea')
  else if (selectedRep && !selectedDem && !selectedYesVote && !selectedNoVote && selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'R' && v.vote === 'Not Voting')
  else if (selectedRep && !selectedDem && !selectedYesVote && selectedNoVote && !selectedNotVoting) visibleVoters = voters.filter((v) => v.party === 'R' && v.vote === 'Nay')

  dispatch(setFilteredVoters(selectedDem, selectedRep, selectedYesVote, selectedNoVote, selectedNotVoting, visibleVoters))
}
