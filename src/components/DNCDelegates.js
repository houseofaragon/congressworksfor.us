/*eslint-disable */
import React from 'react'

const DNCDelegates = (props) => (
	<div id='delegate-wrapper'>
		<h3 className='dnc-header'>~ DELEGATES ~</h3>
		<div id='delegates'>
		  { props.delegateList }
		</div>
	</div>
)

export default DNCDelegates

