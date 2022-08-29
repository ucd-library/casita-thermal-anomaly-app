import { LitElement } from 'lit';
import {render, styles} from "./page-event-detail.tpl.js";

export default class PageEventDetail extends Mixin(LitElement)
  .with(LitCorkUtils) {
  
  static get properties() {
    return {
      eventId: {type: Number},
      eventDetail: {type: Object},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();

    this._injectModel('EventDetailModel');
    this.eventDetail = {};
    this.eventId = 0;
    this.render = render.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * @method firstUpdated
   * @description Lit method called when element is first updated.
   */
  async firstUpdated() {
    this.eventId = 34; // TODO get from previous page link
    const eventDetail = await this.EventDetailModel.get(this.eventId);
  }

  /**
   * @method _onUpdateEventDetail
   * @description bound to EventDetailService update-event-detail event
   *
   * @param {Object} e
   */
  async _onUpdateEventDetail(e) {
    this.eventDetail = Object.values(e.byEventId)[0];
  }

}

customElements.define('page-event-detail', PageEventDetail);
