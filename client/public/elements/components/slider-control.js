import { LitElement } from 'lit';
import {render, styles} from "./slider-control.tpl.js";
import FormatUtils from '../../src/lib/format-utils';

export default class SliderControl extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      eventId: {type: Number},
      eventDetail: {type: Object},
      uniqueDates: {type: Array},
      timestamps: {type: Array}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();

    this.eventDetail = {};
    this.eventId = 0;
    this._injectModel('EventFeaturesModel');
    // this.uniqueDates = [];
    // this.timestamps = [];
    this.render = render.bind(this);
  }

  /**
   * @method updated
   * @description lit-element updated method
   * 
   * @param {Object} props 
   */
   async updated(props) {
    if( this.eventDetail && !this.uniqueDates ) {
      // parse unique dates
      this.uniqueDates = this.eventDetail.payload.timestamps.map(ts => FormatUtils.formatDate(ts[0]).split(' ')[0])
        .filter((value, index, self) => self.indexOf(value) === index && index > 0).reverse();
    }
  }

  _updateTimeDropdown(e) {
    // get current selected date and filter available times for that date
    const selectedDate = e.target.value;
    this.timestamps = this.eventDetail.payload.timestamps
      .filter(ts => FormatUtils.formatDate(ts[0]).split(' ')[0] === selectedDate)
      .map(r => ({ timestamp: r[0], formatted: FormatUtils.formatDate(r[0], false, true) })).reverse();
  }

  async _onTimeChanged(e) {
    const timestamp = e.target.value;
    // await this.EventFeaturesModel.get(this.eventDetail, timestamp);
    this.dispatchEvent(new CustomEvent('refresh-chart', {
      bubbles: true,
      detail: { timestamp }
    }));
  }

}

customElements.define('slider-control', SliderControl);