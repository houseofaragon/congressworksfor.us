import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SET_SEARCH_TERM, SET_SEARCH_RESULTS, fetchSearchResults } from '../actions/index'
class Header extends React.Component {
  constructor (props) {
    super(props)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.getSearchResults = this.getSearchResults.bind(this)
  }
  handleSearchTermChange (e) {
    this.props.setSearchTerm(this.refs.term.value)
  }
  getSearchResults (e) {
    this.props.fetchSearchResults(this.refs.term.value)
    browserHistory.push('browse')
    e.preventDefault()
  }
  render () {
    return (
      <header className='header'>
        <h1 className='brand'>
          <Link to='/' className='brand-link' />
        </h1>
        <form onSubmit={this.getSearchResults}>
          <input type='text' ref='term' className='search-input' placeholder='Search' value={this.props.searchTerm} onChange={this.handleSearchTermChange} />

        </form>
      </header>
    )
  }
}

Header.propTypes = {
  setSearchTerm: React.PropTypes.func,
  searchTerm: React.PropTypes.string,
  fetchSearchResults: React.PropTypes.func,
  results: React.PropTypes.array
}

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  results: state.results
})

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchTerm: (searchTerm) => {
      dispatch({type: SET_SEARCH_TERM, searchTerm: searchTerm})
    },
    setSearchResults: (searchTerm) => {
      dispatch({type: SET_SEARCH_RESULTS, searchTerm: searchTerm})
    },
    fetchSearchResults: bindActionCreators(fetchSearchResults, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

