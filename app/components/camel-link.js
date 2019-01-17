import ExternalLinkComponent from './external-link';
import { computed } from '@ember/object';

export default ExternalLinkComponent.extend({
  href: computed('product.asin', function() {
    return `https://camelcamelcamel.com//product/${this.get('product.asin')}`;
  })
});
