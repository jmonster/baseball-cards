import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject } from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default Route.extend({
  browser: inject(),

  likedDealIds: storageFor('deal-likes'),
  dislikedDealIds: storageFor('deal-dislikes'),

  model() {
    // deals that have expired <= 3 days ago
    const deals = this.store.query('deal', {
      orderBy: 'expiredAt',
      startAt: Date.now() - (3 * 8.64e+7)
    });
    const tags = this.store.findAll('tag');

    // cleanup our localstorage set of liked/disliked ids
    // to remove anything not part of `deals`
    // TODO move this logic to the deal record?
    // ---- and do it anytime a deal becomes expired?
    // ---- that way it can happy in-real-time as updates come in from firebase
    deals.then((deals) => {
      const dealIds = new Set(deals.map((d) => d.id));

      const inactiveLikedDealIds = this.likedDealIds.filter((id) => !dealIds.has(id));
      const inactiveDislikedDealIds = this.dislikedDealIds.filter((id) => !dealIds.has(id));

      this.likedDealIds.removeObjects(inactiveLikedDealIds);
      this.dislikedDealIds.removeObjects(inactiveDislikedDealIds);

      // TODO ensure uniqueness
    });

    return RSVP.hash({ deals, tags });
  },
});
