import {BaseService} from '@ucd-lib/cork-app-utils';
import EventDetailStore from '../stores/EventDetailStore.js';

class EventDetailService extends BaseService {

  constructor() {
    super();
    this.store = EventDetailStore;
  }

  /**
   * @method get
   * @description Fetch details for event by id
   *
   * @returns {Promise}
   */
  async get(id) {    
    return this.request({
      url : `https://data.casita.library.ucdavis.edu/_/thermal-anomaly/event/${id}`,
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