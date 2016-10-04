import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchVotes } from '../actions/index'
import { bindActionCreators } from 'redux'

class Votes extends React.Component {
  componentDidMount () {
    this.props.fetchVotes(this.props.params.id)
  }
  render () {
    const { votes } = this.props || {}
    return (
      <div className='container'>
        {votes.map((vote, idx) => (
          <div>
            <h1> {vote.chamber_label} - {vote.question} </h1>
            <Link to={`/bill/${this.props.params.id}/votes/${vote.id}`}>see votes</Link>
          </div>
        ))}
        <pre><code>{JSON.stringify(votes, null, 4)}</code></pre>
      </div>
    )
  }
}

Votes.propTypes = {
  params: React.PropTypes.object,
  fetchVotes: React.PropTypes.func,
  votes: React.PropTypes.array,
  number: React.PropTypes.number,
  question: React.PropTypes.string
}

const mapStateToProps = (state) => ({
  votes: state.votes
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVotes: bindActionCreators(fetchVotes, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Votes)
