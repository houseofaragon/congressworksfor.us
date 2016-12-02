import React from 'react'
import { Link } from 'react-router'
import Gauge from './Gauge'
import LegislatorForm from './LegislatorForm'

class Landing extends React.Component {
  render () {
    return (
      <div>
        <div className="landing">
          <div id="landing-text">
            <h1 className="landing-header"> Congress Works For Us </h1>
            <br />
            <h1>There are <span>100</span> Senate seats.</h1>
            <h1> and <span>435</span> House seats.</h1>
            <h1> <span>58%</span> are Republicans. </h1>
            <br /><br /><br />
            <h3> Find Your Legislator <LegislatorForm /></h3>
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
