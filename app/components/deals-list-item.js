import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: alias('deal.url'),
  classNames: ['deal-list-item db mh2 b--silver bb link blue flex items-center'],
  thumbnail: alias('deal.primaryImage')
});
