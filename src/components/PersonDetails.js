/*eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPerson } from '../actions/index'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
class PersonDetails extends React.Component {
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
      height: '300px',
    }
  }

  componentWillMount () {
    this.props.fetchPerson(this.props.params.id)
  }

  render () {
    const person = this.props.person[0] || {}
    const personVoteHistory = this.props.person[1] || {}
    const personSponsorHistory = this.props.person[2] || {}

    const { name, roles } = person
    let roleList
    if(roles){
      roleList = roles.map((role, idx) => (
        <div key={idx}>
          <p>{role.startdate} - {role.enddate}</p>
          <p>{role.party} {role.description}</p>
          {role.extra ? (
            <div>
              <p>{role.extra.address}</p>
              <p>{role.extra.rss_url}</p>
            </div>
            ) : null }
        </div>
      ))
    }
    return (
      <div>
        <Card>
          <CardTitle title={person.name} subtitle={person.description} />
          <CardText>
            <h5>Born</h5>
            <p>{person.birthday}</p>
            <p>{person.twitterid}</p>
            <p>{person.youtubeid}</p>
            {roleList}
          </CardText>
          <CardActions>
            <FlatButton label="Twitter" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
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
                  {person.name}'s Voting History
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip={`How ${person.name} voted`}>Vote</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Name">Bill Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Status">Date</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Status">Result</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {personVoteHistory.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableRowColumn>{row.option.value}</TableRowColumn>
                      <Link to={`/bill/${row.vote.related_bill}`}>
                        <TableRowColumn>{row.vote.question}</TableRowColumn>
                      </Link>
                    <TableRowColumn>{row.created}</TableRowColumn>
                    <TableRowColumn>{row.vote.result}</TableRowColumn>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
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
                  {person.name}'s Voting History
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="The Name">Bill Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Status">Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {personSponsorHistory.map((row, idx) => (
                  <TableRow key={idx}>
                      <Link to={`/bill/${row.id}`}>
                        <TableRowColumn>{row.title}</TableRowColumn>
                      </Link>
                    <TableRowColumn>{row.introduced_date}</TableRowColumn>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
    )
  }
}

PersonDetails.propTypes = {
  params: React.PropTypes.object,
  person: React.PropTypes.array,
  fetchPerson: React.PropTypes.func,
  name: React.PropTypes.string,
  id: React.PropTypes.number,
  roles: React.PropTypes.arrayOf(React.PropTypes.object),
  currentRoleInfo: React.PropTypes.object,
  extra: React.PropTypes.object,
  address: React.PropTypes.string
}

const mapStateToProps = (state) => ({
  person: state.person
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPerson: bindActionCreators(fetchPerson, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails)
