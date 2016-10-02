import React from 'react'
import { Link } from 'react-router'
const Bill = (props) => (
  <Link to='/'>
    <div className='show-card'>
      <div className='show-card-text'>
        <h3 style={{color: '#000'}} className='show-card-title'>
          <h1> {props.result}</h1>
            {props.result.map(item => {
              <li>{item}</li>
            })}
        </h3>
      </div>
    </div>
  </Link>
)

Bill.propTypes = {
  result: React.PropTypes.object
}

export default Bill
