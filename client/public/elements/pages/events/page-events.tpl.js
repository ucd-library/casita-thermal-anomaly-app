import { html, css } from 'lit';
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
  <h4>List of events / fires current / prior</h4>
  <ul class="list--arrow">
    <li>
      <a href="/eventDetail/42">8/25 10am</a>
      <br>More things about it...
    </li>
    
  </ul>
`;}