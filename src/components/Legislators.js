import React from 'react'
import { connect } from 'react-redux'
import DataMap from './map/DataMap'
import { fetchOpenSeats } from '../actions/index'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

class Legislators extends React.Component {
  componentWillMount () {
    this.props.fetchOpenSeats('2017-01-03')
  }
  render () {
    const { openSeats } = this.props || {}
    const senators = openSeats.map((legislator, idx) => (
      <Link to={`/person/${legislator.govtrack_id}`} key={idx}>
        <Chip
          className='voter-block'
          backgroundColor='#C5E1A5'
        >
          <Avatar
            className='voter-block-avatar'
            color={legislator.party === 'R' ? '#f44336' : '#2196F3'}>
            {legislator.state}
          </Avatar>
          {legislator.first_name} {legislator.last_name}
        </Chip>
      </Link>
    ))
    return (
      <div className='legislators-container'>

        <h1>Congress is made up of 100 Senators and 435 House of Representatives</h1>
        <DataMap regionData={this.props.regionData} />
        <div className="vote-container">
          {senators}
        </div>
      </div>
    )
  }
}

Legislators.propTypes = {
  regionData: React.PropTypes.array.isRequired,
  emptyRegions: React.PropTypes.array.isRequired,
  openSeats: React.PropTypes.array,
  fetchOpenSeats: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    regionData: state.regionData,
    emptyRegions: state.emptyRegions,
    openSeats: state.openSeats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOpenSeats: bindActionCreators(fetchOpenSeats, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Legislators)
