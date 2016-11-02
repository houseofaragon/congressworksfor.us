/*eslint-disable */
import React from 'react';
import NumericInput from './NumericInput';

export default class DataTableRow extends React.Component {

  render() {
    return (
      <tr>
        <td>
          {this.props.regionName}
        </td>
        <td>
          {this.props.democrat}
        </td>
        <td>
          {this.props.republican}
        </td>
        <td>
          <span className="glyphicon glyphicon-remove remove-btn"><p>{this.props.notes}</p></span>
        </td>
      </tr>
    );
  }
}

DataTableRow.propTypes = {
  regionName: React.PropTypes.string.isRequired,
}
