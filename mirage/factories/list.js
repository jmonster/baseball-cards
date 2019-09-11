import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name: () => `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`,
  image: () => faker.image.imageUrl()
});
