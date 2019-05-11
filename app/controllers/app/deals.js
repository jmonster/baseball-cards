import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';

export default Controller.extend({
  graph: service(),

  deals: alias('graph.deals'),

  actions: {
    onDealListItemClick(deal) {
      this.transitionToRoute('app.product', deal.get('product.id'));
    }
  }
});
