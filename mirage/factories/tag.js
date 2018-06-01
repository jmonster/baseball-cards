import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  type: () => 'random',

  value: () => faker.random.arrayElement([
    'cognitive', 90210, 'aetna', 'anxiety'
  ]),

  // traits
  withTherapists: trait({
    afterCreate(tag, server) {
      const thereapists = server.createList('therapist', 3, { tags: [tag] });
      tag.thereapists = thereapists;
    }
  }),

  withTherapyStyle: trait({
    type: 'therapy-style',
    value: 'cognitive'
  }),

  withLocation: trait({
    type: 'zip-code',
    value: 90210
  }),

  withAcceptedInsuranceProvider: trait({
    type: 'insurance-provider-accepted',
    value: 'aetna'
  }),

  withSpecialty: trait({
    type: 'specialty',
    value: 'anxiety'
  })
});
