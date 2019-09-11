import Route from '@ember/routing/route'
import { inject } from '@ember/service';
import { hash }  from 'rsvp';

export default Route.extend({
  // session: inject(),
  store: inject(),

  // title(tokens) {
  //   return `⬐ ${tokens.join('|')}`;
  // }
  async model() {
    return hash({
      user: this.store.queryRecord('user', {}),
      lists: this.store.findAll('list')
    });
  }
});
