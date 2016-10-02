import React from 'react'
import { connect } from 'react-redux'
import Bill from './Bill'

class Browse extends React.Component {
  render () {
    const { results, searchTerm } = this.props
    return (
      <div className='container'>
        <div className='show-results'>
          {results[0]}
          {results.map((result, index) => {
            <div>
              <p>result[index]</p>
              <Bill key={result.bill_id} result={result} />
            </div>
          })}
          {searchTerm}
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
