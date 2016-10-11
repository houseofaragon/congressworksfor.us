import React from 'react'
import { Link } from 'react-router'
import {Card, CardHeader, CardText} from 'material-ui/Card'

const Bill = (props) => (
  <Link to={`/bill/${props.id}`}>
    <Card>
      <CardHeader
        title={props.short_title}
      />
      <CardText>
        {props.official_title}
      </CardText>
    </Card>
  </Link>
)

Bill.propTypes = {
  short_title: React.PropTypes.string,
  official_title: React.PropTypes.string,
  id: React.PropTypes.number.isRequired
}

export default Bill
