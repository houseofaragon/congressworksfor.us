/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPerson } from '../actions/index'

class Person extends React.Component {
  componentDidMount () {
    this.props.fetchPerson(this.props.params.id)
  }
  render () {
    const { person } = this.props || {}
    const { title, id, name } = person
    return (
      <div className='container'>
        <h1>{name}</h1>
        <p>{title}</p>
        <pre><code>
          {JSON.stringify(person, null, 2)}
        </code></pre>
      </div>
    )
  }
}

Person.propTypes = {
  params: React.PropTypes.object,
  person: React.PropTypes.object,
  fetchPerson: React.PropTypes.func,
  title: React.PropTypes.string,
  id: React.PropTypes.number,
  name: React.PropTypes.string,
}

const mapStateToProps = (state) => ({
  person: state.person
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPerson: bindActionCreators(fetchPerson, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)
