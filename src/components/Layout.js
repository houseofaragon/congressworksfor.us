import React from 'react'
import Header from './Header'

const Layout = (props) => (
  <div>
    <Header />
    {props.children}
  </div>
)
const { element } = React.PropTypes

Layout.propTypes = {
  children: element
}

module.exports = Layout
