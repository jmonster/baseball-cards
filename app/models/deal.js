import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Product from 'dealzilla/models/product';

export default ObjectProxy.extend({

  product: computed('content.product', function() {
    return Product.create({ content: this.content.product });
  }),

  savings: computed('price', 'product.msrp', function() {
    const delta = this.get('price') / this.get('product.msrp');
    const inverse = 1 - delta;
    // recall that price is in cents; no need to divide by 100
    return Math.abs(Math.round(inverse));
  }),

  isExpired: computed(function() {
    return !!this.content.expiredAt;
  }),

  url: alias('product.url'),
  thumbnail: alias('product.thumbnail'),
  standardImage: alias('product.standardImage'),
  primaryImage: alias('product.primaryImage')
});
