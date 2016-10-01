export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'

export const setSearchTerm = (term) => (
  {
    type: SET_SEARCH_TERM,
    value: term
  }
)

export const fetchData = (nextHref, term) => (dispatch) => {
  const url = `http://soundcloud.com/${artist}`;

  return fetch(url)
    .then(resolved => fetch(resolved.url))
    .then(body => body.json())
    .then(data => {
      const bio = data.description || ''
      dispatch(setSearchTerm(term))
    })
}
