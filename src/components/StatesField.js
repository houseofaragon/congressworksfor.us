/*eslint-disable */
import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchDNC } from '../actions/index'
import 'react-select/dist/react-select.css'

const STATES = require('../data/states')

class StatesField extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			country: 'US',
			disabled: false,
			searchable: false,
			selectValue: 'new-south-wales',
			clearable: false,
		}
	}

	switchCountry (e) {
		var newCountry = e.target.value
		console.log('Country changed to ' + newCountry)
		this.setState({
			country: newCountry,
			selectValue: null
		});
	}

	updateValue (newValue) {
		console.log('State changed to ' + newValue)
		this.setState({
			selectValue: newValue
		});
		this.props.fetchDNC(newValue)
	}

	focusStateSelect () {
		this.refs.stateSelect.focus()
	}
	toggleCheckbox (e) {
		let newState = {}
		newState[e.target.name] = e.target.checked
		this.setState(newState)
	}
	render () {
		var options = STATES[this.state.country];
		return (
			<div className="section">
				<Select ref="stateSelect" autofocus options={options} simpleValue clearable={this.state.clearable} name="selected-state" disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue.bind(this)} searchable={this.state.searchable} />
			</div>
		)
	}
}

StatesField.propTypes = {
	label: React.PropTypes.string,
	searchable: React.PropTypes.bool,
	fetchDNC: React.PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDNC: bindActionCreators(fetchDNC, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(StatesField)