import { LitElement } from 'lit';
import {render, styles} from "./canvas-image.tpl.js";

export default class CanvasImage extends LitElement {

  static get properties() {
    return {
      src : {type: String}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  async updated() {
    if( this.renderedUrl === this.src ) return;
    let img = await this._loadImg(this.src);
    
    this.canvas.setAttribute('height', img.height);
    this.canvas.setAttribute('width', img.width);
    this.ctx.drawImage(img, 0, 0);
    let pxData = this.ctx.getImageData(0, 0, img.width, img.height);
    
    let histo = {};
    for( let i = 0; i < pxData.data.length; i += 4) {
      if( !histo[pxData.data[i]] ) histo[pxData.data[i]] = 0;
      histo[pxData.data[i]]++;
    }
    let values = Object.keys(histo);
    let min = Math.min(...values);
    let max = Math.max(...values);
    let spread = 255 / (max - min);

    console.log(min, max, spread);

    for( let i = 0; i < pxData.data.length; i += 4) {
      for( let j = 0; j < 4; j++ ) {
        pxData.data[i+j] = pxData.data[i+j]*spread;
      }
    }
    this.ctx.putImageData(pxData, 0, 0);
  }

  _loadImg(src) {
    let img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";

    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = e => reject(e);
    });
  }

}

customElements.define('canvas-image', CanvasImage);