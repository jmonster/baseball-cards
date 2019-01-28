import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['pa1'],
  product: alias('deal.product')
});
