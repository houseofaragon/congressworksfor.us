import React from 'react'
import { Link } from 'react-router'

const VoteCard = (props) => (
  <div className='show-card'>
    <div className='show-card-text'>
      <Link to={`/person/${props.person.id}`}>
        {props.option.value} - {props.person.name}
      </Link>
      <pre><code>{JSON.stringify(props, null, 4)}</code></pre>
    </div>
  </div>
)

VoteCard.propTypes = {
  title: React.PropTypes.string,
  person: React.PropTypes.object,
  name: React.PropTypes.string,
  option: React.PropTypes.object,
  value: React.PropTypes.string
}

export default VoteCard
