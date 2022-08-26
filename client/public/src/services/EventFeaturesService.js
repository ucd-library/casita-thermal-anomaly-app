import {BaseService} from '@ucd-lib/cork-app-utils';
import EventDetailStore from '../stores/EventDetailStore.js';

class EventDetailService extends BaseService {

  constructor() {
    super();
    this.store = EventDetailStore;
  }

  /**
   * @method get
   * @description Fetch event features by event
   *
   * @returns {Promise}
   */
  async get(event) {
    /*
    // with eventId, can request https://data.casita.library.ucdavis.edu/_/thermal-anomaly/event/34 for instance, which returns
      thermal_anomaly_event_id: 34
      created:"2022-08-24T16:06:17.000Z"
      label:null
      notes:null
      satellite:"west"
      product:"conus"
      apid:"b6"
      band:"7"
      active:false
      timestamps [2]
        0
        0:"timestamp"
        1:"pixelCount"
`
        1
        0:"2022-08-24T16:06:17.000Z"
        1:"35"

    // then can get the geojson file with by requesting https://data.casita.library.ucdavis.edu/west/thermal-anomaly/2022-08-24/16/06-17/7/b6/34-features.json
    // the path being /[satellite]/thermal-anomaly/[date]/[hour]/[min-sec]/[band]/[apid]/[event-id]-features.json
    */
    const path = `${event.satellite}/thermal-anomaly/`; // TODO
    console.log(event);
    debugger;

    /*
    event : {
      id: 34
      payload:
        active: false
        apid: "b6"
        band: "7"
        created: "2022-08-24T16:06:17.000Z"
        label: null
        notes: null
        product: "conus"
        satellite: "west"
        thermal_anomaly_event_id: 34
        timestamps: (2) [Array(2), Array(2)]
      [[Prototype]]: Object
      state: "loaded"
      [[Prototype]]: Object
    }
      */

    return this.request({
      url : `https://data.casita.library.ucdavis.edu/${path}/${event.thermal_anomaly_event_id}-features.json`,
      // optional
      fetchOptions : {
        credentials : 'omit'
      },
      // if the state is 'loading' and another request for this object
      // comes in, both requests will wait on the same promise preventing
      // two network requests for the same objects
      checkCached : () => this.store.data.byEventId[id],
      // request is a promise to resolves when network request finished (success or failure)
      onLoading : request => this.store.setEventDetailLoading(id, request),
      onLoad : result => this.store.setEventDetailLoaded(id, result.body),
      onError : e => this.store.setEventDetailError(id, e)
    });
  }

}

const service = new EventDetailService();
export default service;