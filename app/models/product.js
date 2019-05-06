import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';
import ENV from 'dealzilla/config/environment';

export default ObjectProxy.extend({
  url: computed('asin', function() {
    return `https://www.amazon.com/gp/product/${this.get('asin')}/?tag=${ENV.amazonAffliateTag}`
  }),

  thumbnail: computed('asin', function() {
    return `https://images-na.ssl-images-amazon.com/images/P/${this.get('asin')}.01.THUMBZZZ.jpg`;
  }),

  standardImage: computed('asin', function() {
    return `https://images-na.ssl-images-amazon.com/images/P/${this.get('asin')}.jpg`;
  }),

  primaryImage: computed('asin', function() {
    return `https://images-na.ssl-images-amazon.com/images/P/${this.get('asin')}.01.LZZZZZZZ.jpg`;
  }),

  fakespotUrl: computed('asin', function() {
    return `https://www.fakespot.com/analyze?url=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fproduct%2F${this.get('asin')}`;
  }),

  camelcamelcamelUrl: computed('asin', function() {
    return `https://camelcamelcamel.com//product/${this.get('asin')}`
  })
});
