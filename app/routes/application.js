import Route from '@ember/routing/route'
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),
  store: inject(),

  title(tokens) {
    return `💡🛍 ${tokens.join('|')}`;
  },

  actions: {
    signIn(provider) {
      this.get('session').open(provider).then(() => {
        this.transitionTo('/');
      });
    },

    signOut() {
      this.get('session').close();
    },

    accessDenied: function() {
      this.transitionTo('welcome');
    },

    hopToAmazon(product) {
      window.open(product.get('url'), '_blank');
    }
  }
});
