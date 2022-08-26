import {BaseStore} from '@ucd-lib/cork-app-utils';

class EventsStore extends BaseStore {

  constructor() {
    super();

    this.data = {};

    this.events = {
      UPDATE_EVENTS: 'update-events'
    }
  }

  // promise is the request promise
  setEventsLoading(request) {
    this._updateEvents({state: this.STATE.LOADING, request });
  }

  setEventsLoaded(payload) {
    this._updateEvents({state: this.STATE.LOADED, payload });
  }

  setEventsError(err) {
    this._updateEvents({state: this.STATE.ERROR, error: err});
  }
  
  // set data state and fire event if LOADED
  _updateEvents(data) {
    // new state is same as old state, just quit out
    if( !this.stateChanged(this.data, data) ) return;

    this.data = data;
    if (data && data.payload) {
      this.emit(this.events.UPDATE_EVENTS, this.data);
    }
  }

}

const store = new EventsStore();
export default store;