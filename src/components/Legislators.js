import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Legislators extends React.Component {
  render () {
    const rep = this.props.legislators.objects[0] || {}
    const senateData = this.props.legislators.senators.objects || {}
    const senators = senateData.map((representative, idx) => (
      <div key={idx}>
        <h5> Senator </h5>
        <Link to={`/person/${representative.person.id}`}>
          <h2>{representative.person.name}</h2>
        </Link><br />
        <h5>Term Ends </h5>
        <p>{representative.enddate}</p>
        <h5>Party </h5>
        <p>{representative.party}</p>
        <h5>Address </h5>
        <p style={{maxWidth: '300px'}}>{representative.extra.address}</p>
        <div className='social'>
          <a href={`tel:+${representative.phone}`}><div id='call'>call</div></a>
          <a href={representative.website}><div id='website'>website</div></a>
          <a href={representative.extra.contact_form}><div id='email'>email</div></a>
        </div>
      </div>
    ))

    const representative = (
      <Link to={`/person/${rep.person.id}`}>
        <div id='representative'>
          <h5> Representative </h5>
          <h2>{rep.person.name}</h2><br />
          <h5>term ends </h5>
          <p>{rep.enddate}</p>
          <h5>Party </h5>
          <p>{rep.party}</p>
          <h5>Address </h5>
          <p style={{maxWidth: '300px'}}>{rep.extra.address}</p>
          <div className='social'>
            <a href={`tel:+${rep.phone}`}><div id='call'>call</div></a>
            <a href={rep.website}><div id='website'>website</div></a>
            <a href={rep.extra.contact_form}><div id='email'>email</div></a>
          </div>
        </div>
      </Link>
    )

    return (
      <div className='container'>
        <div className='bill-title'>
          <h1>These are the people who work for you in {rep.state}</h1>
        </div>
        <div className='bill-details'>
          <div id='legislators'>
            {senators}
            {representative}
          </div>
        </div>
      </div>
    )
  }
}

Legislators.propTypes = {
  regionData: React.PropTypes.array.isRequired,
  emptyRegions: React.PropTypes.array.isRequired,
  legislators: React.PropTypes.object
}

const mapStateToProps = (state) => ({
  regionData: state.regionData,
  emptyRegions: state.emptyRegions,
  legislators: state.legislators
})

export default connect(mapStateToProps)(Legislators)
