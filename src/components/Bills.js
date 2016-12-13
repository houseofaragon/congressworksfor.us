/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SET_SEARCH_TERM, SET_BILL_RESULTS, fetchBillResults, fetchCurrentBills } from '../actions/index'
import Browse from './Browse'
import BillSearchForm from './BillSearchForm'
import Pagination from 'react-js-pagination'

class Bills extends React.Component {
  constructor (props) {
    super(props)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.getSearchResults = this.getSearchResults.bind(this)
    this.getCurrentBills = this.getCurrentBills.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    if(this.props.showCurrentBills) this.props.fetchCurrentBills(this.props.activePage)
  }

  handleSearchTermChange (e) {
    e.preventDefault()
    this.props.setSearchTerm(this.refs.term.getValue())
  }

  getSearchResults (e) {
    e.preventDefault()
    this.props.fetchBillResults(this.refs.term.getValue())
  }

  getCurrentBills (pageNumber) {
    this.props.fetchCurrentBills(1)
  }

  handlePageChange (pageNumber) {
    this.getCurrentBills(pageNumber)
  }

  render () {
    const { searchTerm } = this.props || {}
    const  { bills } = this.props || {}

    return (
      <div className="container">
        <BillSearchForm />
        <div className="bill-title">
          {this.props.showCurrentBills ? <h1> All Current Bills in Congress </h1> : <div><h1> All bills pertaining to:  <em>{this.props.searchTerm}</em> </h1><button className='vote-button' onClick={this.getCurrentBills.bind(this)}>View Current Bills </button></div>}
        </div>
        <div className="bill-details">
          <Pagination
            className='pagination'
            activePage={this.props.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange} />
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
  bills: React.PropTypes.array,
  activePage: React.PropTypes.number
}

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  bills: state.bills,
  showCurrentBills: state.showCurrentBills,
  activePage: state.activePage
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

