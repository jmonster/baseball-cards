import Route from '@ember/routing/route'
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),

  title(tokens) {
    return `⬐ ${tokens.join('|')}`;
  },

  actions: {
    signIn(provider) {
      this.get('session').open(provider).then(function() {
        debugger;
      }, function(error){
        debugger;
      });
    },

    signOut() {

    },

    hopToAmazon(product) {
      window.open(product.get('url'), '_blank');
    }
  }
});
