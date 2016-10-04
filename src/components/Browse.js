import React from 'react'
import { connect } from 'react-redux'
import Bill from './Bill'

class Browse extends React.Component {
  render () {
    const { results } = this.props
    return (
      <div className='container'>
        <div className='show-results'>
          {results.map((item, idx) => <Bill key={idx} { ...item} />)}
        </div>
      </div>
    )
  }
}

Browse.propTypes = {
  searchTerm: React.PropTypes.string,
  results: React.PropTypes.array
}

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  results: state.results
})

export default connect(mapStateToProps)(Browse)
