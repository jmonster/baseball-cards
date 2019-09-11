import EmberObject from '@ember/object';
import { inject } from '@ember/service';
import { isEmpty }  from '@ember/utils';
import fetch from 'fetch';

export default EmberObject.extend({
  store: inject(),
  router: inject(),

  async fetch() {
    let googleToken = localStorage.getItem('google-access-token');

    if (isEmpty(googleToken)) {
      throw new Error('No google-access-token in storage');
    }

    const user = await this.store.queryRecord('user', {});
    const { emailAddresses, names, photos } = await fetchPropertiesFromGoogle(googleToken);

    user.setProperties({
      accessToken: googleToken,
      name: names.firstObject.displayName,
      email: emailAddresses.firstObject.value,
      avatar: photos.firstObject.url
    });

    return { user };
  },

  async open({ access_token }){
    localStorage.setItem('google-access-token', access_token);

    const user = await this.store.queryRecord('user', {});
    const { emailAddresses, names, photos } = await fetchPropertiesFromGoogle(access_token);

    user.accessToken = access_token;
    user.setProperties({
      accessToken: access_token,
      name: names.firstObject.displayName,
      email: emailAddresses.firstObject.value,
      avatar: photos.firstObject.url
    });

    // user.save();

    return { user };
  },

  async close() {
    localStorage.removeItem('google-access-token');
    this.router.transitionTo('welcome');
  }
});

async function fetchPropertiesFromGoogle(access_token) {
  const response = await fetch(
    'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos&key=AIzaSyChgD1fi2lvmc8GBnESkDXlCRlvNeDwYbc',
    { headers: { 'Authorization': `Bearer ${access_token}` } }
  );

  return response.json();
}
