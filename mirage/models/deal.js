import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  reviews: hasMany(),
  tags: hasMany(),
  locations: hasMany(),
  photos: hasMany('image')
});
