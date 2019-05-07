import Route from '@ember/routing/route'

export default Route.extend({
  title(tokens) {
    return `🦖 ${tokens.join('|')}`;
  },

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
