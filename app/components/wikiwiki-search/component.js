import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, empty, gt } from '@ember/object/computed';
import { run } from '@ember/runloop';

// const DEBOUNCE_WAIT = 100; // ms

export default Component.extend({
  classNames: ['wikiwiki-search', 'flex', 'w-100', 'flex-auto', 'flex-column', 'mv2'],
  classNameBindings: ['hasFocus'],

  query: '',
  queryIsEmpty: empty('query'),

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
    const query = this.get('query');
    this.set('searchIsPending', true);
    this.set('showNotFoundMessage', false);

    if (query === '') {
      // show default
      this.set('searchIsPending', false);
      this.set('filteredResults', []);
    } else {

      // filter items
      const matcher = this.get('matcher')(query);
      this.get('items').then((items) => {
        const fuzzyResults = items.filter((result) => matcher.test(result.get('name')));

        let exactResultIndex = -1;
        for (let i = 0; i < fuzzyResults.length; i++) {
          if (fuzzyResults[i].name === query) {
            exactResultIndex = i;
            break;
          }
        }

        if (exactResultIndex >= 0) {
          // move exact result to the top of the list
          const exactResult = fuzzyResults.splice(exactResultIndex, 1)[0];
          fuzzyResults.unshift(exactResult);
        }

        this.set('filteredResults', fuzzyResults);
        this.set('searchIsPending', false);
        this.set('showNotFoundMessage', fuzzyResults.length === 0);
      });
    }
  },

  hasSearchQuery: gt('query.length', 0),
  searchIsPending: false,

  actions: {
    didPressKey() {
      // searchIsPending: true,
      // run.debounce(this, this.recomputeResults, DEBOUNCE_WAIT);
      this.recomputeResults();
    },

    didClickResult() {
      this.set('query', '');
      this.recomputeResults();
    },

    didLoseFocus() {
      // must defer with an ember run runloop
      // or else didClickResult won't properly trigger
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
