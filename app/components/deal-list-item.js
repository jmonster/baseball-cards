import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  // turns this component into a link to Amazon™
  // but currently passing in a click handler
  // to transitionToRoute(product)
  //
  // tagName: 'a',
  // attributeBindings: ['href', 'target'],
  // href: alias('deal.url'),
  // target: '_blank',
  // click() {
  //   this.transitionToRoute('product', this.get('deal.product.id'));
  // },

  isExpired: alias('deal.isExpired'),

  classNames: ['deal-list-item', 'link', 'flex flex-auto', 'items-start', 'ma1'],
  classNameBindings: ['isExpired:expired'],

  standardImage: alias('deal.standardImage')
});
