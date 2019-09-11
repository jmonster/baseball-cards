import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name: () => faker.name.findName(),
  email: () => faker.internet.email(),
  image: () => faker.image.imageUrl(),
  avatar: () => faker.internet.avatar(),

  isAnonymous: false
});
