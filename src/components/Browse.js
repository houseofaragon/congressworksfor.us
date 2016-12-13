import React from 'react'
import { Table, TableBody, TableRowColumn, TableRow } from 'material-ui/Table'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBill } from '../actions/index'

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
    this.handleBillRowClick = this.handleBillRowClick.bind(this)
  }

  handleBillRowClick (key) {
    const billId = this.props.bills[key].id
    this.props.fetchBill(billId)
  }

  render () {
    const { bills } = this.props
    let billResults
    if (bills) {
      billResults = bills.map((item, idx) => (
        <TableRow key={item.id} ref={item.bill_id}>
          <TableRowColumn key={item.id} style={{width: '100%'}}>{item.title}</TableRowColumn>
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
          onRowSelection={this.handleBillRowClick}
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
  billId: React.PropTypes.string,
  fetchBill: React.PropTypes.func,
  pageChange: React.PropTypes.func,
  title: React.PropTypes.string
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBill: bindActionCreators(fetchBill, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Browse)
