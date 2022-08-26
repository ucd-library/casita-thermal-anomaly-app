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
   * @description Fetch data with EventsService
   * @returns {Promise}
   */
   async get() {
    // get current state
    try {
      // call the service / api, this is more of a search
      await this.service.get();
    } catch (error) {
      // error is recorded in store
    }
    return this.store.data;
  }

}

const model = new EventsModel();
export default model;