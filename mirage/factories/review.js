import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  body: () => faker.lorem.paragraph(),
  rating: () => faker.random.number({min:1, max:5}),

  withTherapist: trait({
    afterCreate(review, server) {
      const therapist = server.create('therapist', { reviews: [review] });
      review.update('therapist', therapist);
    }
  })
});
