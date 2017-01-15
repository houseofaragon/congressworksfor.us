import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { bindActionCreators } from 'redux'
import { postUser } from '../actions/index'

class Registration extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    console.log(e)
    e.preventDefault()
    this.props.postUser()
  }

  render () {
    return (
      <div className='registration'>
        <div className={this.props.success ? 'form invisible' : 'form'}>
          <h2> Sign Up </h2>
          <form
            className="header-bar-search"
            onSubmit={this.handleSubmit}>
            <TextField
              hintText="Phone Number"
              ref="phone_number"
              className="search-field"
            />
            <TextField
              hintText="Zipcode"
              ref="zipcode"
              className="search-field"
            />
            <button onClick={this.handleSubmit}> Submit </button>
          </form>
        </div>
        {this.props.success ? <div className='welcome-msg'> <h2>Thank you for signing up!</h2> </div> : ''}
      </div>
    )
  }
}

Registration.propTypes = {
  success: React.PropTypes.bool,
  postUser: React.PropTypes.func
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
