import { LitElement } from 'lit';
import {render, styles} from "./leaf-map.tpl.js";

export default class LeafMap extends LitElement {

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

  connectedCallback() {
    super.connectedCallback();
    this._initMap();
  }

  /**
   * @method firstUpdated
   * @description Lit method called when element is first updated.
   */
  firstUpdated() {
    // 
  }

  _initMap() {
    const mapdiv = document.createElement('div');
    mapdiv.setAttribute('id', 'map');
    this.shadowRoot.appendChild(mapdiv);
    
    const map = L.map(mapdiv);
    map.setView([38.5416996,-121.7708035], 13);
    // map.setView([37.8, -96], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    map.whenReady(() => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 1); // trigger resize so map renders completely
    });

    // image overlay (https://leafletjs.com/examples/overlays/)
    const imageUrl = 'https://data.casita.library.ucdavis.edu/west/conus/2022-08-23/20/00-00/7/b6/blocks/1666-213/hourly-max-10d-max.png';
    const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
    const altText = 'Image of world.';
    const latLngBounds = L.latLngBounds([[38.341,-121.570], [38.542,-121.771]]);

    const imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 0.9,
        errorOverlayUrl: errorOverlayUrl,
        alt: altText,
        interactive: true
    }).addTo(map);
    
    imageOverlay.addEventListener('click', (leafletEvent) => {
      // see https://stackoverflow.com/a/42111623/1071630
      var e = leafletEvent.originalEvent;
      var rect = e.target.getBoundingClientRect();
      var zoomedX = e.clientX - rect.left; //x position within the element.
      var zoomedY = e.clientY - rect.top;  //y position within the element

      const x = Math.round(zoomedX * imgWidth / rect.width);
      const y = Math.round(zoomedY * imgHeight / rect.height);
      console.log(x, y);
    });
    
    L.rectangle(latLngBounds).addTo(map);
    // map.fitBounds(latLngBounds);
  }
}

customElements.define('leaf-map', LeafMap);
