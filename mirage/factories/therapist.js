import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  birthday: () => faker.date.between('1997-01-01', '1938-01-01'), // 21 years old
  title: () => `${faker.company.bsNoun()} ${faker.hacker.verb()}`,
  bio: () => faker.lorem.paragraph(),

  withLocation: trait({
    afterCreate(therapist, server) {
      const locations = server.createList('location', 1);
      therapist.update('locations', locations);
    }
  }),

  withLocations: trait({
    afterCreate(therapist, server) {
      const locations = server.createList('location', 2);
      therapist.locations = locations;
    }
  }),

  withPhoto: trait({
    afterCreate(therapist, server) {
      const images = server.createList('image', 1);
      therapist.photos = images;
    }
  }),

  withPhotos: trait({
    afterCreate(therapist, server) {
      const images = server.createList('image', 3);
      therapist.photos = images;
    }
  }),

  withTags: trait({
    afterCreate(therapist, server) {
      const tags = server.createList('tag', 3);
      therapist.tags = tags;
    }
  }),

  withReviews: trait({
    afterCreate(therapist, server) {
      const reviews = server.createList('review', 5, { therapist });
      therapist.reviews = reviews;
    }
  }),

  isYoung: trait({ birthday: faker.date.past(21) }),
  isMiddleAged: trait({ birthday: faker.date.past(40) }),
  isOld: trait({ birthday: faker.date.past(60) }),
  isSeniorCitizen: trait({ birthday: faker.date.past(75) })
});
