import { LitElement } from 'lit';
import {render, styles} from "./slider-control.tpl.js";

export default class SliderControl extends LitElement {

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

customElements.define('slider-control', SliderControl);