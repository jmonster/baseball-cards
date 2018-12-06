import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  dataService: inject(),

  deals: computed(function(){
    return this.get('dataService.likedDeals');
  }),
});
