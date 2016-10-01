import React from 'react'
import './app.css'

class Landing extends React.Component {
  render () {
    return (
      <div className="index">
        <div className="notice">
          <h1>Donald</h1>
        </div>
        <div className="notice">
          <h1>Hillary</h1>
        </div>
      </div>
    )
  }
}

Landing.defaultProps = {
}

export default Landing
