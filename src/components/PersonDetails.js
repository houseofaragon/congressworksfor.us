/*eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { fetchPerson } from '../actions/index'
import { Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import LegislatorForm from './LegislatorForm'

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
      height: '100vh',
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
        <div key={idx} className='person-roles'>
          <p>{role.party} {role.description}</p>
          {role.extra ? (
            <div>
              <p>{role.extra.address}</p>
              <p>{role.extra.rss_url}</p>
            </div>
            ) : null }
                    <p>{role.startdate} - {role.enddate}</p>

        </div>
      ))
    }
    const handleRowClick = (key) => {
      browserHistory.push(`/bill/${personSponsorHistory[key].id}`)
    }

    return (
      <div className="container">
        <LegislatorForm />
        <div className="bill-title">
            <h1>{person.name}</h1>
            <a href={`https://twitter.com/${person.twitterid}`}>Twitter</a>

            <br/>
            <h5>Born</h5>
            <p className='summary'>{person.birthday}</p>
            <h5> roles </h5>
            {roleList}
        </div>

        <div className="bill-details">
          <h4 style={{marginTop: '40px'}}>Sponsored {personSponsorHistory.length} Bills</h4>
          <Table
            style={{width: '100%', background: 'transparent'}}
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            onRowSelection={handleRowClick}
            >
              <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
              >
                <TableRow>
                  <TableHeaderColumn style={{width: '80%'}} tooltip="The Name"><h5>Bill Name</h5></TableHeaderColumn>
                  <TableHeaderColumn style={{width: '20%'}} tooltip="The Status"><h5>Date</h5></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                style={{width: '100% !important'}}
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
              >
                {personSponsorHistory.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableRowColumn style={{width: '80%'}}><h5>{row.title}</h5></TableRowColumn>
                      <TableRowColumn style={{width: '20%'}}><h5>{row.introduced_date}</h5></TableRowColumn>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
