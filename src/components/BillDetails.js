/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBill } from '../actions/index'
import FlatButton from 'material-ui/FlatButton'
import VoteCard from './VoteCard'
import Person from './Person'
import BillSearchForm from './BillSearchForm'
import Browse from './Browse'

class BillDetails extends React.Component {
  componentWillMount () {
    this.props.fetchBill(this.props.params.id)
  }
  render () {
    const { votes } = this.props || {}
    const { id, title } = this.props.params || {}
    const { bill } = this.props || {}
    const sponsor = bill.sponsor
    const { bills } = this.props || {}
    let voteLinks
    if (votes) {
      if (votes.length) {
        voteLinks = votes.map((vote, idx) => (
          <VoteCard title={this.props.title} key={idx} number={vote.number} bill_id={id} {...vote} />
        ))
      } else {
        voteLinks = <p> No Votes on file for this bill </p>
      }
    }
    const billExtraData = this.props.bill[2] || {}
    const { summary, actions } = billExtraData

    let billActions
    if (actions) {
      billActions = bill.major_actions.map((action, idx) => (
        <div key={idx}>
          <p>{action}</p>
        </div>
      ))
    }
    return (
      <div className="container">
        <BillSearchForm />
        <div className="bill-title">
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
            <Browse bills={bills} />
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
  bill: React.PropTypes.array,
  fetchBill: React.PropTypes.func,
  short_title: React.PropTypes.string,
  id: React.PropTypes.number,
  related_bills: React.PropTypes.array,
  searchTerm: React.PropTypes.string,
  votes: React.PropTypes.array,
  bills: React.PropTypes.array
}

const mapStateToProps = (state) => ({
  bill: state.bill,
  votes: state.votes,
  bills: state.bills
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBill: bindActionCreators(fetchBill, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)
