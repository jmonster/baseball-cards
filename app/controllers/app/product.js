import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  classNames: ['flex flex-column'],
  product: alias('model.product')
});
