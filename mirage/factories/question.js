import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  multipleChoice: false,
  identifier: '',
  type: 'fill-in-the-blank',
  value: () => faker.lorem.sentence(),
  subvalue: () => faker.lorem.sentence(),
  choices: []
});
