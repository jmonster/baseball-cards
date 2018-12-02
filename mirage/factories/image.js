import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: () => faker.name.title(),
  url: () => faker.image.imageUrl(),
  // path: () => faker.system.filePath(), // this is broken in the version of fakerjs bundled with mirage
  path: () => "/tmp/foo.bar.jpg",
  alt: () => faker.lorem.sentence()
});
