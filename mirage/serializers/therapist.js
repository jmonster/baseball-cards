import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['tags', 'locations', 'photos', 'reviews'] /* eslint-disable-line ember/avoid-leaking-state-in-ember-objects */
});
