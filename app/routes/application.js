import { on } from '@ember/object/evented';
import Route from '@ember/routing/route'

export default Route.extend({
  removeInitialLoading: on('activate', function() {
    if (document) {
      const initalLoadingIndicator = document.getElementById('initial-loading-indicator');
      initalLoadingIndicator && initalLoadingIndicator.remove();
    }
  }),

  actions: {
    signIn(/*provider*/) {

    },

    signOut() {

    },

    hopToAmazon(product) {
      window.open(product.get('url'), '_blank');
    },

    hopToFakeSpot(product) {
      window.open(product.get('fakespotUrl'), '_blank');
    },

    hopToCamelCamelCamel(product) {
      window.open(product.get('camelcamelcamelUrl'), '_blank');
    }
  }
});
