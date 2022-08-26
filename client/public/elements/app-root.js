import { LitElement } from 'lit';
import {render, styles} from "./app-root.tpl.js";
import config from "../src/config";
import "@ucd-lib/cork-app-utils";

export default class AppRoot extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      appRoutes : {type: Array},
      page: { type: String },
      navLinks: {type: Array},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.appRoutes = config.appRoutes;
    this.loadedPages = {};

    this._injectModel('AppStateModel');
    this.page = this.appRoutes[0];

    
    this.navLinks = [
      {text: 'Events', page: 'events', href: '/', type: 'events'},
      {text: 'Event Detail', page: 'event-detail', href: '/event-detail', type: 'event-detail'},
    ];

    this.render = render.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();    
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // const initPush = this.shadowRoot.querySelector('.init-push');
    // if (initPush) {
    //   initPush.removeEventListener('click', this._initPushSub);
    // }
  }

  /**
   * @method firstUpdated
   * @description Lit method called when element is first updated.
   */
  firstUpdated() {
    // const initPush = this.shadowRoot.querySelector('.init-push');
    // if (initPush) {
      // initPush.addEventListener('click', this._initPushSub);
    // }

  }

  _onLinkClick(link) {
    console.log(link)
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to AppStateModel app-state-update event
   *
   * @param {Object} e
   */
  async _onAppStateUpdate(e) {
    console.log('_onAppStateUpdate', e);

    let page = e.page;
    if( this.page === page ) return;
    this.page = page;

    window.scrollTo(0, 0);
    this.firstAppStateUpdate = false;
  }

  

}

customElements.define('app-root', AppRoot);
