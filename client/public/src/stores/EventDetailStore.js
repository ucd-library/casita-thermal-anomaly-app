import {BaseStore} from '@ucd-lib/cork-app-utils';

class EventDetailStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      byEventId: {},
    };

    this.events = {
      UPDATE_EVENT_DETAIL: 'update-event-detail'
    }
  }

  // promise is the request promise
  setEventDetailLoading(id, request) {
    this._updateEventDetail({state: this.STATE.LOADING, id, request });
  }

  setEventDetailLoaded(id, payload) {
    this._updateEventDetail({state: this.STATE.LOADED, id, payload });
  }

  setEventDetailError(err) {
    this._updateEventDetail({state: this.STATE.ERROR, error: err});
  }
  
  // set data state and fire event if LOADED
  _updateEventDetail(data) {
    // new state is same as old state, just quit out
    if( !this.stateChanged(this.data, data) ) return;

    this.data.byEventId[data.id] = data;
    if (data && data.payload) {
      this.emit(this.events.UPDATE_EVENT_DETAIL, data);
    }
  }

}

const store = new EventDetailStore();
export default store;