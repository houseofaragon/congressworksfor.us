/*eslint-disable */
import React from 'react'

const VoteCard = (props) => (
  <div className='vote-card'>
    <a className="vote-button" href={`/bill/${props.bill_id}/votes/${props.id}`}>view votes</a>
    <p>#{props.number} - {props.result} in the {props.chamber_label}</p><br />
  </div>
)

VoteCard.propTypes = {
  title: React.PropTypes.string,
  person: React.PropTypes.object,
  name: React.PropTypes.string,
  option: React.PropTypes.object,
  value: React.PropTypes.string,
  chamber_label: React.PropTypes.string,
  category_label: React.PropTypes.string,
  created: React.PropTypes.string,
  params: React.PropTypes.object
}

export default VoteCard
