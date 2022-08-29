import {BaseService} from '@ucd-lib/cork-app-utils';
import EventFeaturesStore from '../stores/EventFeaturesStore.js';

class EventFeaturesService extends BaseService {

  constructor() {
    super();
    this.store = EventFeaturesStore;
  }

  /**
   * @method get
   * @description Fetch event features by event
   *
   * @returns {Promise}
   */
  async get(event) {
    // get the geojson file with by requesting ie https://data.casita.library.ucdavis.edu/west/thermal-anomaly/2022-08-24/16/06-17/7/b6/34-features.json
    // the path being /[satellite]/thermal-anomaly/[date]/[hour]/[min-sec]/[band]/[apid]/[event-id]-features.json
    const dateTime = event.payload.timestamps[1][0];
    const date = dateTime.split('T')[0];
    const time = dateTime.split('T')[1];
    const hour = time.substr(0, 2);
    const min = time.substr(3, 2);
    const sec = time.substr(6, 2);
    const path = `${event.payload.satellite}/thermal-anomaly/${date}/${hour}/${min}-${sec}/${event.payload.band}/${event.payload.apid}`;

    return this.request({
      url : `https://data.casita.library.ucdavis.edu/${path}/${event.id}-features.json`,
      // optional
      fetchOptions : {
        credentials : 'omit'
      },
      // if the state is 'loading' and another request for this object
      // comes in, both requests will wait on the same promise preventing
      // two network requests for the same objects
      checkCached : () => this.store.data.byEventId[event.id],
      // request is a promise to resolves when network request finished (success or failure)
      onLoading : request => this.store.setEventFeaturesLoading(event.id, request),
      onLoad : result => this.store.setEventFeaturesLoaded(event.id, result.body),
      onError : e => this.store.setEventFeaturesError(event.id, e)
    });
  }

}

const service = new EventFeaturesService();
export default service;