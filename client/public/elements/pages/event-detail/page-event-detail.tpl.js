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
  ${this.eventId && this.eventId > 0 ? html`<h2>Event ${this.eventId}</h2>` : ''}

  <div class="l-container" style="margin-bottom: 2rem; position: relative; clear: both;">
    <slider-control .eventDetail=${this.eventDetail}></slider-control>
  </div>

  <div class="l-container">
    <div class="l-sibling-grid--half panel o-box">    
    ${this.eventDetail && this.eventDetail.payload ? html`
        <div>
          <div class="l-sibling-grid--half panel o-box">
            <canvas-image src="${this.eventImages['hourly-max-10d-average.png']}" alt="Image of hourly max 10 day average" ></canvas-image>
          </div>
          <div class="l-sibling-grid--half panel o-box">
            <canvas-image src="${this.eventImages['hourly-max-10d-max.png']}" alt="Image of hourly max 10 day max" ></canvas-image>
          </div>
        </div>
        <div>
          <div class="l-sibling-grid--half panel o-box">
            <canvas-image src="${this.eventImages['hourly-max-10d-stddev.png']}" alt="Image of hourly max 10 day standard deviation" ></canvas-image>
          </div>
          <div class="l-sibling-grid--half panel o-box">
            <canvas-image src="${this.eventImages['hourly-max.png']}" alt="Image of hourly max"></canvas-image>
          </div>
        </div>
      ` : ''}
    </div>

    <div class="l-sibling-grid--half panel o-box">
      <leaf-map></leaf-map>
    </div>
  </div>
  
  <div class="l-container" style="margin-bottom: 2rem; position: relative; clear: both;">
    <google-chart .eventDetail=${this.eventDetail}></google-chart>
  </div>
  
  
  

`;}
