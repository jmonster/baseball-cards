import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import recentDealsQuery from 'dealzilla/gql/queries/recent-deals.graphql';
import { inject } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import Deal from 'dealzilla/models/deal';

export default Route.extend(RouteQueryManager, {
  browser: inject(),

  likedDealIds: storageFor('deal-likes'),
  dislikedDealIds: storageFor('deal-dislikes'),

  async model() {
    // deals that have expired <= 3 days ago
    const { deals } = await this.get('apollo').query({ query: recentDealsQuery });

    // const deals = this.store.query('deal', {
    //   orderBy: 'expiredAt',
    //   startAt: Date.now() - (3 * 8.64e+7)
    // });

    // cleanup our localstorage set of liked/disliked ids
    // to remove anything not part of `deals`
    // TODO move this logic to the deal record?
    // ---- and do it anytime a deal becomes expired?

    // const dealIds = new Set(deals.map((d) => d.id));

    // const inactiveLikedDealIds = this.likedDealIds.filter((id) => { debugger; return !dealIds.has(id) });
    // const inactiveDislikedDealIds = this.dislikedDealIds.filter((id) => !dealIds.has(id));

    // this.likedDealIds.removeObjects(inactiveLikedDealIds);
    // this.dislikedDealIds.removeObjects(inactiveDislikedDealIds);

    // TODO ensure uniqueness

    return deals.map((content) => Deal.create({ content }));
  },
});
