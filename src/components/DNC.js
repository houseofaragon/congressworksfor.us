import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchDNC } from '../actions/index'
import DNCMainMessage from './DNCMainMessage'
import DNCFaq from './DNCFaq'
import DNCCandidates from './DNCCandidates'
import DNCDelegates from './DNCDelegates'

class DNC extends React.Component {
  componentWillMount () {
    this.props.fetchDNC('ALL')
  }
  render () {
    const { delegates } = this.props || {}
    let delegateList
    if (delegates) {
      delegateList = Object.keys(delegates).map((state, idx) => (
        <div className='delegate' key={idx}>
          <h3>{state}</h3>
          <div id='delegate-list'>
            {delegates[state].map((item, idx) => (
              <div key={idx}>
                <h4>{item.delegate}</h4>
                <h6>{item.phone}</h6>
              </div>
            ))}
          </div>
        </div>
      ))
    } else {
      delegateList = <h5>No Delegates</h5>
    }
    return (
      <div className='DNC'>
        <DNCMainMessage />
        <div id='dnc-wrapper'>
          <DNCFaq />
          <DNCCandidates />
          <DNCDelegates delegateList={delegateList} />
        </div>
      </div>
    )
  }
}

DNC.propTypes = {
  delegates: React.PropTypes.object,
  fetchDNC: React.PropTypes.func
}

const mapStateToProps = (state) => ({
  delegates: state.delegates
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDNC: bindActionCreators(fetchDNC, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DNC)
