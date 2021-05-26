import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { debounce } from '@ember/runloop';

export default Controller.extend({
  session: inject(),
  queryParams: ['page', 'filter'],
  page: 1,
  filter: '',
  initialSearchValue: '',
  actions: {
    enteredRoute() {
      this.set('initialSearchValue', this.get('filter'));
    },
    filter(query) {
      debounce(this, 'setProperties', {
        filter: query,
        page: 1
      }, 300);
    }
  }
});
