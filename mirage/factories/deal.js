import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  title: () => `${faker.company.bsNoun()} ${faker.hacker.verb()}`,
  description: () => faker.lorem.paragraph(),

  // withLocation: trait({
  //   afterCreate(deal, server) {
  //     const locations = server.createList('location', 1);
  //     deal.update('locations', locations);
  //   }
  // }),
  //
  // withLocations: trait({
  //   afterCreate(deal, server) {
  //     const locations = server.createList('location', 2);
  //     deal.locations = locations;
  //   }
  // }),

  withPhoto: trait({
    afterCreate(deal, server) {
      const images = server.createList('image', 1);
      deal.photos = images;
    }
  }),

  withPhotos: trait({
    afterCreate(deal, server) {
      const images = server.createList('image', 3);
      deal.photos = images;
    }
  }),

  withTags: trait({
    afterCreate(deal, server) {
      const tags = server.createList('tag', 3);
      deal.tags = tags;
    }
  }),

  withReviews: trait({
    afterCreate(deal, server) {
      const reviews = server.createList('review', 5, { deal });
      deal.reviews = reviews;
    }
  })
});
