import {BaseStore} from '@ucd-lib/cork-app-utils';

class EventFeaturesStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      byEventIdTimestamp: {},
    };

    this.events = {
      UPDATE_EVENT_FEATURES: 'update-event-features'
    }
  }

  // promise is the request promise
  setEventFeaturesLoading(id, timestamp, request) {
    this._updateEventFeatures({state: this.STATE.LOADING, id, timestamp,request });
  }

  setEventFeaturesLoaded(id, timestamp, payload) {
    this._updateEventFeatures({state: this.STATE.LOADED, id, timestamp, payload });
  }

  setEventFeaturesError(id, timestamp, err) {
    this._updateEventFeatures({state: this.STATE.ERROR, id, timestamp, error: err});
  }
  
  // set data state and fire event if LOADED
  _updateEventFeatures(data) {
    // new state is same as old state, just quit out
    if( !this.stateChanged(this.data, data) ) return;

    this.data.byEventIdTimestamp[data.id+'/'+data.timestamp] = data;
    if (data && data.payload) {
      this.emit(this.events.UPDATE_EVENT_FEATURES, this.data);
    }
  }

}

const store = new EventFeaturesStore();
export default store;