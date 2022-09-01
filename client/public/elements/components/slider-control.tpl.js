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
  <div class="field-container">
    <!-- hack with styles since the select is temporary -->
    <select id="selectpicker" 
      style="height: 2.5rem; 
        margin: 0;
        padding: 0.25rem 0.75rem;
        border: 1px solid #999;
        border-radius: 0;
        background-color: #fff;
        background-image: none;
        box-shadow: 0 1px 1px rgb(0 0 0 / 8%) inset;
        color: #13639e;
        font-family: inherit;
        outline: 0;">
      <option value="">Everything</option>
      
    </select>
  </div>
`;}