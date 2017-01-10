/*eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { SET_SEARCH_TERM, fetchCurrentLegislators, fetchLegislatorResults, fetchLegislators } from '../actions/index'
import TextField from 'material-ui/TextField'
import Representatives from './Representatives'
import LegislatorForm from './LegislatorForm'
import Pagination from 'react-js-pagination'
import Spinner from 'react-spinner'

class Legislators extends React.Component {
  constructor (props) {
    super(props)
    if(this.props.showCurrentLegs) this.props.fetchCurrentLegislators(this.props.activePage, 1)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange (pageNumber) {
    let offset
    if(pageNumber === 1) { offset = pageNumber }
    else { offset = (pageNumber - 1) * 25 }
    this.props.fetchCurrentLegislators(pageNumber, offset)
  }

  render () {
    const data = this.props.currentLegislators || {}
    const { legislators } = this.props || {}
    let currentLegislators = data.map((legislator, idx) => (
      <div className='legislator' key={idx} >
        <Link to={`/person/${legislator.person ? legislator.person.id : legislator.id}`}>
          <h2>{legislator.person ? legislator.person.firstname : legislator.sortname } {legislator.person ? legislator.person.lastname : '' }</h2>
          <div id='currentLegislators'>
            {legislator.party ? <h5>{legislator.party} - {legislator.description ? legislator.description : '' }</h5> : '' }
          </div>
        </Link>
      </div>
    ))

    let representatives = null
    if(this.props.showReps){
      representatives = <Representatives reps={legislators.objects[0]} senators={legislators.senators.objects} />
    }

    return (
      <div className='container'>
        <LegislatorForm />
        <div className='bill-title'>
          {this.props.showCurrentLegs ? <h1>These are the people who work for you in the Senate and House of Representatives in the 115th Congress.</h1> : <h1> Legislator(s) based on your search for: <em>{this.props.searchTerm}</em></h1>}
        </div>
        <div className='bill-details'>
          {this.props.showCurrentLegs ? <Pagination
            activePage={this.props.activePage}
            itemsCountPerPage={25}
            totalItemsCount={535}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange} /> : '' }
          <div id='legislators'>
            {!this.props.currentLegislators ? <Spinner /> : ''}
            {this.props.showReps ? representatives : currentLegislators}
          </div>
        </div>
      </div>
    )
  }
}

Legislators.propTypes = {
  regionData: React.PropTypes.array.isRequired,
  emptyRegions: React.PropTypes.array.isRequired,
  legislators: React.PropTypes.object,
  currentLegislators: React.PropTypes.array,
  fetchLegislators: React.PropTypes.func,
  fetchCurrentLegislators: React.PropTypes.func,
  searchTerm: React.PropTypes.string,
  activePage: React.PropTypes.number,
  total: React.PropTypes.number
}

const mapStateToProps = (state) => ({
  regionData: state.regionData,
  emptyRegions: state.emptyRegions,
  legislators: state.legislators,
  currentLegislators: state.currentLegislators,
  searchTerm: state.searchTerm,
  showReps: state.showReps,
  showCurrentLegs: state.showCurrentLegs,
  activePage: state.activePage,
  total: state.total
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentLegislators: bindActionCreators(fetchCurrentLegislators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Legislators)
