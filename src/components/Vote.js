/*eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { fetchVote } from '../actions/index'
import { bindActionCreators } from 'redux'
import { Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'

class Vote extends React.Component {
  constructor(props) {
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
      height: '100%'
    }
  }
  componentWillMount () {
    this.props.fetchVote(this.props.params.number)
  }
  render () {
    const { question, required, chamber_label, result } = this.props.votes[0].vote
    return (
      <div>
        <h1>{question}</h1>
        <p>{chamber_label} - Requires {required} vote</p>
        <p>{result}</p>
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
                Voting History
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="">Vote</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">state</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">party</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.votes.map((vote, idx) => (
              <TableRow key={idx}>
                <TableRowColumn>{vote.option.value} </TableRowColumn>
                <TableRowColumn>{vote.person_role.state}</TableRowColumn>
                <TableRowColumn>{vote.person_role.party}</TableRowColumn>
                <TableRowColumn>{vote.person.name}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

Vote.propTypes = {
  params: React.PropTypes.object,
  id: React.PropTypes.number,
  option: React.PropTypes.object,
  person: React.PropTypes.object,
  value: React.PropTypes.string,
  name: React.PropTypes.string,
  votes: React.PropTypes.arrayOf(React.PropTypes.object),
  fetchVote: React.PropTypes.func,
  chamber_label: React.PropTypes.string,
  question: React.PropTypes.string,
  number: React.PropTypes.number,
  vote: React.PropTypes.object,
  title: React.PropTypes.string,
  chamber: React.PropTypes.string,
  congress: React.PropTypes.number,
  created: React.PropTypes.string,
  total_plus: React.PropTypes.number,
  total_minus: React.PropTypes.number
}

const mapStateToProps = (state) => ({
  votes: state.votes
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVote: bindActionCreators(fetchVote, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
