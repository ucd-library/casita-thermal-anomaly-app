import { html, css } from 'lit';
import colCss from '@ucd-lib/theme-sass/5_layout/_l-sibling-grid.css.js';


export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    
    hr {
      margin: 2em 0;
    }
  `;

  return [
    colCss,
    elementStyles
  ];
}

export function render() { 
return html`
  ${this.eventId && this.eventId > 0 ? html`<h4>Event ${this.eventId}</h4>` : ''}

  <div class="l-sibling-grid--half panel o-box">
    <div>
      <div class="l-sibling-grid--half panel o-box">
        <img src="https://data.casita.library.ucdavis.edu/${this.eventDetail.payload.satellite}/thermal-anomaly/${this.eventDetail.payload.created.substring(0, 10)}/${this.eventDetail.payload.created.substring(11, 13) - 1}/00-00/${this.eventDetail.payload.band}/${this.eventDetail.payload.apid}/blocks/1666-213/hourly-max-10d-average.png" alt="Image of hourly max 10 day average" />
      </div>
      <div class="l-sibling-grid--half panel o-box">
        <img src="https://data.casita.library.ucdavis.edu/${this.eventDetail.payload.satellite}/thermal-anomaly/${this.eventDetail.payload.created.substring(0, 10)}/${this.eventDetail.payload.created.substring(11, 13) - 1}/00-00/${this.eventDetail.payload.band}/${this.eventDetail.payload.apid}/blocks/1666-213/hourly-max-10d-max.png" alt="Image of hourly max 10 day max" />
      </div>
    </div>
    <div>
      <div class="l-sibling-grid--half panel o-box">
        <img src="https://data.casita.library.ucdavis.edu/${this.eventDetail.payload.satellite}/thermal-anomaly/${this.eventDetail.payload.created.substring(0, 10)}/${this.eventDetail.payload.created.substring(11, 13) - 1}/00-00/${this.eventDetail.payload.band}/${this.eventDetail.payload.apid}/blocks/1666-213/hourly-max-10d-stddev.png" alt="Image of hourly max 10 day standard deviation" />
      </div>
      <div class="l-sibling-grid--half panel o-box">
        <img src="https://data.casita.library.ucdavis.edu/${this.eventDetail.payload.satellite}/thermal-anomaly/${this.eventDetail.payload.created.substring(0, 10)}/${this.eventDetail.payload.created.substring(11, 13) - 1}/00-00/${this.eventDetail.payload.band}/${this.eventDetail.payload.apid}/blocks/1666-213/hourly-max-10d-min.png" alt="Image of hourly max 10 day min" />
      </div>
    </div>
  </div>
  <div class="l-sibling-grid--half panel o-box">
    <leaf-map></leaf-map>
  </div>
  
  
  

  <google-chart .eventDetail=${this.eventDetail}></google-chart>
`;}
