import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['therapists'] /* eslint-disable-line ember/avoid-leaking-state-in-ember-objects */
});
