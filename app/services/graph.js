import Service from '@ember/service';
// import Deal from 'dealzilla/models/deal';
// import recentDealsQuery from 'dealzilla/gql/queries/recent-deals.graphql';
import { inject as service} from '@ember/service';
// import { task } from 'ember-concurrency';

export default Service.extend({
  apollo: service(),

  init() {
    this._super(...arguments);
    // this.refreshDeals.perform();
  },

  // refreshDeals: task(function * () {
  //   let { deals } = yield this.get('apollo').watchQuery({ query: recentDealsQuery });
  //   this.set('deals', deals.map((content) =>  Deal.create({ content })));
  // })
});
