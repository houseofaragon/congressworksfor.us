/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBill } from '../actions/index'
import {Card, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card'
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
    let voteLinks
    if (billVotes) {
      voteLinks = billVotes.map((vote, idx) => (
        <VoteCard key={idx} number={vote.number} bill_id={id} {...vote} />
      ))
    }
    const bill = this.props.bill[0] || {}
    const { sponsor } = bill || {}
    const billExtraData = this.props.bill[2] || {}
    const { summary, actions } = billExtraData
    let billActions
    if (actions) {
      billActions = actions.map((action) => (
        <div>
          <p>{action.acted_at}</p>
          <p>{action.text}</p>
          <p>{action.type}</p>
        </div>
      ))
    }
    return (
      <div>
        <Card>
          <CardTitle title={bill.short_title ? bill.short_title : bill.official_title}  />
          <CardText>
            <p>{bill.bill_id}</p>
            <p>{bill.chamber}</p>
            <p>Introduced: {bill.introduced_on}</p>
            <p>{summary}</p>
            <Person {...sponsor} />
            <CardActions>
              {voteLinks}
            </CardActions>
          </CardText>
        </Card>
        <Card>
          <CardTitle title="" />
          <CardText>
            {billActions}
          </CardText>
        </Card>
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
}

const mapStateToProps = (state) => ({
  bill: state.bill
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBill: bindActionCreators(fetchBill, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)
