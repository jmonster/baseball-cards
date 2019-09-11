import Route from '@ember/routing/route'
import { inject } from '@ember/service';
import { hash }  from 'rsvp';

export default Route.extend({
  store: inject(),

  titleToken: 'Lists',

  async model() {
    return hash({
      lists: this.store.findAll('list')
    });
  }
});
