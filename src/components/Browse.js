import React from 'react'
import { connect } from 'react-redux'
import Bill from './Bill'
import Person from './Person'

class Browse extends React.Component {
  render () {
    const { results } = this.props
    return (
      <div className='container'>
        <div className='show-results'>
          <h1>Bills</h1>
          {results[0].map((item, idx) => <Bill key={idx} { ...item} />)}
          <h1>Legislators</h1>
          {results[1].map((item, idx) => <Person key={idx} { ...item} />)}
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
