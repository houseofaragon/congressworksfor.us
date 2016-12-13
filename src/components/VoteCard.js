/*eslint-disable */
import React from 'react'

const VoteCard = (props) => (
  <div className='vote-card'>
    <p><span># {props.number}</span> - {props.question_details} <br /> {props.result} in the {props.chamber_label}</p>
    <a className="vote-button" href={`/bill/${props.bill_id}/votes/${props.id}`}>view votes</a><br />
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
