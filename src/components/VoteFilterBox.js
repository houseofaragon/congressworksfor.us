/*eslint-disable */
import React from 'react'
import Toggle from 'material-ui/Toggle'
import Paper from 'material-ui/Paper'

const VoteFilterBox = (props) => (
  <Paper className='filter-box' zDepth={1}>
    <Toggle
      className="filter-toggle"
      label={<span><span id="democrat-filter-label-square"></span>Democrats</span>}
      defaultToggled={props.selectedDem}
      labelPosition='right'
      defaultToggled={true}
      onToggle={props.handleDemChange}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
      labelStyle={styles.labelStyle}
    />
    <Toggle
      label={<span><span id="republican-filter-label-square"></span>Republicans</span>}
      defaultToggled={props.selectedRep}
      labelPosition='right'
      onToggle={props.handleRepChange}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
      labelStyle={styles.labelStyle}
    />
    <Toggle
      label={<span><span id="yes-filter-label-square"></span>Yes</span>}
      defaultToggled={props.selectedYesVote}
      labelPosition='right'
      onToggle={props.handleYesVoteChange}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
      labelStyle={styles.labelStyle}
    />
    <Toggle
      label={<span><span id="no-filter-label-square"></span>No</span>}
      defaultToggled={props.selectedNoVote}
      labelPosition='right'
      onToggle={props.handleNoVoteChange}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
      labelStyle={styles.labelStyle}
    />
    <Toggle
      label={<span><span id="not-voting-filter-label-square"></span>Absent</span>}
      defaultToggled={props.selectedNotVoting}
      labelPosition='right'
      onToggle={props.handleNotVotingChange}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
      labelStyle={styles.labelStyle}
    />
  </Paper>
)

const styles = {
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: 'red !important',
  },
  thumbSwitched: {
    backgroundColor: 'red !important',
  },
  trackSwitched: {
    backgroundColor: 'red !important',
  },
  labelStyle: {
    color: 'red',
  },
}

VoteFilterBox.propTypes = {
  label: React.PropTypes.object,
  selectedDem: React.PropTypes.bool,
  selectedRep: React.PropTypes.bool,
  selectedYesVote: React.PropTypes.bool,
  selectedNoVote: React.PropTypes.bool,
  selectedNotVoting: React.PropTypes.bool,
  handleDemChange: React.PropTypes.func,
  handleRepChange: React.PropTypes.func,
  handleNotVotingChange: React.PropTypes.func,
  handleNoVoteChange: React.PropTypes.func,
  handleYesVoteChange: React.PropTypes.func
}

export default VoteFilterBox
