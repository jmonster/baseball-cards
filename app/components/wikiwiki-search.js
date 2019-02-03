import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, empty, gt } from '@ember/object/computed';
import { run } from '@ember/runloop';

const DEBOUNCE_WAIT = 150; // ms

export default Component.extend({
  classNames: ['wikiwiki-search', 'flex', 'flex-auto', 'flex-column', 'overflow-container'],
  classNameBindings: ['hasFocus'],

  query: '',
  queryIsEmpty: empty('query'),
  caseInsensitiveQuery : computed('query', function() {
    return this.get('query').toLowerCase();
  }),

  hasFocus: false,
  componentIsActive: alias('hasFocus'),

  // a collection of objects with a `name` key
  // from which we will filter/search on
  items: computed(function() {
    throw new Error("You must provide an `items` property to the _wikiwiki-search_ component.")
  }),

  matcher: function(query) {
    const escapedQuery = query.replace(/[^a-z0-9-]+/i, ''); // strip invalid chars
    const search = escapedQuery.split('').join('.*');
    return new RegExp(search, 'i');
  },

  recomputeResults() {
    const query = this.caseInsensitiveQuery;
    this.set('searchIsPending', true);
    this.set('showNotFoundMessage', false);

    if (query === '') {
      // show default
      this.set('searchIsPending', false);
      this.set('filteredResults', []);
    } else {

      // filter items
      // const matcher = this.matcher(query);
      this.items.then((items) => {
        const fuzzyResults = items.filter((product) => {
          return product.get('title').toLowerCase().includes(query);
        });

        this.set('filteredResults', fuzzyResults);
        this.set('searchIsPending', false);
        this.set('showNotFoundMessage', fuzzyResults.length === 0);
      });
    }
  },

  hasSearchQuery: gt('query.length', 0),
  searchIsPending: false,
  notFoundGif: computed(function() {
    const notFoundGifs = [
      'https://media2.giphy.com/media/v0WTZglGVd4bu/giphy.gif',
      'https://media1.tenor.com/images/99d772f27c3537355d4dc1e49bd22e4b/tenor.gif'
    ];

    const randomIndex = Math.floor(Math.random() * notFoundGifs.length);
    return notFoundGifs[randomIndex];
  }),

  actions: {
    didPressKey() {
      run.debounce(this, this.recomputeResults, DEBOUNCE_WAIT);
    },

    didLoseFocus() {
      // must defer with an ember run runloop
      // or else tapping on a result won't behave properly
      run.later(() => {
        this.set('hasFocus', false);
        this.set('query', '');
        this.recomputeResults();
      }, 100);
    },

    didFocusIn() {
      this.set('hasFocus', true);
    }
  }
});
