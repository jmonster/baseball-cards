import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('app', { path: '/' }, function(){
    this.route('deals');
    this.route('swiper');
  });
  this.route('desktop')
});

export default Router;
