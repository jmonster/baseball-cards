import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { readOnly }  from '@ember/object/computed';
import { inject as service} from '@ember/service';

export default Controller.extend({
  graph: service(),
  deals: readOnly('graph.deals'),

  // dynamically change the layout of the main container
  justify: computed('currentRouteName', function () {
    return this.currentRouteName === 'app.swiper' ? 'justify-center' : 'justify-start';
  }),

  thingsToFilterOn: computed('deals.[]', async function () {
    return (await this.deals).map((deal) => deal.get('product'));
  })
});
