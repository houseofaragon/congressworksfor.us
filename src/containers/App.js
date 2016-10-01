import React, { Component, PropTypes } from 'react'
import {} from '../actions/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Landing from '../components/Landing'

/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render () {
    const { actions } = this.props
    return (
      <div>
        <Landing actions={actions} />
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state) { // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = {}
  return props
}

function mapDispatchToProps (dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {}
  const actionMap = { actions: bindActionCreators(actions, dispatch) }
  return actionMap
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
