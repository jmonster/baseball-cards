import Controller from '@ember/controller';
import { computed }  from '@ember/object';
import { inject } from '@ember/service';
import { A } from '@ember/array';

export default Controller.extend({
  store: inject(),
  products: computed(function() {
    return this.store.findAll('product');
  }),
  selectedProducts: A()
});
