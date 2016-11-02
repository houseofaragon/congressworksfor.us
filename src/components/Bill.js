import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'

const Bill = (props) => (
  <TableRow>
    <TableRowColumn style={{ width: '10%' }}>{props.chamber}</TableRowColumn>
    <TableRowColumn style={{ width: '15%' }}>{props.id}</TableRowColumn>
    <TableRowColumn style={{ width: '60%' }}>{props.short_title ? props.short_title : props.official_title}</TableRowColumn>
    <TableRowColumn style={{ width: '15%' }}>{props.introduced_on}</TableRowColumn>
  </TableRow>
)

Bill.propTypes = {
  short_title: React.PropTypes.string,
  official_title: React.PropTypes.string,
  id: React.PropTypes.string,
  chamber: React.PropTypes.string,
  introduced_on: React.PropTypes.string
}

export default Bill
