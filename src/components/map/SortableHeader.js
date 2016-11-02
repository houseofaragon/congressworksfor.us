/*eslint-disable */
import React from 'react';

export default class SortableHeader extends React.Component {
  render() {
    return (
      <th>
        <h4>{this.props.label}</h4>
      </th>
    );
  }
}

SortableHeader.propTypes = {
  label: React.PropTypes.string.isRequired,
}
