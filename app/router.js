import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');
  this.route('register');
  this.route('create-question', { path: 'ask' });
  this.route('edit-question', { path: 'edit-question/:id' });
  this.route('question', { path: ':slug' });
});

export default Router;
