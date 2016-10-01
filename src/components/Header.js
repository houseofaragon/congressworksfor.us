import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { SET_SEARCH_TERM } from '../actions'

class Header extends React.Component {
  constructor (props) {
    super(props)

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }
  handleSearchTermChange (e) {
    this.props.setSearchTerm(e.target.value)
  }
  render () {
    return (
      <header className='header'>
        <h1 className='brand'>
          <Link to='/' className='brand-link'>
            {this.props.searchTerm}
          </Link>
        </h1>
        <input type='text' className='search-input' placeholder='Search' value={this.props.searchTerm} onChange={this.handleSearchTermChange} />
      </header>
    )
  }
}

Header.propTypes = {
  setSearchTerm: React.PropTypes.func,
  searchTerm: React.PropTypes.string
}

const mapStateToProps = (state) => ({ searchTerm: state.searchTerm })
const mapDispatchToProps = (dispatch) => {
  return {
    setSearchTerm: (term) => {
      dispatch({type: SET_SEARCH_TERM, value: term})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

