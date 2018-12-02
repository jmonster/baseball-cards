import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  body: () => faker.lorem.paragraphs(),
  rating: () => faker.random.number({ min:1, max:5 })
});
