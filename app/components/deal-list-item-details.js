import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['flex-auto', 'ml1'],
  product: alias('deal.product')
});
