import React from 'react'
import { connect } from 'react-redux'
import { fetchVote } from '../actions/index'
import { bindActionCreators } from 'redux'
import VoteCard from './VoteCard'

class Vote extends React.Component {
  componentDidMount () {
    console.log('PARAMS', this.props.params)
    this.props.fetchVote(this.props.params.number)
  }

  render () {
    return (
      <div className='show-card'>
        <div className='show-card-text'>
          {this.props.votes.map((vote) => <VoteCard key={vote.id} {...vote} />)}
        </div>
      </div>
    )
  }
}

Vote.propTypes = {
  params: React.PropTypes.object,
  id: React.PropTypes.number,
  option: React.PropTypes.object,
  person: React.PropTypes.object,
  value: React.PropTypes.string,
  name: React.PropTypes.string,
  votes: React.PropTypes.array,
  fetchVote: React.PropTypes.func,
  chamber_label: React.PropTypes.string,
  question: React.PropTypes.string,
  number: React.PropTypes.number
}

const mapStateToProps = (state) => ({
  votes: state.votes
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVote: bindActionCreators(fetchVote, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
