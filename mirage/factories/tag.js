import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  value: () => faker.random.arrayElement([
    'yoga', 'fishing', 'hiking'
  ])
});
