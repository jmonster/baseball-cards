import Component from '@ember/component';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import { computed } from '@ember/object';

export default Component.extend(TransitionMixin, {
  classNames: ['question-card flex flex-column absolute top-0 bottom-0 right-0 left-0 pa2'],

  transitionClass: computed(function() {
    return this.get('enableTransition') && 'wizard';
  })
});