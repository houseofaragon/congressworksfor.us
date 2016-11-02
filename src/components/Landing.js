import React from 'react'
import { Link } from 'react-router'
import Gauge from './Gauge'

class Landing extends React.Component {
  render () {
    return (
      <div>
        <div className="landing">
          <div id="landing-text">
            <h1 className="landing-header"> Know Your Congress </h1>
            <p>There are 100 seats in the Senate.</p>
            <p>45 are Democrats</p>
            <p>54 are Republicans</p>
            <p>1 is an Independent</p>
            <p>Things can change in the 2016 election</p>
            <Link to={'/legislators'}>See All Legislators</Link>
          </div>
          <Gauge />
        </div>
        <div className="landing-side-grid">
          <Link to='bill/s2040-114'>
            <div className="landing-side-grid-tile">
              <div className='tile-info'>
                <div className='landing-sprites' id="terror" />
                <h5 className='tile-pre-title'> TERROR</h5>
                <h4 className='tile-title'> Justice Against Sponsors of Terrorism</h4>
              </div>
            </div>
          </Link>
          <Link to='bill/hr3134-114'>
            <div className="landing-side-grid-tile">
              <div className='tile-info'>
                <div className='landing-sprites' id="women" />
                <h5 className='tile-pre-title'>WOMEN</h5>
                <h4 className='tile-title'> Planned Parenthood Bill </h4>
              </div>
            </div>
          </Link>
          <Link to='bill/hr3590-111'>
            <div className="landing-side-grid-tile">
              <div className='tile-info'>
                <div className='landing-sprites' id="health" />
                <h5 className='tile-pre-title'> HEALTH</h5>
                <h4 className='tile-title'> OBAMACARE </h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Landing
