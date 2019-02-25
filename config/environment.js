'use strict';

module.exports = function(environment) {
  let ENV = {
    firebase: {
      apiKey: 'AIzaSyB1zuup7KDVsTVyUEqQ4sly6LwSmCJQxu0',
      authDomain: 'thedealzillaprojectid.firebaseapp.com',
      databaseURL: 'https://thedealzillaprojectid.firebaseio.com/',
      projectId: 'thedealzillaprojectid',
      storageBucket: 'gs://thedealzillaprojectid.appspot.com',
      messagingSenderId: '520741038114'
    },
    torii: {
      sessionServiceName: 'session'
    },
    amazonAffliateTag: 'dealzilla0a-20',
    'ember-local-storage': {
      namespace: 'zil', // will use 'customNamespace'
      // keyDelimiter: '/' // will use / as a delimiter - the default is :
    },

    modulePrefix: 'dealzilla',
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

    const enabled = process.env.MIRAGE_ENABLED === 'true' ? true : false;
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

  return ENV;
};
