import { html, css, unsafeCSS } from 'lit';
import fa from '@fortawesome/fontawesome-free/css/fontawesome.css';
import faBrands from '@fortawesome/fontawesome-free/css/brands.css';
import faSolid from '@fortawesome/fontawesome-free/css/solid.css';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }

    .slider-container {
      height: 15vh;
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 1001;
    }

    .slider-sections {
      display: flex;
      justify-content: space-between;
      align-content: center;
      height: 100%;
    }

    .slider-chart {
      flex: 1 1 auto;
      height: 100%;
      overflow: auto;
    }

    .arrow-left,
    .arrow-right {
      flex: 0 0 50px;
      font-size: 2rem;
      cursor: pointer;
    }

    .arrow-left i,
    .arrow-right i {
      position: absolute;
      top: 40%;
    }

    .slider-chart-top,
    .slider-chart-bottom {
      display: flex;
      align-content: center;
      place-items: end;
      justify-content: center;
      height: 50%;
    }

    .slider-chart-top {
      place-content: space-evenly;
    }

    .day-marker {
      background: cadetblue;
      padding: 5px 10px;
      border: 2px solid black;
      height: 35px;
      opacity: .9;
    }

    .event {
      width: 3px;
      height: 25%;
      background: red;
    }

    .event-marker {
      width: 3px;
      height: 100%;
      background: black;
    }

  `;

  return [
    css`${unsafeCSS(fa)}`,
    css`${unsafeCSS(faBrands)}`,
    css`${unsafeCSS(faSolid)}`,
    elementStyles
  ];
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
        <option value=${ts.timestamp}>${ts.formattedHoursMins}</option>      
      `)}
      
    </select>
    <br style="padding: 3rem 0">


    <div class="slider-container">
      <div class="slider-sections">
        <div class="arrow-left">
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div class="slider-chart">
          <div class="slider-chart-top">
            ${this.uniqueDates && this.uniqueDates.map(d => html`
              <span class="day-marker">${new Date(d).getMonth()+1}/${new Date(d).getDate()}</span>
            `)}
          </div>
          <div class="slider-chart-bottom">
            ${this.timestamps && this.timestamps.map(ts => html`
              ${(ts.formattedHoursMins === '00:00' || ts.formattedHoursMins === '12:00') ? 
                html`<span class="event-marker" data-timestamp=${ts.timestamp}></span>` : 
                html`<span 
                  class="event" 
                  style="height: ${ts.value > 0 ? ts.value/this.averageValue*55 : '5'}%; 
                         background-color: rgb(${ts.value > 0 ? ts.value/this.averageValue*200 : '5'},75,75);
                         pointer: cursor" 
                  data-timestamp=${ts.timestamp}
                  data-tooltip="${ts.formattedHoursMins} - ${ts.value}"
                  @click=${this._sliderClicked}>
                </span>`}
            `)}
          </div>
        </div>
        <div class="arrow-right">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>

  </div>
`;}