import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['deal-list-item-expired', 'flex', 'pa2', 'gray bb b--silver', 'mb1'],
  product: alias('deal.product')
});
