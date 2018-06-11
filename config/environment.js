'use strict';

module.exports = function(environment) {
  let ENV = {
    firebase: {
      apiKey: "AIzaSyACHn_ax-5PufhqSeYRdX76jI3tm4y8YJQ",
      authDomain: "therapder.firebaseapp.com",
      databaseURL: "https://therapder.firebaseio.com",
      projectId: "therapder",
      storageBucket: "gs://therapder.appspot.com",
      messagingSenderId: "201337740646"
    },
    torii: {
      sessionServiceName: 'session'
    },
    i18n: {
      defaultLocale: 'en'
    },

    modulePrefix: 'therapder',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    const enabled = process.env.MIRAGE_ENABLED === "true" ? true : false;
    ENV['ember-cli-mirage'] = { enabled };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV['ember-cli-mirage'] = { enabled: false };
  }

  ENV['ember-cli-mirage'] = { enabled: true };

  return ENV;
};
