import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
  location: config.locationType,
  headData: service(),
  rootURL: config.rootURL,

  setTitle(title) {
    this.get('headData').set('title', title);
  }
});

Router.map(function() {
  this.route('app', { path: '/' }, function(){
    this.route('deals');
    this.route('swiper');
    this.route('product', { path: '/p/:product_id'});
  });
});

export default Router;
