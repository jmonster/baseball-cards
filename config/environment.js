'use strict';

module.exports = function(environment) {
  let ENV = {
    apollo: {
      // apiURL: 'http://127.0.0.1:4000/graphql',
      apiURL: 'https://tipdrop-api.herokuapp.com/graphql',
      // Optionally, set the credentials property of the Fetch Request interface
      // to control when a cookie is sent:
      // requestCredentials: 'same-origin', // other choices: 'include', 'omit'
    },

    torii: {
      sessionServiceName: 'session',
      providers: {
        'google': {
          apiKey: '852582851070-6n9ga26etdc9vjc9kmanes11vhpva26h.apps.googleusercontent.com',
          scope: 'profile email'
        },

        'github-oauth2': {
          apiKey: '7fc3e18034fe7de32974',
          apiSecret: 'd5314c777a90ba62d5a2805fdb53f622a13bf40a',
          redirectUri: 'https://ballers.netlify.com/torii/redirect.html'
        }
      }
    },

    'ember-faker': {
      enabled: true
    },

    modulePrefix: 'tipdrop',
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

    // const enabled = process.env.MIRAGE_ENABLED === 'true' ? true : false;
    const enabled = true;
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
    ENV['ember-cli-mirage'] = { enabled: true };
  }

  return ENV;
};
