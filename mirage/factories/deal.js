import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  title: () => faker.lorem.sentence(),
  description: () => faker.lorem.paragraph(),
  wiki: () => faker.lorem.paragraph(),
  price: () => faker.random.number(100)*10,

  afterCreate(deal, server) {
    if (!deal.product) {
      const product = server.create(
        'product',
        'withOffers',
        'withReviews',
        'withImages',
        'withTags',
        {
          deals: [deal]
        }
      );
      deal.product = product;
      deal.save();
    }
  },

  withImages: trait({
    afterCreate(deal, server) {
      const images = server.createList('image', 3);
      deal.images = images;
      deal.save();
    }
  }),

  withTags: trait({
    afterCreate(deal, server) {
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

      deal.tags = tags;
      deal.save();
    }
  }),

  withReviews: trait({
    afterCreate(deal, server) {
      const reviews = server.createList('review', 5);
      deal.reviews = reviews;
      deal.save();
     }
  })
});
