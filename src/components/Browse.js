import React from 'react'
import { connect } from 'react-redux'
import Bill from './Bill'
import Person from './Person'
import { Table, TableBody, TableRow, TableHeader, TableHeaderColumn } from 'material-ui/Table'

class Browse extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
      width: '50%'
    }
  }
  handleToggle (event, toggled) {
    this.setState({
      [event.target.name]: toggled
    })
  }

  handleChange (event) {
    this.setState({height: event.target.value})
  }

  render () {
    const { results } = this.props
    let billResults, legislatorResults
    if (results[0] && results[1]) {
      billResults = results[0].map((item, idx) => (
        <TableRow key={idx}>
          <Bill searchTerm={this.props.searchTerm} key={idx} title={item.official_title} id={item.bill_id} { ...item} />
        </TableRow>
      ))
      legislatorResults = results[1].map((item, idx) => (
        <TableRow key={idx}>
          <Person searchTerm={this.props.searchTerm} key={idx} id={item.id} { ...item} />
        </TableRow>
      ))
    } else if (!results) {
      billResults = <p>No Bill results</p>
      legislatorResults = <p>No Legislators</p>
    }
    return (
      <div className='container'>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center'}}>
                Bills
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="congress">Congress</TableHeaderColumn>
              <TableHeaderColumn tooltip="Sponsor">Bill</TableHeaderColumn>
              <TableHeaderColumn tooltip="Result">Date Introduced</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {billResults}
          </TableBody>
        </Table>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader >
            <TableRow>
              <TableHeaderColumn>Legislators</TableHeaderColumn>
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
  results: React.PropTypes.array
}

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  results: state.results
})

export default connect(mapStateToProps)(Browse)
