/*eslint-disable */
import React from 'react'
import TextField from 'material-ui/TextField'

const SearchForm = (props) => (
  <div className='form'>
    <form
      className="header-bar-search"
      onSubmit={props.getSearchResults}>
      <TextField
        className='search-field'
        hintText={props.hintText}
        floatingLabelText=""
        value={props.searchTerm}
        onChange={props.handleSearchTermChange}
      />
    </form>
  </div>
)

SearchForm.propTypes = {
  getSearchResults: React.PropTypes.func,
  hintText: React.PropTypes.string,
  handleSearchTermChange: React.PropTypes.func,
  searchTerm: React.PropTypes.string
}
export default SearchForm
