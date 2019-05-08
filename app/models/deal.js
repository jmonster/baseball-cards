import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Product from 'dealzilla/models/product';

export default ObjectProxy.extend({
  init({ content: { price }}) {
    this._super(...arguments);

    // convert cents to dollars+cents (as a decimal)
    this.set('price', price /= Math.pow(10, 2));
  },

  product: computed('content.product', function() {
    return Product.create({ content: this.content.product });
  }),

  savings: computed('price', 'product.msrp', function() {
    const price = this.get('price');
    const msrp = this.get('product.msrp');
    const delta = price / msrp * 100;
    const percentage = Math.round(delta);

    return price > msrp ? -percentage : percentage;
  }),

  isExpired: computed(function() {
    return !!this.content.expiredAt;
  }),

  url: alias('product.url'),
  thumbnail: alias('product.thumbnail'),
  standardImage: alias('product.standardImage'),
  primaryImage: alias('product.primaryImage')
});
