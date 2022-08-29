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

  <google-chart .eventDetail=${this.eventDetail}></google-chart>
`;}
