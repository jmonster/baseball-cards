import Controller from '@ember/controller';

export default Controller.extend({
  thingsToFilterOn: Promise.resolve([1,2,3])
});
