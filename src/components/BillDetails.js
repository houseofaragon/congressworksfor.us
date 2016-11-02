/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBill } from '../actions/index'
import FlatButton from 'material-ui/FlatButton'
import VoteCard from './VoteCard'
import Person from './Person'

class BillDetails extends React.Component {
  componentWillMount () {
    this.props.fetchBill(this.props.params.id)
  }
  render () {
    const billVotes = this.props.bill[1]
    const { id, title } = this.props.params
    const sponsor_id = this.props.sponsor_id
    let voteLinks
    if (billVotes) {
      if (billVotes.length) {
        voteLinks = billVotes.map((vote, idx) => (
          <VoteCard title={this.props.title} key={idx} number={vote.number} bill_id={id} {...vote} />
        ))
      } else {
        voteLinks = <p> No Votes on file for this bill </p>
      }
    }
    const bill = this.props.bill[0] || {}
    const sponsor = this.props.sponsor || {}
    const billExtraData = this.props.bill[2] || {}
    const { summary, actions } = billExtraData
    let billActions
    if (actions) {
      billActions = actions.map((action, idx) => (
        <div key={idx}>
          <h4>{action.acted_at} - {action.type}</h4>
          <p>{action.text}</p>
        </div>
      ))
    }
    return (
      <div className="container">
        <div className="bill-title">
          <h5>{bill.chamber} - {bill.bill_id}</h5>
          <h1 className="title">{bill.short_title ? bill.short_title : bill.official_title}</h1>
          <h5> summary</h5>
          <p className="summary">{summary}</p>
          <h5> sponsor </h5>
          <Person sponsor={sponsor} sponsor_id={sponsor_id} />
        </div>
        <div className="bill-details">
            <h5 style={{marginTop: '40px'}}> date introduced </h5>
            <p className="summary">{bill.introduced_on}</p>
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
  sponsor: React.PropTypes.object,
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  actions: React.PropTypes.string,
  sponsor_id: React.PropTypes.string
}

const mapStateToProps = (state) => ({
  bill: state.bill,
  sponsor: state.sponsor,
  sponsor_id: state.sponsor_id
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBill: bindActionCreators(fetchBill, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)
