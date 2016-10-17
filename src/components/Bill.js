import React from 'react'
import { Link } from 'react-router'
import { TableRow, TableRowColumn } from 'material-ui/Table'

const Bill = (props) => (
  <TableRow key={props.key}>
    <TableRowColumn>{props.chamber}</TableRowColumn>
    <Link to={`/bill/${props.id}`}>
      <TableRowColumn>{props.short_title ? props.short_title : props.official_title}</TableRowColumn>
    </Link>
    <TableRowColumn>{props.introduced_on}</TableRowColumn>
  </TableRow>
)

Bill.propTypes = {
  short_title: React.PropTypes.string,
  official_title: React.PropTypes.string,
  id: React.PropTypes.number.isRequired,
  chamber: React.PropTypes.string,
  introduced_on: React.PropTypes.string,
  key: React.PropTypes.number.isRequired
}

export default Bill
