import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['offers', 'deals', 'reviews', 'images', 'tags'] /* eslint-disable-line ember/avoid-leaking-state-in-ember-objects */
});
