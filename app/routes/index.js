import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    page: { refreshModel: true },
    filter: { refreshModel: true }
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.send('enteredRoute');
  },
  model(params) {
    return this.store.query('question', params);
  }
});
