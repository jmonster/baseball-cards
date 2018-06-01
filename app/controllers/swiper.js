import Controller from '@ember/controller';
import { computed } from '@ember/object';

const defaultCards = [
  {
    imageUrl: '/assets/images/jialee.jpg',
    firstName: 'jialee',
    lastName: 'chau',
    title: 'growth hacker'
  },
  {
    imageUrl: '/assets/images/dohnny.jpg',
    firstName: 'my name is',
    lastName: 'dohhny',
    title: 'lead thinkerer'
  },
  {
    imageUrl: '/assets/images/johnny.jpg',
    firstName: 'johnny',
    lastName: 'domino',
    title: 'bit flipper'
  },
  {
    imageUrl: '/assets/images/jayleisure.jpg',
    firstName: 'jay',
    lastName: 'leisure',
    title: 'hubber'
  },
  {
    imageUrl: '/assets/images/colorfuljohnny.jpg',
    firstName: 'j',
    lastName: 'monster',
    title: 'nomnomnomnomnom'
  },
  {
    imageUrl: '/assets/images/mrsparkle.jpg',
    firstName: 'mr',
    lastName: 'sparkle',
    title: 'I\'m disrespectful to dirt !!'
  },
  {
    imageUrl: '/assets/images/babyjohnny.jpg',
    firstName: 'baby',
    lastName: 'johnny',
    title: 'looks cute'
  }
];

export default Controller.extend({
  allTherapists: computed(function() {
    return JSON.parse(JSON.stringify(defaultCards));
  }),

  paginatedTherapists: computed('allTherapists.[]', function() {
    return this.get('allTherapists').slice(0,1);
  }),

  actions: {
    onLeftTap() {
      this.set('showCardDetails', false);
    },

    onRightTap() {
      this.set('showCardDetails', true);
    },

    removeCard(/*component*/) {
      this.get('allTherapists').shiftObject();
      this.set('showCardDetails', false);
    },

    reset() {
      const copy = JSON.parse(JSON.stringify(defaultCards));
      this.set('allTherapists', copy);
    }
  }
});
