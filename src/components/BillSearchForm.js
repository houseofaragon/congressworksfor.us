import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import { bindActionCreators } from 'redux'
import { SET_SEARCH_TERM, SET_SEARCH_RESULTS, fetchBillResults } from '../actions/index'

class BillSearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.searchTermChange = this.searchTermChange.bind(this)
    this.getSearchResults = this.getSearchResults.bind(this)
  }

  searchTermChange (e) {
    this.props.setSearchTerm(e.target.value)
  }

  getSearchResults (e) {
    e.preventDefault()
    this.props.fetchBillResults(this.props.searchTerm)
    browserHistory.push('/bills')
  }

  render () {
    return (
      <div className='form'>
        <form
          className="header-bar-search"
          onSubmit={this.getSearchResults}>
          <TextField
            className='search-field bill'
            hintText="Search for a bill (Planned Parenthood, ObamaCare)"
            floatingLabelText=""
            ref="term"
            onChange={this.searchTermChange}
          />
        </form>
      </div>
    )
  }
}

BillSearchForm.propTypes = {
  setSearchTerm: React.PropTypes.func,
  searchTerm: React.PropTypes.string,
  fetchBillResults: React.PropTypes.func
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
    fetchBillResults: bindActionCreators(fetchBillResults, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillSearchForm)
