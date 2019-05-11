import { readOnly } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  tagName: '',

  graph: service(),
  deals: readOnly('graph.deals'),
  product: readOnly('model')
});
