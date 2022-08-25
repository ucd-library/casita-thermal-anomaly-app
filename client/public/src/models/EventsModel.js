import {BaseModel} from '@ucd-lib/cork-app-utils';
import EventsService from '../services/EventsService.js';
import EventsStore from '../stores/EventsStore.js';

class EventsModel extends BaseModel {

  constructor() {
    super();

    this.store = EventsStore;
    this.service = EventsService;
      
    this.register('EventsModel');
  }

  /**
   * @method get
   * @description Fetch data with EventsService, might already be cached in store
   * @returns {Promise}
   */
   async get(id) {
    // get current state
    let state = this.store.data.byEventId[id];
    debugger;
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

const model = new EventsModel();
export default model;