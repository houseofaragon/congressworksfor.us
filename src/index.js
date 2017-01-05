import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores'
import Layout from './components/Layout'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

require('./styles/index.scss')
const { Router, browserHistory } = require('react-router')
const store = configureStore()

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

const rootRoute = {
  component: Layout,
  childRoutes: [
    {
      path: '/',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/Landing').default)
        })
      }
    },
    {
      path: '/browse',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/Browse').default)
        })
      }
    }, {
      path: '/legislators',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/Legislators').default)
        })
      }
    }, {
      path: '/bills',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/Bills').default)
        })
      }
    }, {
      path: '/bill/:id',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/BillDetails').default)
        })
      }
    }, {
      path: '/bill/:id/votes/:number',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/Vote').default)
        })
      }
    }, {
      path: '/person/:id',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/PersonDetails').default)
        })
      }
    }
  ]
}

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory} routes={rootRoute} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
