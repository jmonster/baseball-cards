import Service from '@ember/service';
import Deal from 'dealzilla/models/deal';
import recentDealsQuery from 'dealzilla/gql/queries/recent-deals.graphql';
import { inject as service} from '@ember/service';
import { computed }  from '@ember/object';
import { task } from 'ember-concurrency';

export default Service.extend({
  apollo: service(),

  deals: computed(async function() {
    const { deals } = await this.get('apollo').watchQuery({ query: recentDealsQuery });
    return deals.map((content) => Deal.create({ content }));
  }),

  refreshDeals: task(function * () {
    let { deals } = yield this.get('apollo').watchQuery({ query: recentDealsQuery });
    const oldDeals = yield this.deals;

    oldDeals.clear();
    oldDeals.addObjects(deals.map((content) =>  Deal.create({ content })));
  })
});
