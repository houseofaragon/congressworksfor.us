import React from 'react'
import { connect } from 'react-redux'
import { getLegislators } from '../actions/index'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField'

class LegislatorForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (e) {
    e.preventDefault()
    this.props.getLegislators(this.refs.term.getValue())
  }

  render () {
    return (
      <div>
        <form
          className="header-bar-search"
          onSubmit={this.handleFormSubmit}>
          <TextField
            className='search-field'
            hintText="Enter address 'ABC 123 Street"
            floatingLabelText="SEARCH"
            ref="term"
          />
        </form>
      </div>
    )
  }
}

LegislatorForm.propTypes = {
  getLegislators: React.PropTypes.func
}
const mapDispatchToProps = (dispatch) => {
  return {
    getLegislators: bindActionCreators(getLegislators, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LegislatorForm)

