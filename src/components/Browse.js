import React from 'react'

class Browse extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='results'>
          Hey whats up how are you?!
        </div>
      </div>
    )
  }
}

Browse.propTypes = {
  results: React.PropTypes.arrayOf(React.PropTypes.object),
  searchTerm: React.PropTypes.string
}

export default Browse
