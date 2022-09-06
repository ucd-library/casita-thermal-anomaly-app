import {AppStateModel} from '@ucd-lib/cork-app-state';
import AppStateStore from '../stores/AppStateStore.js';

class AppStateModelImpl extends AppStateModel {

  constructor() {
    super();

    this.firstLoad = true;
    this.defaultPage = 'events';
    this.store = AppStateStore;
  }

  /**
   * @method show404Page
   * @description set the app state to the virtual 404 page
   * Might use the state object later for better description...
   * 
   * @param {Object} state Optionally pass in state object with error.
   */
  show404Page(state) {
    this.set({page: '404'});
  }

  set(update) {
    if (update.location && !update.page) {
      if( this.firstLoad && this.store.data.page === '404' ) {
        update.page = '404';
      } else {
        update.page = update.location.path ? update.location.path[0] || this.defaultPage : this.defaultPage;
      }
      this.firstLoad = false;
    }
    
    let res = super.set(update);

    return res;
  }

}

export default new AppStateModelImpl();
