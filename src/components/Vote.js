/*eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchVote, getFilteredVotes } from '../actions/index'
import { bindActionCreators } from 'redux'
import { Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Divider from 'material-ui/Divider'
import * as ReactD3 from 'react-d3-components'
import BarChart from './d3/BarChart.js'
import VoteFilterBox from './VoteFilterBox'
import PieChart from './d3/PieChart.js'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

class Vote extends React.Component {
  constructor (props) {
    super(props)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleDemChange = this.handleDemChange.bind(this)
    this.handleRepChange = this.handleRepChange.bind(this)
    this.handleYesVoteChange = this.handleYesVoteChange.bind(this)
    this.handleNotVotingChange = this.handleNotVotingChange.bind(this)
    this.handleNoVoteChange = this.handleNoVoteChange.bind(this)
    this.state = {open: false}
  }

  componentWillMount () {
    this.props.fetchVote(this.props.params.number)
  }

  handleDemChange () {
    this.props.getFilteredVotes({selectedDem: !this.props.selectedDem}, !this.props.selectedDem, this.props.selectedRep, this.props.selectedYesVote, this.props.selectedNoVote, this.props.selectedNotVoting, this.props.voters)
  }

  handleRepChange () {
    this.props.getFilteredVotes({selectedRep: !this.props.selectedRep}, this.props.selectedDem, !this.props.selectedRep, this.props.selectedYesVote, this.props.selectedNoVote, this.props.selectedNotVoting, this.props.voters)
  }

  handleYesVoteChange () {
    this.props.getFilteredVotes({selectedYesVote: !this.props.selectedYesVote}, this.props.selectedDem, this.props.selectedRep, !this.props.selectedYesVote, this.props.selectedNoVote, this.props.selectedNotVoting, this.props.voters)
  }

  handleNoVoteChange () {
    this.props.getFilteredVotes({selectedNoVote: !this.props.selectedNoVote}, this.props.selectedDem, this.props.selectedRep, this.props.selectedYesVote, !this.props.selectedNoVote, this.props.selectedNotVoting, this.props.voters)
  }

  handleNotVotingChange () {
    this.props.getFilteredVotes({selectedNotVoting: !this.props.selectedNotVoting}, this.props.selectedDem, this.props.selectedRep, this.props.selectedYesVote, this.props.selectedNoVote, !this.props.selectedNotVoting, this.props.voters)
  }

  handleFilterChange () {
    this.props.getFilteredVotes(filter, this.props.voters)
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  render () {
    const bill = this.props.voteInfo || {}
    const visibleVoters = this.props.visibleVoters || {}
    const totalBreakDown = this.props.voteTotalBreakDown || {}
    const partyBreakDown = this.props.votePartyBreakDown || {}
    const demBreakDown = partyBreakDown.D || {}
    const repBreakDown = partyBreakDown.R || {}

    let tooltip = function(x, y0, y, total) {
      return y.toString();
    }
    let BarChart = ReactD3.BarChart
    let PieChart = ReactD3.PieChart
    var sort = null
    if(totalBreakDown){
      var data = {
        label: 'Total Votes',
        values: [{x: `${totalBreakDown.Yea} voted Yes`, y: totalBreakDown.Yea}, {x: `${totalBreakDown.Nay} voted No`, y: totalBreakDown.Nay}, {x: 'Total Present', y: totalBreakDown.Present}]
      }
    }
    if(partyBreakDown){
      var demData = {
        label: 'Democrat Votes',
        values: [{x: `${demBreakDown.Yea} voted Yes`, y: demBreakDown.Yea}, {x: `${demBreakDown.Nay} voted No`, y: demBreakDown.Nay}, {x: `${demBreakDown.Present} voted Present`, y: demBreakDown.Present}]
      }
      var repData = {
        label: 'Republican Votes',
        values: [{x: `${repBreakDown.Yea} voted Yes`, y: repBreakDown.Yea}, {x: `${repBreakDown.Nay} voted No`, y: repBreakDown.Nay}, {x: `${repBreakDown.Present} Yes Vote(s)`, y: repBreakDown.Present}]
      }
    }
    let voteList
    if (visibleVoters){
      voteList = Object.keys(visibleVoters).map((v, idx) => (
        <Link key={idx} to={`/person/${visibleVoters[v].govtrack_id}`}>
          <Chip
            className='voter-block'
            backgroundColor={visibleVoters[v].vote === 'Yea' ? '#C5E1A5' : '#f9a9ad'}
          >
          <Avatar
            className='voter-block-avatar'
            color={visibleVoters[v].party === 'R' ? '#f44336' : '#2196F3'}>
            {visibleVoters[v].state}
          </Avatar>
          {visibleVoters[v].first_name} {visibleVoters[v].last_name}
          </Chip>
        </Link>
      ))
    }

    return (
      <div className="container">
        <div className="vote-info">
          <h1>{bill.question}</h1>
          <p>{this.props.title}</p>
          <p id="result">{bill.result} in the {bill.chamber} with {bill.required} required</p>
        </div>

        <div className='vote-filter-box'>
          <VoteFilterBox
            selectedDem
            selectedRep
            selectedNotVoting
            selectedNoVote
            selectedYesVote
            handleRepChange={this.handleRepChange}
            handleDemChange={this.handleDemChange}
            handleNotVotingChange={this.handleNotVotingChange}
            handleNoVoteChange={this.handleNoVoteChange}
            handleYesVoteChange ={this.handleYesVoteChange}
          />
          <RaisedButton
            className='filter-button'
            label="View Graphs"
            onTouchTap={this.handleToggle.bind(this)}
         />
          <Drawer
            open={this.state.open}
            openSecondary={true}
            width={500}
            className="vote-drawer"
            >
            <h5>Total Votes</h5>
            <PieChart
              data={data}
              width={400}
              height={400}
              margin={{top: 10, bottom: 10, left: 100, right: 100}}
              sort={sort}
              />
             <h5>Democrat Breakdown</h5>
             <PieChart
              data={demData}
              width={400}
              height={400}
              margin={{top: 10, bottom: 10, left: 100, right: 100}}
              sort={sort}
              />
             <h5>Republican Breakdown</h5>
             <PieChart
              data={repData}
              width={400}
              height={400}
              margin={{top: 10, bottom: 10, left: 100, right: 100}}
              sort={sort}
              />
          </Drawer>
        </div>
        <div className="vote-container">{voteList}</div>
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
  open: React.PropTypes.bool,
  voteInfo: React.PropTypes.object,
  voters: React.PropTypes.arrayOf(React.PropTypes.object),
  voteTotalBreakDown: React.PropTypes.object,
  votePartyBreakDown: React.PropTypes.object,

  fetchVote: React.PropTypes.func,
  chamber_label: React.PropTypes.string,
  question: React.PropTypes.string,
  number: React.PropTypes.number,
  vote: React.PropTypes.object,
  title: React.PropTypes.string,
  chamber: React.PropTypes.string,
  congress: React.PropTypes.number,
  created: React.PropTypes.string,
  vote: React.PropTypes.string,
  first_name: React.PropTypes.string,

  D: React.PropTypes.object,
  R:React.PropTypes.object
}

const mapStateToProps = (state) => ({
  voteInfo: state.voteInfo,
  voters: state.voters,
  visibleVoters: state.visibleVoters,
  voteTotalBreakDown: state.voteTotalBreakDown,
  votePartyBreakDown: state.votePartyBreakDown,
  selectedDem: state.selectedDem,
  selectedRep: state.selectedRep,
  selectedYesVote: state.selectedYesVote,
  selectedNoVote: state.selectedNoVote,
  selectedNotVoting: state.selectedNotVoting
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVote: bindActionCreators(fetchVote, dispatch),
    getFilteredVotes: bindActionCreators(getFilteredVotes, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
