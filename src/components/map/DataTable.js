/*eslint-disable */
import React from 'react';
import DataTableRow from './DataTableRow';
import SortableHeader from './SortableHeader';

export default class DataTable extends React.Component {
  renderTableRows(){
    return this.props.regionData.map((data, index) => {
      if(data.value === 150) {return (
        <DataTableRow
          key={index}
          regionName={data.regionName}
          democrat={data.democrat}
          notes={data.notes}
          republican={data.republican}
        />
      )}
    })
  }
  render() {
    return (
      <table className="bill-table">
        <thead>
          <tr>
            <SortableHeader
              label="STATE NAME"
              sortKey="regionName"
            />
            <SortableHeader
              label="DEMOCRAT"
              sortKey="value"
            />
            <SortableHeader
              label="REPUBLICAN"
              sortKey="value"
            />
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>
    );
  }
}

DataTable.propTypes = {
  regionData: React.PropTypes.array.isRequired,
  democrat: React.PropTypes.string,
  republican: React.PropTypes.string,
  notes: React.PropTypes.string,
  value: React.PropTypes.number,
}
