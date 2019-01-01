import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  tagName: 'a',
  attributeBindings: ['href', 'target'],
  href: alias('deal.url'),
  target: '_blank',

  classNames: ['deal-list-item', 'db', 'mh2', 'b--silver', 'bb', 'link', 'blue', 'flex', 'items-start'],

  thumbnail: alias('deal.thumbnail')
});
