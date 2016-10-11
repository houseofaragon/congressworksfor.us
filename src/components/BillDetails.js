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
        <VoteCard key={vote.id} number={vote.number} bill_id={id} {...vote} />
      ))
    }
    const bill = this.props.bill[0] || {}
    const { sponsor } = bill || {}
    return (
      <div>
        <Card>
          <CardTitle title={title} />
          <CardText>
            {title}
            {bill.summary}
            <Person {...sponsor} />
            <CardActions>
              {voteLinks}
            </CardActions>
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
  title: React.PropTypes.string
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
