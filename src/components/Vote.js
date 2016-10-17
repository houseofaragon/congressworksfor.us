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
    const votes = this.props.votes || {}
    const bill = votes[0] || {}
    const voters = votes[1] || {}
    const breakdown = votes[2] || {}

    let voteList
    if (voters){
      voteList = Object.keys(voters).map((v, idx) => (
        <div key={v}>
          <p>{voters[v].vote}</p>
          <p>{voters[v].voter.first_name} {voters[v].voter.last_name} </p>

        </div>
      ))
    }

    return (
      <div>
        <h1>{bill.question}</h1>
        <p>{bill.bill_id} {bill.chamber} {bill.congress}</p>
        <p>{bill.required} {bill.result}</p>
        {voteList}
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
  votes: React.PropTypes.array,
  fetchVote: React.PropTypes.func,
  chamber_label: React.PropTypes.string,
  question: React.PropTypes.string,
  number: React.PropTypes.number,
  vote: React.PropTypes.object,
  title: React.PropTypes.string,
  chamber: React.PropTypes.string,
  congress: React.PropTypes.number,
  created: React.PropTypes.string,
  total: React.PropTypes.object,
  Yea: React.PropTypes.string,
  Nay: React.PropTypes.string,
  voters: React.PropTypes.array,
  voter: React.PropTypes.object,
  vote: React.PropTypes.string,
  first_name: React.PropTypes.string

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
