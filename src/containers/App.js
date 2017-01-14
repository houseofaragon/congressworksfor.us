import React from 'react'
import Header from '../components/Header'

const App = (props) => (
  <div>
    <Header />
    {props.children}
  </div>
)
const { element } = React.PropTypes

App.propTypes = {
  children: element
}

module.exports = App
