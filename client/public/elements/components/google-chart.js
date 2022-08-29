import { LitElement } from 'lit';
import {render, styles} from "./google-chart.tpl.js";
import FormatUtils from '../../src/lib/format-utils';
export default class GoogleChart extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      eventId: {type: Number},
      eventDetail: {type: Object},
      eventfeatures: {type: Array},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();

    this._injectModel('EventDetailModel', 'EventFeaturesModel');
    this.eventDetail = {};
    this.eventFeatures = [];
    this.eventId = 0;

    this.render = render.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._initChart();
  }

  /**
   * @method firstUpdated
   * @description Lit method called when element is first updated.
   */
  async firstUpdated() {
    // this.eventId = 34; // TODO get from previous page link
    // if (this.eventDetail) {
    //   const eventFeatures = await this.EventFeaturesModel.get(this.eventDetail);
    // }
  }

  /**
   * @method updated
   * @description lit-element updated method
   * 
   * @param {Object} props 
   */
  async updated(props) {
    if( this.eventFeatures.length > 0 ) {
      this._drawChart();
    } else if( this.eventDetail && Object.keys(this.eventDetail).length > 0 ) {
      this.eventId = this.eventDetail.id;
      await this.EventFeaturesModel.get(this.eventDetail);
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
        'DateTime', 'Current Value', 'Hourly Max', '10 Day Max Average', '10 Day Max StdDev', `Threshold: avg+(stddev*${pixelData.properties.classifier})`, '10 Day Min Average', '10 Day Average'
      ]);

      for( const hist in pixelData.properties.history ) {
        const dateTime = FormatUtils.formatDate(hist, true); // key 'hist' is a datetime string
        const histValues = pixelData.properties.history[hist];
        const currentValue = pixelData.properties.value;
        const hourlyMax = histValues['hourly-max'];
        const tenDayMax = histValues['10d-max'];
        const tenDayMin = histValues['10d-min'];
        const tenDayAvg = histValues['10d-average'];
        let tenDayStdDev = histValues['10d-stddev'];
        if (tenDayStdDev && tenDayStdDev < 100) {
          tenDayStdDev = 100;
        } 
        const threshold = Number(tenDayAvg) + (Number(tenDayStdDev) * pixelData.properties.classifier);

        data.push([
          dateTime, currentValue, hourlyMax, tenDayMax, tenDayStdDev, threshold, tenDayMin, tenDayAvg
        ]);
      }

      const googleData = google.visualization.arrayToDataTable(data);

      const options = {
        title: 'conus',
        curveType: 'function',
        legend: { position: 'bottom' }
      };

      const chart = new google.visualization.LineChart(this.shadowRoot.querySelector('#chart'));

      chart.draw(googleData, options);
    }    
  }

  /**
   * @method _onUpdateEventFeatures
   * @description bound to EventFeaturesService update-event-features event
   *
   * @param {Object} e
   */
  async _onUpdateEventFeatures(e) {
    this.eventFeatures = e.byEventId[this.eventId].payload.features;
    this.requestUpdate();
  }
}

customElements.define('google-chart', GoogleChart);
