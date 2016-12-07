/*eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { SET_SEARCH_TERM, fetchCurrentLegislators, fetchLegislatorResults, fetchLegislators } from '../actions/index'
import TextField from 'material-ui/TextField'
import Representatives from './Representatives'
import LegislatorForm from './LegislatorForm'

class Legislators extends React.Component {
  constructor (props) {
    super(props)
    if(this.props.showCurrentLegs) this.props.fetchCurrentLegislators()
  }

  render () {
    const data = this.props.currentLegislators || {}
    const { legislators } = this.props || {}
    let currentLegislators = data.map((legislator, idx) => (
      <div className='legislator' key={idx} >
        <Link to={`/person/${legislator.person ? legislator.person.id : legislator.id}`}>
          <h2>{legislator.person ? legislator.person.firstname : legislator.sortname } {legislator.person ? legislator.person.lastname : '' }</h2>
          <div id='currentLegislators'>
            <h5>{legislator.description ? legislator.description : '' }</h5>
            {legislator.enddate ? <div><h5>Term Ends </h5><p>{legislator.enddate}</p></div> : <div /> }
            {legislator.party ? <div><h5>Party </h5><p>{legislator.party}</p></div> : <div /> }
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
          <h1>These are the people who work for you in </h1>
        </div>
        <div className='bill-details'>
          <div id='legislators'>
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
}

const mapStateToProps = (state) => ({
  regionData: state.regionData,
  emptyRegions: state.emptyRegions,
  legislators: state.legislators,
  currentLegislators: state.currentLegislators,
  searchTerm: state.searchTerm,
  showReps: state.showReps,
  showCurrentLegs: state.showCurrentLegs
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentLegislators: bindActionCreators(fetchCurrentLegislators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Legislators)
