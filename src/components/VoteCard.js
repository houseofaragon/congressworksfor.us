import React from 'react'

const VoteCard = (props) => (
  <div className='show-card'>
    <div className='show-card-text'>
      <h3 style={{color: '#000'}} className='show-card-title'>
        {props.option.value} - {props.person.name}
      </h3>
    </div>
  </div>
)

VoteCard.propTypes = {
  title: React.PropTypes.string,
  person: React.PropTypes.object,
  name: React.PropTypes.string,
  option: React.PropTypes.object,
  value: React.PropTypes.string
}

export default VoteCard
