import Controller from '@ember/controller';
import { computed }  from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),
  thingsToFilterOn: computed(async function() {
    let products = await this.store.findAll('product');
    return products;
  })
});
