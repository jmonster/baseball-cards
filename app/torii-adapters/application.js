import EmberObject from '@ember/object';
import { inject } from '@ember/service';
import { isEmpty }  from '@ember/utils';

export default EmberObject.extend({
  store: inject(),
  router: inject(),

  async fetch() {
    let googleToken = localStorage.getItem('google-access-token');

    if (isEmpty(googleToken)) {
      throw new Error('No google-access-token in storage');
    }

    const user = await this.store.queryRecord('user', {});
    user.accessToken = googleToken;

    return { user };
  },

  open: async function(authentication){
    var { authorizationToken: { access_token } } = authentication;
    localStorage.setItem('google-access-token', access_token);

    const user = await this.store.queryRecord('user', {});
    user.accessToken = access_token;

    return { user };
  },

  async close() {
    localStorage.removeItem('google-access-token');
    this.router.transitionTo('welcome');
  }
});
