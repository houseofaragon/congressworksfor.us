/*eslint-disable */
import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const VoteCard = (props) => (
  <div className='vote-list'>
    <Card className='vote-list-card'>
      <CardHeader
        title={props.congress}
        subtitle={props.chamber}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardActions>
        <FlatButton label="See all votes" href={`/bill/${props.bill_id}/votes/${props.roll_id}`} />
      </CardActions>
      <CardText expandable={true}>
        <p>{props.created}</p>
        <p>Vote #{props.number}</p>
      </CardText>
    </Card>
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
