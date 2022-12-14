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
  <leaf-map .eventId=${this.eventId}></leaf-map>
`;}
