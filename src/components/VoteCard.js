/*eslint-disable */
import React from 'react'
import FlatButton from 'material-ui/FlatButton'

const VoteCard = (props) => (
  <div className='vote-card'>
      <h4> # {props.number} - {props.result} </h4>
      <p> {props.question} </p>
      <FlatButton className="vote-button" label="view votes" href={`/bill/${props.bill_id}/votes/${props.roll_id}`} />
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
  number: React.PropTypes.number,
  params: React.PropTypes.object
}

export default VoteCard
