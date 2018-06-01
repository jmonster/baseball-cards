export default function(server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  server.create('user', {
    id: 'currentUser', // this id is special
    name: 'Cookie Monster',
    email: 'monster@cook.ies'
  });

  server.create('therapist', 'withLocations', 'withPhotos');

  server.create('tag', 'withTherapyStyle');
  server.create('tag', 'withLocation');
  server.create('tag', 'withAcceptedInsuranceProvider');
  server.create('tag', 'withSpecialty');
  server.create('tag', 'withTherapists');

  server.create('review', 'withTherapist');
}
