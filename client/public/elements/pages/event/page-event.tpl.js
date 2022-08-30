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

  return [
    elementStyles
  ];
}

export function render() { 
return html`
  <leaf-map @show-detail-pixel="${(e) => { this._onShowDetails(e) }}"></leaf-map>
`;}
