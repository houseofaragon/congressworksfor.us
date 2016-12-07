import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import { bindActionCreators } from 'redux'
import { SET_SEARCH_TERM, SET_SEARCH_RESULTS, fetchLegislatorResults, fetchLegislators } from '../actions/index'

class LegislatorForm extends React.Component {
  constructor (props) {
    super(props)
    this.searchTermChange = this.searchTermChange.bind(this)
    this.getLegislators = this.getLegislators.bind(this)
    this.getRepresentatives = this.getRepresentatives.bind(this)
  }

  searchTermChange (e) {
    this.props.setSearchTerm(e.target.value)
  }

  getLegislators (e) {
    this.props.fetchLegislatorResults(this.props.searchTerm)
    e.preventDefault()
    browserHistory.push('/legislators')
  }

  getRepresentatives (e) {
    this.props.fetchLegislators(this.props.searchTerm)
    e.preventDefault()
    browserHistory.push('/legislators')
  }

  render () {
    return (
      <div className='form'>
        <form
          className="header-bar-search legislator"
          onSubmit={this.getLegislators}>
          <TextField
            className='search-field legislator'
            hintText="Search For a Legislator"
            onChange={this.searchTermChange} />
        </form>
        <h5> OR </h5>
        <form
          className="header-bar-search"
          onSubmit={this.getRepresentatives}>
          <TextField
            className='search-field'
            hintText="Enter Your Address & City"
            onChange={this.searchTermChange} />
        </form>
      </div>
    )
  }
}

LegislatorForm.propTypes = {
  handleSearchTermChange: React.PropTypes.func,
  handleRepresentatives: React.PropTypes.func,
  handleLegislators: React.PropTypes.func,
  searchTerm: React.PropTypes.string,
  fetchLegislatorResults: React.PropTypes.func,
  fetchLegislators: React.PropTypes.func,
  setSearchTerm: React.PropTypes.func
}

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm
})

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchTerm: (searchTerm) => {
      dispatch({type: SET_SEARCH_TERM, searchTerm: searchTerm})
    },
    setSearchResults: (searchTerm) => {
      dispatch({type: SET_SEARCH_RESULTS, searchTerm: searchTerm})
    },
    fetchLegislators: bindActionCreators(fetchLegislators, dispatch),
    fetchLegislatorResults: bindActionCreators(fetchLegislatorResults, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LegislatorForm)
