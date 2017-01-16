import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { bindActionCreators } from 'redux'
import { postUser } from '../actions/index'

class Registration extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this)
  }

  handlePhoneChange (e) {
    const input = this.refs.phone_number.input.value
    const max = 10
    validateLength(e, input, max)
  }
  handleZipcodeChange (e) {
    const input = this.refs.zipcode.input.value
    const max = 5
    validateLength(e, input, max)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.postUser(this.refs.phone_number.input.value, this.refs.zipcode.input.value)
  }

  render () {
    return (
      <div className='registration'>
        <div className={this.props.success ? 'form invisible' : 'form'}>
          <h1> Sign Up </h1>
          <h4> Get texts about upcoming elections <br /> and strategies for taking civic-action.</h4>
          <form
            className="header-bar-search"
            onSubmit={this.handleSubmit}>
            <TextField
              hintText='Phone Number'
              ref='phone_number'
              className='search-field'
              id='phone'
              onKeyDown={this.handlePhoneChange}
              type='number'
            />
            <TextField
              hintText="Zipcode"
              ref="zipcode"
              id='zipcode'
              className="search-field"
              type='number'
              onKeyDown={this.handleZipcodeChange}
            />
            <button onClick={this.handleSubmit}> Submit </button>
          </form>
        </div>
        {this.props.success ? <div className='registration-msg'> <h2>Thank you for signing up!</h2> </div> : ''}
      </div>
    )
  }
}

Registration.propTypes = {
  success: React.PropTypes.bool,
  postUser: React.PropTypes.func
}

const validateLength = (e, input, max) => {
  if (input.length === max && e.which !== 8 && e.which !== 9 && e.which !== 37 && e.which !== 39) {
    e.preventDefault()
    return false
  } else {
    validateKey(e)
  }
}

const validateKey = (e) => {
  if (e.which !== 8 && e.which !== 9 && e.which !== 37 && e.which !== 39 && isNaN(parseInt(e.key)) && !e.which.match(/^[0-9]+$/)) {
    e.preventDefault()
    return false
  } else {
    return true
  }
}

const mapStateToProps = (state) => ({
  success: state.success
})

const mapDispatchToProps = (dispatch) => {
  return {
    postUser: bindActionCreators(postUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
