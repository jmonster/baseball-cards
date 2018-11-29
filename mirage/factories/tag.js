import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  type: () => 'random',

  value: () => faker.random.arrayElement([
    'electronics', 'apple', 'macbook', 'nintendo', 'mario'
  ]),

  withLocation: trait({
    type: 'zip-code',
    value: 90210
  })
});
