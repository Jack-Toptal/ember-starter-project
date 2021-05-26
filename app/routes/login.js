import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),
  actions: {
    login(email, password) {
      this.get('session')
        .authenticate('authenticator:oauth2', email, password)
        .then(() => this.transitionTo('index'))
        .catch(() => {
          this.controller.set('errorMessage', 'Invalid login.');
        });
    }
  }
});
