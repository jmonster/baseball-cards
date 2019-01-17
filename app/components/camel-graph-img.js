import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['referrerpolicy', 'src'],
  referrerpolicy: 'no-referrer',
  src: computed('product.asin', 'width', 'height', function() {
    const width = this.get('width');
    const height = this.get('height');
    return `https://charts.camelcamelcamel.com/us/${this.get('product.asin')}/amazon.png?w=${width}&h=${height}&legend=0&lang=en`;
  }),

  width: computed(function() {
    return this.parentView.element.offsetWidth;
  }),

  height: computed(function() {
    return this.parentView.element.offsetHeight;
  }),
});
