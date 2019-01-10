'use strict';

module.exports = function(environment) {
  let ENV = {
    firebase: {
      apiKey: ' AIzaSyAzTSjVfnizg4aJAd_xBYXPXTMTKhrzYjg',
      authDomain: 'coffee-monkey-volcano.firebaseapp.com',
      databaseURL: 'https://coffee-monkey-volcano.firebaseio.com/',
      projectId: 'coffee-monkey-volcano',
      storageBucket: 'gs://coffee-monkey-volcano.appspot.com',
      messagingSenderId: '1095002023373'
    },
    torii: {
      sessionServiceName: 'session'
    },
    amazonAffliateTag: 'dealzilla0a-20',
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
