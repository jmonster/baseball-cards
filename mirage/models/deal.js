import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  product: belongsTo(),
  reviews: hasMany(),
  tags: hasMany(),
  images: hasMany()
});
