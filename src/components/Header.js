import React from 'react'
import { Link, browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar'

class Header extends React.Component {

  handleTouchTap () {
    browserHistory.push('/')
  }

  render () {
    return (
      <AppBar
        className="header-bar"
        title={'CongressWorksForUs'}
        onTitleTouchTap={this.handleTouchTap}
        >
        <div id='routes'>
          <Link to={'/bills'}>Bills</Link>
          <Link to={'/legislators'}>Legislators</Link>
          <Link to={'/sms'}>APP</Link>
          <Link to={'/DNC'}>Latest: DNC CONVENTION</Link>
        </div>
      </AppBar>
    )
  }
}

export default Header

