import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }

    button {
      margin: 1rem;
    }
  `;

  return [
    elementStyles
  ];
}

export function render() { 
return html`
  <!--
    Required for AppStateModel
    @ucd-lib/app-state-model imports this element
  -->
  <app-route .appRoutes="${this.appRoutes}"></app-route> 
  <ucd-theme-header
    site-name="UC Davis Library"
    slogan="Casita Thermal Anomaly App"
    figure-src="/img/book-logo.png"
    prevent-fixed
    is-demo>    
    <ucd-theme-primary-nav>

      ${this.navLinks.map(link => html`
        <li role="none">
          <a href=${link.href} role="menuitem" ?this-page="${link.page == this.page}" class="text-primary no-decoration nav-${link.page}">${link.text}</a>
        </li>`)}
      
    </ucd-theme-primary-nav>
    <ucd-theme-search-popup>
      <ucd-theme-search-form>
      </ucd-theme-search-form>
    </ucd-theme-search-popup>
  </ucd-theme-header>
  <ucdlib-pages selected="${this.page}" id="pages">

    <div id="events" class="category-brand--tahoe category-brand__background">
      <page-events></page-events>
    </div>

    <div id="event-detail" class="category-brand--tahoe category-brand__background">
      <page-event-detail .eventId=${this.eventId}></page-event-detail>
    </div>

  </ucdlib-pages>
`;}