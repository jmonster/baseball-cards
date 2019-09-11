import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name: () => `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`,
  brand: () => faker.company.companyName(),
  link: () => faker.internet.url(),
  description: () => faker.lorem.paragraphs(),
  thumbnail: () => faker.image.imageUrl(),
  images: () => []
});
