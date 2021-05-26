import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import $ from 'jquery';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('question', params.slug);
  },
  setupController(controller, model) {
    this._super(controller, model);

    const questionAdapter = this.store.adapterFor('questions');

    $.ajax({
      type: 'PATCH',
      url: `${questionAdapter.urlForCreateRecord('question')}/${model.get('id')}/viewed`
    });
  }
});
