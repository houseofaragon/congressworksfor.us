import React from 'react'
import { Link } from 'react-router'

const Representatives = (props) => {
  console.log('props', props)
  const rep = props.reps || {}
  const senateData = props.senators || {}
  const senators = senateData.map((representative, idx) => (
    <div className='legislator' key={idx}>
      <h5> Senator </h5>
      <Link to={`/person/${representative.person.id}`}>
        <h2>{representative.person.name}</h2>
      </Link><br />
      <div className='fields'>
        <h5>Term Ends </h5>
        <p>{representative.enddate}</p>
      </div>
      <div className='fields'>
        <h5>Party </h5>
        <p>{representative.party}</p>
      </div>
      <div className='fields'>
        <h5>Address </h5>
        <p style={{maxWidth: '300px'}}>{representative.extra.address}</p>
      </div>
      <div className='social'>
        <a href={`tel:+${representative.phone}`}><div id='call'>call</div></a>
        <a href={representative.website}><div id='website'>website</div></a>
        <a href={representative.extra.contact_form}><div id='email'>email</div></a>
      </div>
    </div>
  ))

  const representative = (
    <Link to={`/person/${rep.person.id}`}>
      <div className='legislator' id='representative'>
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
    <div>
      {senators}
      {representative}
    </div>
  )
}

Representatives.propTypes = {
  legislators: React.PropTypes.object,
  reps: React.PropTypes.object,
  senators: React.PropTypes.object
}

export default Representatives
