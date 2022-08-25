import { LitElement } from 'lit';
import {render, styles} from "./page-event-detail.tpl.js";

export default class PageEventDetail extends LitElement {

  static get properties() {
    return {
      
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

}

customElements.define('page-event-detail', PageEventDetail);