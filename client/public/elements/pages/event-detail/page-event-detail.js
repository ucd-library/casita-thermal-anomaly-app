import { LitElement } from 'lit';
import {render, styles} from "./page-event-detail.tpl.js";

export default class PageEventDetail extends Mixin(LitElement)
  .with(LitCorkUtils) {
  
  static get properties() {
    return {
      eventId: {type: Number},
      eventDetail: {type: Object},
      eventfeatures: {type: Object},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();

    this._injectModel('EventDetailModel', 'EventFeaturesModel');
    this.eventDetail = {};
    this.eventFeatures = {};
    this.eventId = 0;
    this.render = render.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    debugger;
  }

  /**
   * @method firstUpdated
   * @description Lit method called when element is first updated.
   */
  async firstUpdated() {
    this.eventId = 34; // TODO get from previous page link
    const eventDetail = await this.EventDetailModel.get(this.eventId);
    const eventFeatures = await this.EventFeaturesModel.get(eventDetail);
  }

  /**
   * @method _onUpdateEventDetail
   * @description bound to EventDetailService update-event-detail event
   *
   * @param {Object} e
   */
  async _onUpdateEventDetail(e) {
    this.eventDetail = e.payload;
  }

  /**
   * @method _onUpdateEventFeatures
   * @description bound to EventFeaturesService update-event-features event
   *
   * @param {Object} e
   */
  async _onUpdateEventFeatures(e) {
    console.log('in _onUpdateEventFeatures woot');
    this.eventFeatures = e.byEventId[this.eventId].payload;
  }

}

customElements.define('page-event-detail', PageEventDetail);
