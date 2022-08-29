import { LitElement } from 'lit';
import {render, styles} from "./google-chart.tpl.js";

export default class GoogleChart extends LitElement {

  static get properties() {
    return {
      eventfeatures: {type: Object},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.eventfeatures = {};
    this.render = render.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._initChart();
    debugger;
  }

  /**
   * @method firstUpdated
   * @description Lit method called when element is first updated.
   */
  firstUpdated() {
    debugger;
    
  }

  _initChart() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this._drawChart.bind(this));
  }

  _drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['DateTime', 'Current Value', 'Hourly Max', '10 Day Max Average', '10 Day Max StdDev'],
      ['9/1 @ 19',  212, 660, 222, 132],
      ['9/2 @ 6',   200, 620, 123, 456],
      ['9/2 @ 19',  440, 1024, 789, 1022],
      ['9/3 @ 6',   423, 1040, 321, 523]
    ]);

    const options = {
      title: 'conus',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    const chart = new google.visualization.LineChart(this.shadowRoot.querySelector('#chart'));

    chart.draw(data, options);
  }
}

customElements.define('google-chart', GoogleChart);
