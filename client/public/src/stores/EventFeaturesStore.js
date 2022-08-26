import {BaseStore} from '@ucd-lib/cork-app-utils';

class EventFeaturesStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      byEventId: {},
    };

    this.events = {
      UPDATE_EVENT_FEATURES: 'update-event-features'
    }
  }

  // promise is the request promise
  setEventFeaturesLoading(id, request) {
    this._updateEventFeatures({state: this.STATE.LOADING, id, request });
  }

  setEventFeaturesLoaded(id, payload) {
    this._updateEventFeatures({state: this.STATE.LOADED, id, payload });
  }

  setEventFeaturesError(err) {
    this._updateEventFeatures({state: this.STATE.ERROR, error: err});
  }
  
  // set data state and fire event if LOADED
  _updateEventFeatures(data) {
    // new state is same as old state, just quit out
    if( !this.stateChanged(this.data, data) ) return;

    this.data.byEventId[data.id] = data;
    if (data && data.payload) {
      this.emit(this.events.UPDATE_EVENT_FEATURES, this.data);
    }
  }

}

const store = new EventFeaturesStore();
export default store;