/*eslint-disable */

import React from 'react';
import DataTable from './DataTable';

export default class DataTableBox extends React.Component {
  render() {
    return (
      <div className="data-table-box">
        <div className="data-table-box-outer">
          <DataTable
            regionData={this.props.regionData}
          />
        </div>
      </div>
    );
  }
}

DataTableBox.propTypes = {
  regionData: React.PropTypes.array.isRequired,
  emptyRegions: React.PropTypes.array.isRequired,
}
