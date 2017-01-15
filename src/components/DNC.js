import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchDNC } from '../actions/index'

class DNC extends React.Component {
  componentWillMount () {
    this.props.fetchDNC()
  }
  render () {
    const { delegates } = this.props || {}
    let delegateList
    if (delegates) {
      delegateList = Object.keys(delegates).map((state, idx) => (
        state.maps((item, idx) => (
          <div key={idx} className='delegate'>
            <h4>{state}</h4>
            <h2>{item.delegate}</h2>
          </div>
        )
      )))
    } else {
      delegateList = <p> No delegate results. </p>
    }
    return (
      <div className='DNC'>
        <div id='dnc-description'>
          <h1>DNC NATIONAL CONVENTION</h1>
        </div>
        <h3>~ CANDIDATES ~</h3>
        <div id='candidate-wrapper'>
          <div className='candidate'>
            <h1 className='candidate-name'>Keith Ellison</h1>
            <ul className='candidate-list'>
              <li>Progressive choice</li>
              <li>Endorsed by Bernie Sanders and <a href="http://www.huffingtonpost.com/entry/elizabeth-warren-keith-ellison-endorsement_us_582c9ddae4b030997bbce86c">Eliabeth Warren</a></li>
              <li>Also endorsed by Harry Reid and Chuck Schumer</li>
              <li>Also endorsed by AFL-CIO</li>
              <li>First Muslim elected to Congress</li>
              <li>First black congressman from Minnesota</li>
              <li>Promises to resign from congress in favor of chair</li>
            </ul>
          </div>
          <div className='candidate'>
            <h1 className='candidate-name'>Tom Perez</h1>
            <ul className='candidate-list'>
              <li>Establishment candidate</li>
              <li>Obama insider (Former Sec. of Labor)</li>
              <li>Endorsed by governors of VA, LA, RI, CO</li>
              <li>Wants to focus DNC on rural areas</li>
            </ul>
          </div>
          <div className='candidate'>
            <h1 className='candidate-name'>Ray Buckley</h1>
            <ul className='candidate-list'>
              <li>New Hampshire Dem. Chair</li>
              <li>“100 percent neutral and 100 percent fair”</li>
              <li>"“We look at what happened here in 2016 when there was this surge — or collapse — in the last minute in battleground state after battleground state, but not in New Hampshire,"</li>
            </ul>
          </div>
          <div className='candidate'>
            <h1 className='candidate-name'>Sally Boynton Brown</h1>
            <ul className='candidate-list'>
              <li>Establishment candidate</li>
              <li>Obama insider (Former Sec. of Labor)</li>
              <li>Endorsed by governors of VA, LA, RI, CO</li>
              <li>Wants to focus DNC on rural areas</li>
            </ul>
          </div>
          <div className='candidate'>
            <h1 className='candidate-name'>Jamie Harrison</h1>
            <ul className='candidate-list'>
              <li>Chairman of South Carolina Democratic Party</li>
              <li>40-years old</li>
              <li>"probably the only person that's ever been on food stamps that's been chairman of the Democrat Party, the only chair that will have over $160,000 of student loan debt"</li>
              <li>A Clinton favorite</li>
              <li>Rebuild the party 'grassroots' ground up</li>
            </ul>
          </div>
        </div>
        <div id='delegate-wrapper'>
          <h3>~ DELEGATES ~</h3>
          { delegateList }
        </div>
      </div>
    )
  }
}

DNC.propTypes = {
  delegates: React.PropTypes.object,
  fetchDNC: React.PropTypes.func
}

const mapStateToProps = (state) => ({
  delegates: state.delegates
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDNC: bindActionCreators(fetchDNC, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DNC)
