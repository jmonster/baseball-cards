import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  dataService: inject(),

  likedDeals: computed(function(){
    return this.get('dataService.likedDeals');
  }),

  dislikedDeals: computed(function(){
    return this.get('dataService.dislikedDeals');
  }),
});
