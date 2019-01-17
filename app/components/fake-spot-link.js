import ExternalLinkComponent from './external-link';
import { alias } from '@ember/object/computed';

export default ExternalLinkComponent.extend({
  href: alias('product.fakespotUrl')
});
