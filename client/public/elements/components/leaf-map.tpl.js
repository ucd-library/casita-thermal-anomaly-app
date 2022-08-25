import { html, css, unsafeCSS } from 'lit';
import leafStyles from 'leaflet/dist/leaflet.css';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      height: 500px;
    }

    #map {
      height: 100%;
      width: 100%;
    }
  `;

  return [css`${unsafeCSS(leafStyles)}`, elementStyles];
}

export function render() { 
return html`
`;}