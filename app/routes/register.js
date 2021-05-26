import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),
  model() {
    return this.store.createRecord('user');
  },
  actions: {
    async register() {
      const user = this.controller.model;
      await user.save();
      await this.get('session').authenticate(
        'authenticator:oauth2',
        user.email,
        user.password
      );
      this.transitionTo('index');
    }
  }
});
