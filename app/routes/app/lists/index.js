import Route from '@ember/routing/route'
import { inject } from '@ember/service';

export default Route.extend({
  // session: inject(),
  store: inject(),

  // title(tokens) {
  //   return `⬐ ${tokens.join('|')}`;
  // }
  model({ id }) {
    return this.store.find('list', id);
  }
});
