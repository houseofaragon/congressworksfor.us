import React from 'react'
import { Link } from 'react-router'

const Bill = (props) => (
  <Link to={`/bill/${props.id}`}>
    <div className='show-card'>
      <div className='show-card-text'>
        <h3 style={{color: '#000'}} className='show-card-title'>
          {props.title_without_number}
        </h3>
      </div>
    </div>
  </Link>
)

Bill.propTypes = {
  title: React.PropTypes.string,
  title_without_number: React.PropTypes.string,
  id: React.PropTypes.number.isRequired
}

export default Bill
