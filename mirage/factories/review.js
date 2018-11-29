import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  body: () => faker.lorem.paragraph(),
  rating: () => faker.random.number({min:1, max:5}),

  withDeal: trait({
    afterCreate(review, server) {
      const deal = server.create('deal', { reviews: [review] });
      review.update('deal', deal);
    }
  })
});
