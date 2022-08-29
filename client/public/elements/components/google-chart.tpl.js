import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
  `;

  return [elementStyles];
}

export function render() { 
return html`
  <div>${JSON.stringify(this.eventFeatures)}</div>
  <div id="chart" style="width: 900px; height: 500px"></div>
`;}
