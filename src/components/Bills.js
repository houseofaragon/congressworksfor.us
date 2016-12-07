/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SET_SEARCH_TERM, SET_BILL_RESULTS, fetchBillResults, fetchCurrentBills } from '../actions/index'
import Browse from './Browse'
import BillSearchForm from './BillSearchForm'

class Bills extends React.Component {
  constructor (props) {
    super(props)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.getSearchResults = this.getSearchResults.bind(this)
    if(this.props.showCurrentBills) this.props.fetchCurrentBills()
  }

  handleSearchTermChange (e) {
    e.preventDefault()
    this.props.setSearchTerm(this.refs.term.getValue())
  }

  getSearchResults (e) {
    e.preventDefault()
    this.props.fetchBillResults(this.refs.term.getValue())
  }

  getCurrentBills () {
    this.props.fetchCurrentBills()
  }

  render () {
    const { searchTerm } = this.props || {}
    const  { bills } = this.props || {}

    return (
      <div className="container">
        <BillSearchForm />
        <div className="bill-title">
          <p> Your searched for {this.props.searchTerm} </p>
          <p> Click on a bill to find more detailed information
          like who sponsored the bill, which legislators voted for or against it. </p>
          <button onClick={this.getCurrentBills.bind(this)}>View Current Bills </button>
        </div>
        <div className="bill-details">
           <Browse bills={bills} searchTerm={searchTerm} />
        </div>
      </div>
    )
  }
}

Bills.propTypes = {
  setSearchTerm: React.PropTypes.func,
  searchTerm: React.PropTypes.string,
  fetchBillResults: React.PropTypes.func,
  bills: React.PropTypes.array
}

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  bills: state.bills,
  showCurrentBills: state.showCurrentBills
})

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchTerm: (searchTerm) => {
      dispatch({type: SET_SEARCH_TERM, searchTerm: searchTerm})
    },
    setSearchResults: (searchTerm) => {
      dispatch({type: SET_SEARCH_RESULTS, searchTerm: searchTerm})
    },
    fetchBillResults: bindActionCreators(fetchBillResults, dispatch),
    fetchCurrentBills: bindActionCreators(fetchCurrentBills, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bills)

