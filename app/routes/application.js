import { on } from '@ember/object/evented';
import { inject } from '@ember/service';
import Route from '@ember/routing/route'
import RSVP from 'rsvp';

export default Route.extend({
  session: inject(),

  removeInitialLoading: on('activate', function() {
    if (document) {
      const initalLoadingIndicator = document.getElementById('initial-loading-indicator');
      initalLoadingIndicator && initalLoadingIndicator.remove();
    }
  }),

  configureAnonymousUser() {
    const session = this.get('session');

    if (!session.get('isAuthenticated')) {
      return session.open('firebase', { provider: 'anonymous' }).then(({ currentUser }) => {
        currentUser.set('isAnonymous', true);
        currentUser.save().then(() => {
          this.refresh();
        });
      });
    }
  },

  model() {
    return RSVP.hash({
      therapists: this.store.findAll('therapist'),
      tags: this.store.findAll('tag'),
      questions: this.store.findAll('question')
    });
  },

  beforeModel() {
    const session = this.get('session');
    const fetchSession = session.fetch().catch(function() {});
    const configureAnonymousUser = this.get('configureAnonymousUser').bind(this);

    // initial loading
    const initalLoadingIndicator = document.getElementById('initial-loading-indicator');

    if (!initalLoadingIndicator) {
      return; // abort
    }

    return fetchSession.then(() => {
      if (!session.get('isAuthenticated')) {
        return configureAnonymousUser();
      }
    });
  },

  actions: {
    signIn(provider) {
      this.get('session').open('firebase', { provider }).then(() => { this.transitionTo('/'); });
    },

    signOut() {
      this.get('session').close()
        .then(() => { this.transitionTo('/'); })
        .catch((/*err*/) => { window.location.assign('/'); });
    }
  }
});
