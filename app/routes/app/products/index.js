import Route from '@ember/routing/route'
import { inject } from '@ember/service';

export default Route.extend({
  store: inject(),

  async setupController(controller) {
    const all = await this.store.findAll('product');

    if (controller.selectedProductIds) {
      const ids = JSON.parse(controller.selectedProductIds);
      const selectedProducts = ids.map((id) => all.findBy('id', id));

      controller.set('products', all);
      controller.set('selectedProducts', selectedProducts);
    } else {
      controller.set('products', all);
    }
  }
});
