import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  value: () => faker.random.arrayElement([
    'electronics', 'apple', 'macbook', 'nintendo', 'mario'
  ])
});
