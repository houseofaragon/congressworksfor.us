import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores'

import Layout from './components/Layout'
import Landing from './components/Landing'
import Browse from './components/Browse'
import Bills from './components/Bills'
import BillDetails from './components/BillDetails'
import Vote from './components/Vote'
import PersonDetails from './components/PersonDetails'
import Legislators from './components/Legislators'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

require('./styles/index.scss')

const { Router, Route, IndexRoute, browserHistory } = require('react-router')

const store = configureStore()

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/' component={Layout} >
          <IndexRoute component={Landing} />
          <Route path='/browse' component={Browse} />
          <Route path='/legislators' component={Legislators} />
          <Route path='/bills' component={Bills} />
          <Route path='/bill/:id' component={BillDetails} />
          <Route path='/bill/:id/votes/:number' component={Vote} />
          <Route path='/person/:id' component={PersonDetails} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
