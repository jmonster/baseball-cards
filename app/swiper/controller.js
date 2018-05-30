import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  allTherapists: computed(function() {
    return [
      'https://vignette.wikia.nocookie.net/simpsons/images/b/bc/Dr._Monroe%27s_Family_Therapy_Center_%28There%27s_No_Disgrace_Like_Home%29.png/revision/latest?cb=20130512023251', //monroe
      'https://vignette.wikia.nocookie.net/en.futurama/images/4/45/Dr._John_A._Zoidberg.png/revision/latest?cb=20101014052403', // zoidberg
      'https://pbs.twimg.com/profile_images/618151052664303616/kemCYDyX_400x400.png', // nick
      'http://i0.kym-cdn.com/entries/icons/original/000/021/264/yS2EwcX.jpg' // hibbert
    ]
  }),

  paginatedTherapists: computed('allTherapists.[]', function() {
    return this.get('allTherapists').slice(0,1);
  }),

  actions: {
    removeCard(/*component*/) {
      this.get('allTherapists').shiftObject();
    },

    reset() {
      this.set('allTherapists', [
        'https://vignette.wikia.nocookie.net/simpsons/images/b/bc/Dr._Monroe%27s_Family_Therapy_Center_%28There%27s_No_Disgrace_Like_Home%29.png/revision/latest?cb=20130512023251', //monroe
        'https://vignette.wikia.nocookie.net/en.futurama/images/4/45/Dr._John_A._Zoidberg.png/revision/latest?cb=20101014052403', // zoidberg
        'https://pbs.twimg.com/profile_images/618151052664303616/kemCYDyX_400x400.png', // nick
        'http://i0.kym-cdn.com/entries/icons/original/000/021/264/yS2EwcX.jpg' // hibbert
      ]);
    }
  }
});
