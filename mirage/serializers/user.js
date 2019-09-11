import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['lists'] // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
});
