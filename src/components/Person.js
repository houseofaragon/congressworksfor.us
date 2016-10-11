import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const Person = (props) => (
  <Card>
    <CardHeader
      title={props.name}
      subtitle={props.description}
    />
    <CardText>
      <p>{props.description}</p>
      <p>{props.enddate}</p>
      <p>{props.party}</p>
    </CardText>
    <CardActions>
      <FlatButton label="View Profile" href={`/person/${props.id}`} />
    </CardActions>
  </Card>
)

Person.propTypes = {
  name: React.PropTypes.string,
  id: React.PropTypes.number.isRequired,
  description: React.PropTypes.string,
  enddate: React.PropTypes.string,
  party: React.PropTypes.string
}

export default Person
