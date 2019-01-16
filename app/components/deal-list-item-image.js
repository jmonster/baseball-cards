import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  tagName: 'img',
  classNames: ['deal-list-item-image'],
  attributeBindings: ['src'],
  src: alias('url')
});
