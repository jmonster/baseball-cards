import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  name: () => `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`,
  brand: () => faker.company.companyName(),
  msrp: () => faker.random.number(1000)*100 + 100, // at least $100
  originalReleaseDate: () => faker.date.past(),
  link: () => faker.internet.url(),
  latestPrice: () => faker.random.number(100)*100,
  lowestPriceEver: () => faker.random.number(100)*100,
  lowestPriceDate: () => faker.date.past(),
  description: () => faker.lorem.paragraphs(),

  withOffers: trait({
    afterCreate(product, server) {
      const offers = server.createList('offer', 2);
      product.offers = offers;
      product.save();
    }
  }),

  withDeals: trait({
    afterCreate(product, server) {
      const deals = server.createList('deal', 2, { product });
      product.deals = deals;
      product.save();
    }
  }),

  withReviews: trait({
    afterCreate(product, server) {
      const reviews = server.createList('review', 2);
      product.reviews = reviews;
      product.save();
    }
  }),

  withImages: trait({
    afterCreate(product, server) {
      const images = server.createList('image', 2);
      product.images = images;
      product.save();
    }
  }),

  withTags: trait({
    afterCreate(product, server) {
      let tags;
      const existingTags = server.db.tags;

      // all deals will share the same tags with this code
      // (which is less than optimal but lets keep it simple for now)
      if (!existingTags.length) {
        tags = server.createList('tag', 3);
        tags.forEach((t) => t.save());
      } else {
        tags = existingTags.values();
      }

      product.tags = tags;
      product.save();
    }
  })
});
