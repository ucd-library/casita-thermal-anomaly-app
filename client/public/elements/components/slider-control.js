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
      timestamps: {type: Array},
      averageValue: {type: Number}
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
    if( this.eventDetail && this.eventDetail.payload && !this.uniqueDates ) {
      // parse unique dates
      const uniqueDates = this.eventDetail.payload.timestamps.map(ts => FormatUtils.formatDate(ts[0]).split(' ')[0])
        .filter((value, index, self) => self.indexOf(value) === index && index > 0);

      // ending date will be 12am following day
      const nextDay = new Date(uniqueDates[uniqueDates.length - 1]);
      nextDay.setDate(nextDay.getDate() + 1);
      uniqueDates.push(FormatUtils.formatDate(nextDay.toJSON()).split(' ')[0]);
      
      this.uniqueDates = uniqueDates;

      this._buildSliderData();
    }
  }

  _updateTimeDropdown(e) {
    // get current selected date and filter available times for that date
    const selectedDate = e.target.value;
    this.timestamps = this.eventDetail.payload.timestamps
      .filter(ts => FormatUtils.formatDate(ts[0]).split(' ')[0] === selectedDate)
      .map(r => ({ timestamp: r[0], formattedHoursMins: FormatUtils.formatDate(r[0], false, true) })).reverse();
  }

  async _onTimeChanged(e) {
    const timestamp = e.target.value;
    // await this.EventFeaturesModel.get(this.eventDetail, timestamp);
    this.dispatchEvent(new CustomEvent('refresh-chart', {
      bubbles: true,
      detail: { timestamp }
    }));
  }

  _buildSliderData() {
    // parse timestamps and plot into slider control
    this.timestamps = this.eventDetail.payload.timestamps
      .filter(ts => ts[0] !== 'timestamp')
      .map(r => ({ timestamp: r[0], formattedHoursMins: FormatUtils.formatDate(r[0], false, true), value: r[2] }));
    
    const fiveMins = 1000 * 60 * 5; // to round datetime to 5 minute intervals
    let currentDatetime = new Date(this.uniqueDates[0]); // 12am day 1
    let endingDatetime = new Date(this.uniqueDates[this.uniqueDates.length - 1]);
    let averageValues = []; // to store values, need to average values to be within 100% to use for template height

    // date is PST, need to change to UTC

    let frames = [];
    while( currentDatetime <= endingDatetime ) {
      let matchedTimestamp = this.timestamps.filter(ts => 
        new Date(Math.round(new Date(ts.timestamp).getTime() / fiveMins) * fiveMins).toJSON() === currentDatetime.toJSON()
      );
      if( matchedTimestamp.length > 0 ) {
        frames.push(matchedTimestamp[0]);
        averageValues.push(matchedTimestamp[0].value);
      } else {
        frames.push({
          timestamp: currentDatetime.toJSON(), 
          formattedHoursMins: FormatUtils.formatDate(currentDatetime.toJSON(), false, true), 
          value: 0
        });
      }

      currentDatetime = new Date(currentDatetime.getTime() + fiveMins);
    }

    this.timestamps = frames;
    this.averageValue = averageValues.reduce((total, current) => total + current) / averageValues.length;
  }

  async _sliderClicked(e) {
    debugger;
    const timestamp = e.target.dataset.timestamp;
    // await this.EventFeaturesModel.get(this.eventDetail, timestamp);
    this.dispatchEvent(new CustomEvent('refresh-chart', {
      bubbles: true,
      detail: { timestamp }
    }));
  }
}

customElements.define('slider-control', SliderControl);