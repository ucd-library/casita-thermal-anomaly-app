import {BaseService} from '@ucd-lib/cork-app-utils';
import EventsStore from '../stores/EventsStore.js';

class EventsService extends BaseService {

  constructor() {
    super();
    this.store = EventsStore;
  }

  /**
   * @method get
   * @description Fetch a list of thermal anomaly events
   *
   * @returns {Promise}
   */
  async get(id) {
    return this.request({
      url : 'https://data.casita.library.ucdavis.edu/_/thermal-anomaly/events',
      // if the state is 'loading' and another request for this object
      // comes in, both requests will wait on the same promise preventing
      // two network requests for the same object
      fetchOptions : { credentials: 'omit' },
      checkCached : () => this.store.data.byEventId[id],
      // request is a promise to resolves when network request finished (success or failure)
      onLoading : request => this.store.setEventsLoading(id, request),
      onLoad : result => this.store.setEventsLoaded(id, result.body),
      onError : e => this.store.setEventsError(id, e)
    });
  }

}

const service = new EventsService();
export default service;