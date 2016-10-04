import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores'
import Layout from './components/Layout'
import Landing from './components/Landing'
import Browse from './components/Browse'
import Details from './components/Details'
import Votes from './components/Votes'
import Vote from './components/Vote'

const { Router, Route, IndexRoute, browserHistory } = require('react-router')
const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Layout} >
        <IndexRoute component={Landing} />
        <Route path='browse' component={Browse} />
        <Route path='/bill/:id' component={Details} />
        <Route path='/bill/:id/votes' component={Votes} />
        <Route path='/bill/:id/votes/:number' component={Vote} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
