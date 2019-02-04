import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onDealListItemClick(deal) {
      this.transitionToRoute('app.product', deal.get('product.id'));
    }
  }
});
