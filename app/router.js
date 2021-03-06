import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('welcome');

  this.authenticatedRoute('app', { path: '/' }, function() {
    this.route('bio');
    this.route('lists', function() {
      this.route('new');
      this.route('details', { path: '/:id' });
    });
    this.route('products', function() {
      this.route('details', { path: '/:id' });
    });
  });
});

export default Router;
