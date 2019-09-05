import Controller from '@ember/controller';
import { computed }  from '@ember/object';
import { inject } from '@ember/service';
import { observer }  from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
  queryParams: ['selectedProductIds'],

  store: inject(),
  selectedProducts: A(),

  selectedProductsObserver: observer('selectedProducts.@each.id', function() {
    const asJSON = JSON.stringify(this.selectedProducts.map((t) => t.get('id')));
    this.set('selectedProductIds', asJSON);
  })
});
