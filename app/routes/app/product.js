import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    return RSVP.hash({
      product: this.store.find('product', params.product_id)
    });
  },
});
