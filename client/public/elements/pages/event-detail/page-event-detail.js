import { LitElement } from 'lit';
import {render, styles} from "./page-event-detail.tpl.js";
import imageUtils from '../../../src/lib/image-utils.js';
import '../../components/canvas-image.js';

export default class PageEventDetail extends Mixin(LitElement)
  .with(LitCorkUtils) {
  
  static get properties() {
    return {
      eventId: {type: Number},
      eventDetail: {type: Object},
      eventImages: {type: Object}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();

    this._injectModel('EventDetailModel', 'EventFeaturesModel');
    this.eventDetail = {};
    this.eventId = 0;
    this.render = render.bind(this);
    this.eventImages = {};
  }

  /**
   * @method updated
   * @description lit-element updated method
   * 
   * @param {Object} props 
   */
  async updated(props) {
    if( this.eventId ) {
      await this.EventDetailModel.get(this.eventId);
    }
  }

  /**
   * @method _onUpdateEventDetail
   * @description bound to EventDetailService update-event-detail event
   *
   * @param {Object} e
   */
  async _onUpdateEventDetail(e) {
    this.eventDetail = Object.values(e.byEventId)[0];
    this.eventImages = imageUtils.getProductUrlsFromEvent(this.eventDetail.payload);
  
    let features = await this.EventFeaturesModel.get(this.eventDetail);
    setTimeout(() => {
      let images = this.shadowRoot.querySelectorAll('canvas-image');
      images.forEach(image => {
        features.payload.features.forEach(feature => {
          // image.ctx.beginPath();
          image.ctx.fillStyle='red';
          console.log(feature.properties.pixel_x, feature.properties.pixel_y);
          image.ctx.fillRect(feature.properties.pixel_x, feature.properties.pixel_y, 5, 5);
        });
      });
    }, 3000);
  }

}

customElements.define('page-event-detail', PageEventDetail);
