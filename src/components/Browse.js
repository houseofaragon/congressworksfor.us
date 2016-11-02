import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Table, TableBody, TableRowColumn, TableRow, TableHeader, TableHeaderColumn } from 'material-ui/Table'

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
      const billId = this.props.results[0][key].bill_id
      browserHistory.push(`/bill/${billId}`)
    }

    const handleLegislatorRowClick = (key) => {
      console.log('clicked', key)
      const legislatorId = this.props.results[1][key].id
      console.log(legislatorId)
      browserHistory.push(`/person/${legislatorId}`)
    }

    const { results } = this.props
    let billResults, legislatorResults
    if (results[0] && results[1]) {
      if (results[0].length) {
        billResults = results[0].map((item, idx) => (
          <TableRow key={idx} ref={item.bill_id}>
            <TableRowColumn style={{ width: '10%' }}><h5>{item.chamber}</h5></TableRowColumn>
            <TableRowColumn style={{ width: '10%' }}><h5>{item.bill_id}</h5></TableRowColumn>
            <TableRowColumn style={{ width: '50%' }}><p>{item.short_title ? item.short_title : item.official_title}</p></TableRowColumn>
            <TableRowColumn style={{ width: '10%' }}><h5>{item.introduced_on}</h5></TableRowColumn>
          </TableRow>
        ))
      } else {
        billResults = <p> No bill results. </p>
      }
      if (results[1].length) {
        legislatorResults = results[1].map((item, idx) => (
          <TableRow key={idx} ref={item.bioguideid}>
            <TableRowColumn><p>{item.name}</p></TableRowColumn>
          </TableRow>
        ))
      } else {
        legislatorResults = <p> No legislator results. </p>
      }
    } else if (!results) {
      billResults = <p>No Bill results</p>
      legislatorResults = <p>No Legislators</p>
    }
    return (
      <div className='container'>
        <Table
          className="bill-table"
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          onRowSelection={handleBillRowClick}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center'}}>
                Bills
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn style={{ width: '10%' }} tooltip="Either House (of Representatives) or Senate">Congress</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '15%' }} tooltip="Id used to identify Bill">Bill ID</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '60%' }} tooltip="Title given to bill">Bill Name</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '16%' }} tooltip="Date bill was introduced">Date</TableHeaderColumn>
            </TableRow>
          </TableHeader>
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
        <Table
          className="people-table"
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={handleLegislatorRowClick}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center', marginTop: '60px'}}>
                Legislators
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {legislatorResults}
          </TableBody>
        </Table>
      </div>
    )
  }
}

Browse.propTypes = {
  searchTerm: React.PropTypes.string,
  results: React.PropTypes.array,
  billId: React.PropTypes.string
}

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  results: state.results
})

export default connect(mapStateToProps)(Browse)
