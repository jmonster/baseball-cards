import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import { inject as service} from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default Route.extend(RouteQueryManager, {
  browser: service(),
  graph: service(),

  likedDealIds: storageFor('deal-likes'),
  dislikedDealIds: storageFor('deal-dislikes'),

  async afterModel() {
    // this.graph.refreshDeals.perform();
    // deals that have expired <= 3 days ago
    // const { deals } = (await this.graph.deals);

    // console.log('deals: ', (await this.graph.deals));
    // cleanup our localstorage set of liked/disliked ids
    // to remove anything not part of `deals`
    // TODO move this logic to the deal record?
    // ---- and do it anytime a deal becomes expired?

    // const dealIds = new Set((await this.graph.deals).map((d) => d.id));

    // const inactiveLikedDealIds = this.likedDealIds.filter((id) => !dealIds.has(id));
    // const inactiveDislikedDealIds = this.dislikedDealIds.filter((id) => !dealIds.has(id));

    // debugger;
    // this.likedDealIds.removeObjects(inactiveLikedDealIds);
    // this.dislikedDealIds.removeObjects(inactiveDislikedDealIds);
  },
});
