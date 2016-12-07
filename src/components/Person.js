/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'

const Person = (props) => (
  <Link to={`/person/${props.id}`}>
    <p className="summary">{props.name}</p>
  </Link>
)

Person.propTypes = {
  name: React.PropTypes.string,
  id: React.PropTypes.number,
  sponsor: React.PropTypes.object,
  sponsor_id: React.PropTypes.string
}

export default Person
