import DS from 'ember-data';
import { computed } from '@ember/object';
import ENV from 'tipdrop/config/environment';

export default DS.Model.extend({
  name: DS.attr(),
  asin: DS.attr(),
  thumbnail: DS.attr(),

  // init({ content: { msrp }}) {
  //   this._super(...arguments);

  //   // convert cents to dollars+cents (as a decimal)
  //   this.set('msrp', msrp /= Math.pow(10, 2));
  // },

  url: computed('asin', function() {
    return `https://www.amazon.com/gp/product/${this.get('asin')}/?tag=${ENV.amazonAffliateTag}`
  }),

  // thumbnail: computed('asin', function() {
  //   return `https://images-na.ssl-images-amazon.com/images/P/${this.get('asin')}.01.THUMBZZZ.jpg`;
  // }),

  standardImage: computed('asin', function() {
    return `https://images-na.ssl-images-amazon.com/images/P/${this.get('asin')}.jpg`;
  }),

  primaryImage: computed('asin', function() {
    return `https://images-na.ssl-images-amazon.com/images/P/${this.get('asin')}.01.LZZZZZZZ.jpg`;
  })
});
