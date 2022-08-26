import {BaseModel} from '@ucd-lib/cork-app-utils';
import EventDetailService from '../services/EventDetailService.js';
import EventDetailStore from '../stores/EventDetailStore.js';

class EventDetailModel extends BaseModel {

  constructor() {
    super();

    this.store = EventDetailStore;
    this.service = EventDetailService;
      
    this.register('EventDetailModel');
  }

  /**
   * @method get
   * @description Fetch event details data with EventDetailService
   *
   * @returns {Promise}
   */
   async get(id) {
    // get current state
    let state = this.store.data.byEventId[id];

    try {
      if( state && state.request ) {
        // await promise request
        await state.request;
      } else {
        // or call the service / api if not in the store already
        await this.service.get(id);
      }
    } catch (error) {
      // error is recorded in store
    }
    return this.store.data.byEventId[id];
  }

}

const model = new EventDetailModel();
export default model;