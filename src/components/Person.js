/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'
import {Card, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const Person = (props) => (
  <Link to={`/person/${props.id}`}>
    <Card>
      <CardText>
        <p>{props.name}</p>
      </CardText>
    </Card>
  </Link>
)

Person.propTypes = {
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  enddate: React.PropTypes.string,
  party: React.PropTypes.string,
  id: React.PropTypes.number
}

export default Person
