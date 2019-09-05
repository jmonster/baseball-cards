import Controller from '@ember/controller';
import Products from 'tipdrop/data/products';
import { computed }  from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),
  thingsToFilterOn: computed(async function() {
    let products = await this.store.findAll('product');
    if (products.length === 0) {
      Products.forEach((p) => this.store.createRecord('product', p).save());
      products = this.store.findAll('product');
    }

    return products;
  })
});
