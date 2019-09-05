import Route from '@ember/routing/route'
import { inject } from '@ember/service';

export default Route.extend({
  queryParams: ['selectedProducts'],

  // session: inject(),
  store: inject(),

  // title(tokens) {
  //   return `⬐ ${tokens.join('|')}`;
  // }
  model({ id }) {
    return this.store.find('product', id);
  }
});
