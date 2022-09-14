import { LitElement } from 'lit';
import {render, styles} from "./leaf-map.tpl.js";
import {Proj} from 'proj4leaflet';
export default class LeafMap extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      eventId: {type: Number},
      map: {type: Object},
      imageOverlay: {type: Object},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this._injectModel('AppStateModel');
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
    const overlay = this.shadowRoot.querySelector('.leaflet-map-pane');
    // if (this.imageOverlay) {
    if (overlay) {
      overlay.addEventListener('click', (leafletEvent) => {
        // see https://stackoverflow.com/a/42111623/1071630
        /*
        var e = leafletEvent.originalEvent;
        var rect = e.target.getBoundingClientRect();
        var zoomedX = e.clientX - rect.left; //x position within the element.
        var zoomedY = e.clientY - rect.top;  //y position within the element
        
        const x = Math.round(zoomedX * imgWidth / rect.width);
        const y = Math.round(zoomedY * imgHeight / rect.height);
        console.log(x, y);
        */
        // todo parse overlay that was clicked to zoom in on particular pixel section?
        // we could get position if not in shadowDom, but some issues with click events getting through to shadow

        // this will likely change depending on how many overlay images we're adding, need to chat more on that
        // also we want to bubble the event up and not daisy-chain the event, for some reason it wasn't working though
        // then propogate event to change to detail view

        // this.dispatchEvent(new CustomEvent('show-detail-pixel', {
        //   bubbles: true,
        //   overlay: 42
        // }));

        /*
        location:
          fullpath: "/event-detail/42"
          hash: ""
          path: (2) ['event-detail', '42']
          pathname: "/event-detail/42"
          query: {}
        */

        // this.AppStateModel.set({
        //   location: {
        //     fullpath: `/event-detail/${this.eventId}`,
        //     hash: '',
        //     path: ['event-detail', this.eventId],
        //     pathname: `/event-detail/${this.eventId}`,
        //     query: {}
        //   }
        // });
      });
    }
  }

  _initMap() {
    const mapdiv = document.createElement('div');
    mapdiv.setAttribute('id', 'map');
    this.shadowRoot.appendChild(mapdiv);
    
    // let crs = L.CRS.proj4js('EPSG:3310', '+proj=aea +lat_0=0 +lon_0=-120 +lat_1=34 +lat_2=40.5 +x_0=0 +y_0=-4000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs', new L.Transformation(0.5 / (Math.PI * L.Projection.Mercator.R_MAJOR), 0.5, -0.5 / (Math.PI * L.Projection.Mercator.R_MINOR), 0.5));
    const crs = new L.Proj.CRS('EPSG:3310', 
      '+proj=aea ' + 
      '+lat_0=0 ' +  
      '+lon_0=-120 ' +  
      '+lat_1=34 ' +  
      '+lat_2=40.5 ' +  
      '+x_0=0 ' +
      '+y_0=-4000000 ' +  
      '+ellps=GRS80 ' + 
      '+towgs84=0,0,0,0,0,0,0 ' + 
      '+units=m ' +  
      '+no_defs ',
      {
        resolutions: [8192, 4096, 2048], // zoom level resolutions
        origin: [0, 0]
      },
      // new L.Transformation(0.5 / (Math.PI * L.Projection.Mercator.R_MAJOR), 0.5, -0.5 / (Math.PI * L.Projection.Mercator.R_MINOR), 0.5)
    );
    const map = L.map(mapdiv, { center: new L.LatLng(57.74, 11.94), crs });

    map.setView([57.74, 11.94], 13);
    // map.setView([37.8, -96], 4);
    this.map = map;

    const mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    });
    if( !map.hasLayer(mapLayer) ) {
      map.addLayer(mapLayer);
    }

    map.whenReady(() => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 1); // trigger resize so map renders completely
    });

    // image overlay (https://leafletjs.com/examples/overlays/)
    // const imageUrl = 'https://data.casita.library.ucdavis.edu/west/thermal-anomaly/2022-08-24/22/00-00/7/b6/blocks/1666-213/hourly-max-10d-stddev.png';
    const imageUrl = 'https://data.casita.library.ucdavis.edu/west/california/2022-09-13/16/16-17/2/imagery/image.png';
    const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
    const altText = 'Image of something.';
    const latLngBounds = L.latLngBounds([[38.441,-121.670], [38.642,-121.871]]);

    const imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 0.9,
        errorOverlayUrl: errorOverlayUrl,
        alt: altText,
        interactive: true
    }).addTo(map);
    this.imageOverlay = imageOverlay;

    
    L.rectangle(latLngBounds).addTo(map);
    // map.fitBounds(latLngBounds);


    
    // var map = new L.Map('Krak-Map', { center: new L.LatLng(latitude, longitude), zoom: 17, crs: crs });

  }
}

customElements.define('leaf-map', LeafMap);
