import {BaseModel} from '@ucd-lib/cork-app-utils';
import EventFeaturesService from '../services/EventFeaturesService.js';
import EventFeaturesStore from '../stores/EventFeaturesStore.js';

class EventFeaturesModel extends BaseModel {

  constructor() {
    super();

    this.store = EventFeaturesStore;
    this.service = EventFeaturesService;
      
    this.register('EventFeaturesModel');
  }

  /**
   * @method get
   * @description Fetch event features data with EventFeaturesService
   *
   * @returns {Promise}
   */
   async get(event, timestamp) {
    // get current state
    let state = this.store.data.byEventIdTimestamp[event.id+'/'+(timestamp || event.payload.timestamps[1][0])];

    try {
      if( state && state.request ) {
        // await promise request
        await state.request;
      } else {
        // or call the service / api if not in the store already
        await this.service.get(event, timestamp || event.payload.timestamps[1][0]);
      }
    } catch (error) {
      // error is recorded in store
    }
    return this.store.data.byEventIdTimestamp[event.id+'/'+(timestamp || event.payload.timestamps[1][0])];
  }

}

const model = new EventFeaturesModel();
export default model;