/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBill } from '../actions/index'

class Details extends React.Component {
  componentDidMount () {
    this.props.fetchBill(this.props.params.id)
  }
  render () {
    const { bill } = this.props || {}
    const { title, id, related_bills } = bill
    return (
      <div className='container'>
        <h1>{title}</h1>
        <Link to={`/bill/${id}/votes`}>lnk</Link>
        <pre><code>
          {JSON.stringify(bill, null, 2)}
        </code></pre>
      </div>
    )
  }
}

Details.propTypes = {
  params: React.PropTypes.object,
  bill: React.PropTypes.object,
  fetchBill: React.PropTypes.func,
  title: React.PropTypes.string,
  id: React.PropTypes.number,
  related_bills: React.PropTypes.array
}

const mapStateToProps = (state) => ({
  bill: state.bill
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBill: bindActionCreators(fetchBill, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
