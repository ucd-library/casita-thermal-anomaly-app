import { LitElement } from 'lit';
import {render, styles} from "./page-event.tpl.js";
import "@ucd-lib/cork-app-utils";

export default class PageEvent extends Mixin(LitElement)
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

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  firstUpdated() {
    // todo move up and see if bubbles
    // let leafMap = this.shadowRoot.querySelector('leaf-map');
    // if (leafMap && leafMap.shadowRoot) {
    // this.addEventListener('show-detail-pixel', (e) => {

    // });
    // }
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
  }

}

customElements.define('page-event', PageEvent);
