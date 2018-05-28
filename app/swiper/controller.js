import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  allTherapists: computed(function() {
    return ['Zoidberg', 'Nick', 'Herbert']
  }),

  paginatedTherapists: computed('allTherapists.[]', function() {
    return this.get('allTherapists').slice(0,1);
  }),

  actions: {
    removeCard(/*component*/) {
      this.get('allTherapists').shiftObject();
    },

    reset() {
      this.set('allTherapists', ['Zoidberg', 'Nick', 'Herbert']);
    }
  }
});
