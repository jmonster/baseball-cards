import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  offers: hasMany(),
  images: hasMany(),
  tags: hasMany(),
  reviews: hasMany(),
  deals: hasMany()
});
