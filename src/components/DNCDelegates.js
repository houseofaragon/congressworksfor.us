/*eslint-disable */
import React from 'react'
import StatesField from './StatesField'

const DNCDelegates = (props) => (
	<div id='delegate-wrapper'>
		<div>
			<h3 className='dnc-header'>~ DELEGATES ~</h3>
			<StatesField />
		</div>
		<div id='delegates'>
			{ props.delegateList }
		</div>
	</div>
)

DNCDelegates.propTypes = {
  delegateList: React.PropTypes.object
}

export default DNCDelegates

