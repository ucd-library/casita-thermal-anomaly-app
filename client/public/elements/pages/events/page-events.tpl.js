import { html, css } from 'lit';
import FormatUtils from '../../../src/lib/format-utils';
import buttonsCss from '@ucd-lib/theme-sass/2_base_class/_buttons.css.js';
// import formsCss from '@ucd-lib/theme-sass/1_base_html/_forms.css.js';
import listsCss from '@ucd-lib/theme-sass/2_base_class/_lists.css.js';

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
    buttonsCss,
    listsCss,
    elementStyles
  ];
}

export function render() { 
return html`
  <p><button class="btn btn--sm init-push">Subscribe to notifications</button></p>
  <h2>Recent Thermal Events</h2>
  <ul class="list--arrow">

    ${this.events.map(event => html`
      <li role="none" style="cursor: pointer">
        <a href="/event/${event.thermal_anomaly_event_id}" role="menuitem" data-event-id=${event.thermal_anomaly_event_id}>${FormatUtils.formatDate(event.created)}</a>
      </li>`)}
    
  </ul>
`;}
