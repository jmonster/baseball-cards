import ExternalLinkComponent from './external-link';
import { computed } from '@ember/object';

export default ExternalLinkComponent.extend({
  href: computed('product.asin', function() {
    return `https://www.fakespot.com/analyze?url=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fproduct%2F${this.get('product.asin')}`;
  })
});
