import Component from '@ember/component';

export default Component.extend({
  tagName: 'a',
  classNames: ['f3 pv4 hk-button'],
  attributeBindings: ['href', 'referrerpolicy', 'target'],
  target: '_blank',
  referrerpolicy: 'no-referrer'
});
