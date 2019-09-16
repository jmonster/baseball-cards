import EmberObject from '@ember/object';
import { inject } from '@ember/service';
import { isEmpty }  from '@ember/utils';
// import fetch from 'fetch';

export default EmberObject.extend({
  store: inject(),
  router: inject(),

  async fetch() {
    let token = localStorage.getItem('access-token');

    if (isEmpty(token)) {
      throw new Error('No access-token in storage');
    }

    const user = await this.store.queryRecord('user', {});
    return { user };
  },

  async open(){
    const user = await this.store.queryRecord('user', {});

    user.setProperties({
      accessToken: 'asdf-1234',
      name: "Johnny Domino",
      email: "jvdomino@gmail.com",
      avatar: "https://avatars0.githubusercontent.com/u/368767?s=460&v=4"
    });

    user.save();
    localStorage.setItem('access-token', 'wubalubadubdub');

    return { user };
  },

  async close() {
    localStorage.removeItem('access-token');
    this.router.transitionTo('welcome');
  }
});

