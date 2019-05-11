import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import { inject as service} from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default Route.extend(RouteQueryManager, {
  browser: service(),
  graph: service(),

  likedDealIds: storageFor('deal-likes'),
  dislikedDealIds: storageFor('deal-dislikes'),

  // this function assumes that the deals collection is populated
  // and contains the entirety of active deals
  //
  // a better approach may be to track a list of expired deals
  // with a cursor (expiredAt timestamp) tracking where the client last
  // purged; downloads the list of expired deals that expired after that
  async clearLocalLikedLikedDislikedCollections() {
    // const deals = await this.graph.deals;
    // const dealIds = new Set(deals.map((d) => d.get('id')));

    // const inactiveLikedDealIds = this.likedDealIds.filter((id) => !dealIds.has(id));
    // const inactiveDislikedDealIds = this.dislikedDealIds.filter((id) => !dealIds.has(id));

    // this.likedDealIds.removeObjects(inactiveLikedDealIds);
    // this.dislikedDealIds.removeObjects(inactiveDislikedDealIds);
  },

  async activate() {
    this.clearLocalLikedLikedDislikedCollections();
  },
});
