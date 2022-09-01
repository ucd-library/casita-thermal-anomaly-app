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

    <select class="select-date" 
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
        outline: 0;"
      @change=${this._updateTimeDropdown}>
      <option value="">Select Date</option>

      ${this.uniqueDates && this.uniqueDates.map(date => html`
        <option value=${date}>${date}</option>      
      `)}

    </select>

    <select class="select-time" 
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
        outline: 0;"
      @change=${this._onTimeChanged}>
      <option value="">Select Time</option>

      ${this.timestamps && this.timestamps.map(ts => html`
        <option value=${ts.timestamp}>${ts.formatted}</option>      
      `)}
      
    </select>
  </div>
`;}