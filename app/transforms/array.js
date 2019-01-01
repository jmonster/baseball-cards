import { typeOf } from '@ember/utils';
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return (typeOf(serialized) == "array") ? serialized  : [];
  },

  serialize(deserialized) {
    const type = typeOf(deserialized);

    if (type == 'array') {
      return deserialized
    } else if (type == 'string') {
      return deserialized.split(',').map(function(item) {
        // https://stackoverflow.com/questions/40329177/jquery-trim-compared-to-string-trim
        return item.trim();
      });
    } else {
      return [];
    }
  }
});
