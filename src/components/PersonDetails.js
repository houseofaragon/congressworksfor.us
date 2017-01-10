/*eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { fetchPerson } from '../actions/index'
import { Table, TableBody, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import LegislatorForm from './LegislatorForm'
import Browse from './Browse'

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
      const role = roles[roles.length - 1]
      console.log(role)
      roleList = (
        <div key={role.id}>
          <h5> Party </h5>
          <p className='summary'>{role.party}</p>
          <h5> Current Role </h5>
          <p className='summary'>{role.description}</p>
          {role.extra ? (
            <div>
              <h5> Address </h5>
              <p className='summary'>{role.extra.address}</p>
            </div>
            ) : null }
          <h5> Term Ends </h5>
          <p className='summary'>{role.enddate}</p>
          <div className='social'>
            {role.phone ? <a target="_blank" href={`tel:+${role.phone}`}><div className='show-social' id='call'><i className="fa fa-phone" aria-hidden="true" /></div></a> : <div className='disable-social' id='call'><i className="fa fa-phone" aria-hidden="true" /></div> }
            {role.extra ? <a target="_blank" href={role.website}><div className='show-social' id='website'><i className="fa fa-globe" aria-hidden="true" /></div></a> : <div className='disable-social' id='call'><i className="fa fa-globe" aria-hidden="true" /></div> }
            {role.extra ? <a target="_blank" href={role.extra.contact_form}><div className='show-social' id='email'><i className="fa fa-envelope-o" aria-hidden="true" /></div></a> : <div className='disable-social' id='email'><i className="fa fa-envelope-o" aria-hidden="true" /></div> }
            {person.twitterid ? <a target="_blank" href={`https://twitter.com/${person.twitterid}`}><div className='show-social' id='twitter'><i className="fa fa-twitter" aria-hidden="true" /></div></a> : <div className='disable-social' id='twitter'><i className="fa fa-twitter" aria-hidden="true" /></div> }
          </div>
        </div>
      )
    }

    return (
      <div className="container">
        <LegislatorForm />
        <div className="bill-title">
            <h1>{person.name}</h1>
            <br/>
            {roleList}
        </div>

        <div className="bill-details" id='legislator'>
          <h4 style={{marginTop: '40px'}}>Sponsored {personSponsorHistory.length}+ Bills</h4>
          <Browse bills={personSponsorHistory} />
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
