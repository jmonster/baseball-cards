import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';
import { inject } from '@ember/service';

export default ToriiFirebaseAdapter.extend({
  store: inject(),

  open(authorization) {
    const id = authorization.uid;
    const name = authorization.displayName;
    const email = authorization.email;
    const store = this.get('store');

    return store
      .find('user', id)
      .then((currentUser) => { return { currentUser }})
      .catch((/*err*/) => {
        const currentUser = store.createRecord('user', { id, name, email });

        return currentUser.save().then(() => { return { currentUser }; });
      });
  },

  close() {
    this.get('store').unloadAll('user');

    return this._super(...arguments);
  }
});
