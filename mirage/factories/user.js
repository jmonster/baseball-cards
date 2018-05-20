import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: () => faker.name.findName(),
  email: () => faker.internet.email(),
  isAnonymous: true
});
