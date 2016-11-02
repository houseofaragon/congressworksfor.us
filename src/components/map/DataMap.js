/*eslint-disable */
import * as d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from '../../data/states-defaults';
import objectAssign from 'object-assign';

export default class DataMap extends React.Component {
  constructor(props){
    super(props);
    this.datamap = null;
  }
  linearPalleteScale(value){
    const dataValues = this.props.regionData.map(function(data) { return data.value });
    const minVal = Math.min(...dataValues);
    const maxVal = Math.max(...dataValues);
    return d3.scaleLinear().domain([minVal, maxVal]).range(["#1A237E","#f44336"])(value);
  }
  redducedData(){
    const newData = this.props.regionData.reduce((object, data) => {
      let fill
      if(data.value === 0) fill = '#2196f3'
      else if(data.value === 150) fill = 'orange'
      else fill = this.linearPalleteScale(data.value)
      object[data.code] = { value: data.value, fillColor: fill, democrat: data.democrat, republican: data.republican };
      return object;
    }, {});
    return objectAssign({}, statesDefaults, newData);
  }
  renderMap(){
    d3.select('svg').remove();
    return new Datamap({
      element: ReactDOM.findDOMNode(this),
      scope: 'usa',
      data: this.redducedData(),
      geographyConfig: {
        borderWidth: 0.5,
        highlightFillColor: '#FFCtC80',
        popupTemplate: function(geography, data) {
          if (data && data.value === 300) {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + '<br/> Republican ' + data.republican + '<br/>  most likely to defeat <br/> Democrat ' + data.democrat + '</strong></div>';
          } else if (data && data.value === 200) {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + '<br/> Republican ' + data.republican + '<br/>  likely to defeat <br/> Democrat ' + data.democrat + '</strong></div>';
          } else if (data && data.value === 50) {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + '<br/> Democrat ' + data.democrat + '<br/>  likely to defeat <br/> Republican ' + data.republican + '</strong></div>';
          } else if (data && data.value === 150) {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + '<br/> There is a toss up between Democrat <br/> ' + data.democrat + ' and Republican ' + data.republican + '</strong></div>';
          } else if (data && data.value === 10) {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + '<br/> Democrat ' + data.democrat + '<br/>  most likely to defeat <br/> Republican ' + data.republican + '</strong></div>';
          } else {
            return '<div class="hoverinfo"><strong> No senate race in ' + geography.properties.name + '</strong></div>';
          }
        }
      }
    });
  }
  currentScreenWidth(){
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
  }

 componentDidMount(){
    const initialScreenWidth = this.currentScreenWidth();
    const mapContainer = d3.select('#datamap-container')
                           .style('width', initialScreenWidth)

    this.datamap = this.renderMap();

    window.addEventListener('resize', () => {
      const currentScreenWidth = this.currentScreenWidth();
      const mapContainerWidth = mapContainer.style('width');
      if (mapContainerWidth !== this.currentScreenWidth()) {
        mapContainer.style({
          width: currentScreenWidth + 'px',
          height: (currentScreenWidth * 0.5625) + 'px'
        });
        this.datamap = this.renderMap();
      }
    });
  }

  componentDidUpdate(){
    this.datamap.updateChoropleth(this.redducedData());
  }

  componentWillUnmount(){
    d3.select('svg').remove();
  }

  render() {
    return (
      <div id="datamap-container"></div>
    );
  }
}

DataMap.propTypes = {
    regionData: React.PropTypes.array.isRequired
};
