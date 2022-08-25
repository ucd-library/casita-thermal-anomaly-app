import { LitElement } from 'lit';
import {render, styles} from "./page-events.tpl.js";
import "@ucd-lib/cork-app-utils";
// import '../../../src/models/EventsModel'

export default class PageEvents extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();

    this._injectModel('EventsModel');
    this.publicVapidKey = 'BDS8gmFNhDJuS_HDfHZZaKV_sb9DA0Yyp3RVUp4rxPPFH2OURoBao5OYhPFc-cMM3sUF-a4UbBtCrJx64p1kc5o';    

    this.render = render.bind(this);
  }

  /**
   * @method firstUpdated
   * @description Lit method called when element is first updated.
   */
  async firstUpdated() {
    const eventData = await this.EventsModel.get();
    this._initPushSub();
  }

  /**
   * @method _onUpdateEvents
   * @description bound to AppStateModel app-state-update event
   *
   * @param {Object} e
   */
   async _onUpdateEvents(e) {
    debugger;
    console.log('_onUpdateEvents', e);

  }

  _initPushSub() {
    const initPush = this.shadowRoot.querySelector('.init-push');
    if (initPush) {
      initPush.addEventListener('click', async () => {
        if ('serviceWorker' in navigator) {
          const register = await navigator.serviceWorker.register('/src/services/sw.js');
  
          // need to save this 'subscription' PushSubscription body to the db.. this is how we know where to send push notifications on the server side
          const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(this.publicVapidKey),
          });
          console.log(JSON.stringify(subscription));
  
          await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } else {
          console.error('Service workers are not supported in this browser');
        }
      });
    }
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

}

customElements.define('page-events', PageEvents);