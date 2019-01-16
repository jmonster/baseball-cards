import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  tagName: 'a',
  attributeBindings: ['href', 'target'],
  href: alias('deal.url'),
  target: '_blank',

  isExpired: alias('deal.isExpired'),

  classNames: ['deal-list-item', 'db', 'link', 'flex', 'items-start', 'bb b--silver'],
  classNameBindings: ['isExpired:expired'],

  standardImage: alias('deal.standardImage')
});
