import React from 'react'
import { bindActionCreators } from 'redux'
import { fetchOpenSeats } from '../actions/index'
import { connect } from 'react-redux'

class Landing extends React.Component {
  componentWillMount () {
    this.props.fetchOpenSeats('2017-01-03')
  }
  render () {
    return (
      <div>
        <pre><code>{JSON.stringify(this.props.openSeats, null, 4)}</code></pre>
      </div>
    )
  }
}

Landing.propTypes = {
  openSeats: React.PropTypes.array,
  fetchOpenSeats: React.PropTypes.func
}

const mapStateToProps = (state) => ({
  openSeats: state.openSeats
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOpenSeats: bindActionCreators(fetchOpenSeats, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
