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

  const imagePaths = [
    '/assets/images/jialee.jpg',
    '/assets/images/dohnny.jpg',
    '/assets/images/johnny.jpg',
    '/assets/images/jayleisure.jpg',
    '/assets/images/colorfuljohnny.jpg',
    '/assets/images/mrsparkle.jpg',
    '/assets/images/babyjohnny.jpg'
  ];

  const people = [
    { firstName: 'jialee', lastName: 'chau', title: 'growth hacker' },
    { firstName: 'my name is', lastName: 'dohhny', title: 'lead thinkerer' },
    { firstName: 'johnny', lastName: 'domino', title: 'bit flipper' },
    { firstName: 'jay', lastName: 'leisure', title: 'hubber' },
    { firstName: 'j', lastName: 'monster', title: 'nomnomnomnomnom' },
    { firstName: 'mr', lastName: 'sparkle', title: 'I\'m disrespectful to dirt !!' },
    { firstName: 'baby', lastName: 'johnny', title: 'looks cute' }
  ];

  const images = imagePaths.map((url) => {
    return server.create('image', { url })
  });

  people.forEach((p, idx) => {
    p.photos = [images[idx]];
    server.create('therapist', p);
  });


  // server.create('therapist', 'withLocations', 'withPhotos');
  //
  // server.create('tag', 'withTherapyStyle');
  // server.create('tag', 'withLocation');
  // server.create('tag', 'withAcceptedInsuranceProvider');
  // server.create('tag', 'withSpecialty');
  // server.create('tag', 'withTherapists');
  //
  // server.create('review', 'withTherapist');
}
