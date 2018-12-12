import { on } from '@ember/object/evented';
import { inject } from '@ember/service';
import Route from '@ember/routing/route'

export default Route.extend({
  session: inject(),

  removeInitialLoading: on('activate', function() {
    if (document) {
      const initalLoadingIndicator = document.getElementById('initial-loading-indicator');
      initalLoadingIndicator && initalLoadingIndicator.remove();
    }
  }),

  // configureAnonymousUser() {
  //   const session = this.session;
  //
  //   if (!session.get('isAuthenticated')) {
  //     return session.open('firebase', { provider: 'anonymous' }).then(({ currentUser }) => {
  //       currentUser.set('isAnonymous', true);
  //       currentUser.save().then(() => {
  //         this.refresh();
  //       });
  //     });
  //   }
  // },

  beforeModel() {
    const session = this.session;
    const fetchSession = session.fetch().catch(function() {});
    // const configureAnonymousUser = this.configureAnonymousUser.bind(this);

    // initial loading
    const initalLoadingIndicator = document.getElementById('initial-loading-indicator');

    if (!initalLoadingIndicator) {
      return; // abort
    }

    return fetchSession;
  },

  actions: {
    signIn(provider) {
      this.session.open('firebase', { provider }).then(() => {
        // debugger;
        this.transitionTo('/');
      }).catch((err) => {
        // debugger;
      })
    },

    signOut() {
      this.session.close()
        .then(() => { this.transitionTo('/'); })
        .catch((/*err*/) => { window.location.assign('/'); });
    }
  }
});
