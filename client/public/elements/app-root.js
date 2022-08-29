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
      eventId: {type: Number}
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

  /**
   * @method _onAppStateUpdate
   * @description bound to AppStateModel app-state-update event
   *
   * @param {Object} e
   */
  async _onAppStateUpdate(e) {
    let page = e.page;
    if( this.page === page ) return;
    this.page = page;

    this.eventId = Number(e.location.path.slice(-1)[0]);

    window.scrollTo(0, 0);
    this.firstAppStateUpdate = false;
  }

}

customElements.define('app-root', AppRoot);
