import { LitElement } from 'lit';
import {render, styles} from "./page-event-detail.tpl.js";

export default class PageEventDetail extends Mixin(LitElement)
  .with(LitCorkUtils) {
  
  static get properties() {
    return {
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

    this.render = render.bind(this);
  }

  /**
   * @method firstUpdated
   * @description Lit method called when element is first updated.
   */
  async firstUpdated() {
    const eventDetail = await this.EventDetailModel.get(34);
    const eventFeatures = await this.EventFeaturesModel.get(eventDetail);
  }

  /**
   * @method _onUpdateEventDetail
   * @description bound to EventDetailService update-event-detail event
   *
   * @param {Object} e
   */
  async _onUpdateEventDetail(e) {
    // TODO format datetime more elegantly, possibly display other data in list depending on Kimmy's designs
    this.eventDetail = e.payload;
    console.log(e)
  }

  /**
   * @method _onUpdateEventFeatures
   * @description bound to EventFeaturesService update-event-features event
   *
   * @param {Object} e
   */
  async _onUpdateEventFeatures(e) {
    console.log('in _onUpdateEventFeatures woot')
    this.eventDetail = e.payload;
    console.log(e)
  }

}

customElements.define('page-event-detail', PageEventDetail);