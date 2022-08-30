import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    
    hr {
      margin: 2em 0;
    }
  `;

  return [elementStyles];
}

export function render() { 
return html`
  ${this.eventId && this.eventId > 0 ? html`<h4>Event ${this.eventId}</h4>` : ''}

  <leaf-map></leaf-map>
  
  <img src="https://data.casita.library.ucdavis.edu/west/thermal-anomaly/2022-08-24/22/00-00/7/b6/blocks/1666-213/hourly-max-10d-stddev.png" alt="hi" />

  <google-chart .eventDetail=${this.eventDetail}></google-chart>
`;}
