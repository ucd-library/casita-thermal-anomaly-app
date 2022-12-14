import { LitElement } from 'lit';
import {render, styles} from "./google-chart.tpl.js";
import FormatUtils from '../../src/lib/format-utils';
export default class GoogleChart extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      eventfeatures: {type: Array},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.eventFeatures = [];
    this.render = render.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._initChart();
  }

  /**
   * @method updated
   * @description lit-element updated method
   * 
   * @param {Object} props 
   */
  updated(props) {
    if( this.eventFeatures.length > 0 ) {
      this._drawChart();
    }
  }

  /**
   * @method _initChart
   * @description setup for google chart and binding the draw function to google's onload callback
   *
   */
  _initChart() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this._drawChart.bind(this));
  }

  /**
   * @method _drawChart
   * @description callback for google chart onload to plot the chart data
   *
   */
  _drawChart() {
    if( this.eventFeatures.length > 0 ) {
      // not sure if we need to target a single thermal_anomaly_event_px_id, get with Justin, for now plot with a single pixels data
      const pixelData = this.eventFeatures[0];
      const data = [];

      // header data
      data.push([
        'DateTime', 'Current Value', 'Hourly Max',  '10 Day Average', '10 Day Max StdDev', `Threshold: avg+(stddev*${pixelData.properties.classifier})`,
      ]);

      const currentValue = pixelData.properties.value;
      let hourlyMax, tenDayMax, tenDayMin, tenDayAvg, tenDayStdDev, threshold;

      let timestamps = Object
        .keys(pixelData.properties.history)
        .map(timestamp => new Date(timestamp).getTime());

      let currentTime = new Date(Math.min(...timestamps));
      let endTime = new Date(Math.max(...timestamps));


      // for( const hist in pixelData.properties.history ) {
      while( currentTime.getTime() <= endTime.getTime() ) {
        let hist = currentTime.toISOString();

        const dateTime = FormatUtils.formatDate(hist, true); // key 'hist' is a datetime string
        const histValues = pixelData.properties.history[hist] || {};
        hourlyMax = histValues['hourly-max'] || null;
        tenDayMax = histValues['10d-max'] || null;
        tenDayMin = histValues['10d-min'] || null;
        tenDayAvg = histValues['10d-average'] || null;
        tenDayStdDev = histValues['10d-stddev'] || null;
        if (tenDayStdDev && tenDayStdDev < 100) {
          tenDayStdDev = 100;
        } 
        threshold = Number(tenDayAvg) + (Number(tenDayStdDev) * pixelData.properties.classifier);

        data.push([
          dateTime, currentValue, hourlyMax, tenDayAvg, tenDayStdDev, threshold
        ]);

        currentTime.setTime(currentTime.getTime() + (1000*60*60));
      }
      console.log(data);

      // join hourlyMax with currentValue if less
      if (Number(hourlyMax) < Number(currentValue)) {
        hourlyMax = currentValue;
        data.push([
          FormatUtils.formatDate(new Date().toJSON(), true), currentValue, hourlyMax,  tenDayAvg, tenDayStdDev, threshold
        ]);
      }
      const googleData = google.visualization.arrayToDataTable(data);

      const options = {
        title: 'conus',
        // curveType: 'function',
        legend: { position: 'bottom' }
      };

      if( !this.chart ) {
        this.chart = new google.visualization.LineChart(this.shadowRoot.querySelector('#chart'));
      }

      this.chart.draw(googleData, options);
    }    
  }

}

customElements.define('google-chart', GoogleChart);
