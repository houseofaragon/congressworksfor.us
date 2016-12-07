import React from 'react'
import TextField from 'material-ui/TextField'

class RepresentativeForm extends React.Component {
  constructor (props) {
    super(props)
    this.searchTermChange = this.searchTermChange.bind(this)
    this.getRepresentatives = this.getRepresentatives.bind(this)
  }

  searchTermChange (e) {
    console.log(this.props.handleSearchTermChange)
  }

  getRepresentatives (e) {
    this.props.handleRepresentatives(e.target.value)
  }

  render () {
    return (
      <form
        className="header-bar-search"
        onSubmit={this.getRepresentatives}>
        <TextField
          className='search-field'
          hintText="Find Your Representatives"
          floatingLabelText=""
          value={this.props.searchTerm}
          onChange={this.searchTermChange}
        />
      </form>
    )
  }
}

LegislatorForm.propTypes = {
  handleSearchTermChange: React.PropTypes.func,
  handleRepresentatives: React.PropTypes.func,
  searchTerm: React.PropTypes.string
}

export default RepresentativeForm

