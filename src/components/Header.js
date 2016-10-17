import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { SET_SEARCH_TERM, SET_SEARCH_RESULTS, fetchSearchResults } from '../actions/index'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.getSearchResults = this.getSearchResults.bind(this)
  }
  handleSearchTermChange (e) {
    this.props.setSearchTerm(this.refs.term.getValue())
  }
  getSearchResults (e) {
    this.props.fetchSearchResults(this.refs.term.getValue())
    e.preventDefault()
  }
  handleTouchTap () {
    browserHistory.push('/')
  }
  render () {
    return (
      <AppBar
        title={<span style={styles.title}>Vote</span>}
        onTitleTouchTap={this.handleTouchTap}
      >
        <div>
          <FlatButton label="Bills" href='/bills' />
          <FlatButton label="Legislators" href='/legislators' />
        </div>
        <form onSubmit={this.getSearchResults}>
          <TextField
            hintText="By Bill or Legislator Name"
            floatingLabelText="SEARCH"
            ref="term"
            value={this.props.searchTerm}
            onChange={this.handleSearchTermChange}
          />
        </form>
      </AppBar>
    )
  }
}
const styles = {
  title: {
    cursor: 'pointer'
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

