import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: () => faker.name.title(),
  url: () => faker.image.imageUrl(),
  path: () => faker.system.filePath(),
  alt: () => faker.lorem.sentence()
});
