import React from 'react'
import { browserHistory } from 'react-router'
import { Table, TableBody, TableRowColumn, TableRow } from 'material-ui/Table'

class Browse extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      showRowHover: true,
      width: '50%'
    }
  }

  render () {
    const handleBillRowClick = (key) => {
      console.log('hello')
      const billId = this.props.bills[key].id
      browserHistory.push(`/bill/${billId}`)
    }

    const { bills } = this.props
    let billResults
    if (bills) {
      billResults = bills.map((item, idx) => (
        <TableRow key={idx} ref={item.bill_id}>
          <TableRowColumn style={{ width: '100%' }}>{item.title}</TableRowColumn>
        </TableRow>
      ))
    } else {
      billResults = <p> No bill results. </p>
    }

    return (
      <div>
        <Table
          className="bill-table"
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          onRowSelection={handleBillRowClick}
        >
          <TableBody
            selectable={this.state.selectable}
            className="table-body"
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {billResults}
          </TableBody>
        </Table>
      </div>
    )
  }
}

Browse.propTypes = {
  searchTerm: React.PropTypes.string,
  bills: React.PropTypes.array,
  billId: React.PropTypes.string
}

export default Browse
