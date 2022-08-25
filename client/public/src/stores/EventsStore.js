import {BaseStore} from '@ucd-lib/cork-app-utils';

class EventsStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      byEventId: {},
    };

    this.events = {
      UPDATE_EVENTS: 'update-events'
    }
  }

  // promise is the request promise
  setEventsLoading(id, request) {
    this._updateEvents({state: this.STATE.LOADING, id, request });
  }

  setEventsLoaded(id, payload) {
    this._updateEvents({state: this.STATE.LOADED, id, payload });
  }

  setEventsError(err) {
    this._updateEvents({state: this.STATE.ERROR, error: err});
  }
  
  // set data state and fire event if LOADED
  _updateEvents(data) {
    // new state is same as old state, just quit out
    if( !this.stateChanged(this.data, data) ) return;
    
    debugger;
    // TODO not sure on byEventId..
    // would we save each event and loop over them before deciding to update data again?

    this.data.byEventId[data.id] = data;
    if (data && data.payload) {
      this.emit(this.events.UPDATE_EVENTS, this.data);
    }
  }

}

const store = new EventsStore();
export default store;