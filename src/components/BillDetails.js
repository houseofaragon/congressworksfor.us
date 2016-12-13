/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { fetchBill } from '../actions/index'
import FlatButton from 'material-ui/FlatButton'
import VoteCard from './VoteCard'
import Person from './Person'
import BillSearchForm from './BillSearchForm'
import Browse from './Browse'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import { fetchBill } from '../actions/index'

class BillDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
  }
  componentWillMount() {
    this.props.fetchBill(this.props.params.id)
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }
  render () {
    const { votes } = this.props || {}
    const { id, title } = this.props.params || {}
    const { bill } = this.props || {}
    const sponsor = bill.sponsor
    const { bills } = this.props || {}
    const { major_actions} = this.props || {}
    let voteLinks
    if (this.props.votes) {
      console.log('votes', votes)
      if (votes.length) {
        voteLinks = votes.map((vote, idx) => (
          <VoteCard title={this.props.title} key={idx} number={vote.number} bill_id={id} {...vote} />
        ))
      } else {
        voteLinks = <p> No Votes on file for this bill </p>
      }
    }
    let billActions
    if (major_actions) {
      billActions = major_actions.map((action, idx) => (
        <div key={idx}>
          <h5>{action[0]}</h5>
          <p>{action[2]}</p>
        </div>
      ))
    }
    return (
      <div className="container">
        <BillSearchForm />
        {this.props.bills.length ? <Drawer
          open={this.state.open}
          openSecondary={true}
          onRequestChange={(open) => this.setState({open})}
          width={725}
          docked={false}
          className="bill-drawer" >
          <Browse bills={this.props.person[2].length ? this.props.person[2] : bills } title={this.props.person[2].length ? this.props.person[0].name : '' } searchTerm={this.props.searchTerm} />
        </Drawer> : '' }
        <div className="bill-title">
          {this.props.bills.length ? <RaisedButton
            className='bill-drawer-button'
            label="Continue Browsing Bills"
            onTouchTap={this.handleToggle.bind(this)} /> : '' }
          <h5>{bill.chamber} - {bill.bill_id}</h5>
          <h1 className="title">{bill.title}</h1>
          <h5> Current Status</h5>
          <p className="summary">{bill.current_status_label}</p>
          <h5> summary</h5>
          <p className="summary">{bill.current_status_description}</p>
          <h5> sponsor </h5>
          <Person {...sponsor} />
        </div>
        <div className="bill-details">
            <h5 style={{marginTop: '40px'}}> date introduced </h5>
            <p className="summary">{bill.introduced_date}</p>
            <hr />
            <h5> votes </h5>
            {voteLinks}
            <hr />
            <h5> actions </h5>
            {billActions}
        </div>
      </div>
    )
  }
}

BillDetails.propTypes = {
  params: React.PropTypes.object,
  bill: React.PropTypes.object,
  fetchBill: React.PropTypes.func,
  short_title: React.PropTypes.string,
  id: React.PropTypes.number,
  related_bills: React.PropTypes.array,
  searchTerm: React.PropTypes.string,
  votes: React.PropTypes.array,
  bills: React.PropTypes.array,
  searchTerm: React.PropTypes.string,
  major_actions: React.PropTypes.array
}

const mapStateToProps = (state) => ({
  bill: state.bill,
  votes: state.votes,
  bills: state.bills,
  searchTerm: state.searchTerm,
  person: state.person,
  major_actions: state.major_actions
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBill: bindActionCreators(fetchBill, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)
