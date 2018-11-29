const deals = [
  {
    "title": "Ricks Mobile",
    "licenses": ",",
    "description": "Wubalubadubdubadubdubdubdubdaubddubdub",
    "phone": "(415) 521-1864",
    "city": "San Francisco",
    "state": "California",
    "zip": "94110",
    // "image": "/assets/images/deals/francine-marie-sanfilippo.jpg"
  }
];

export default function(server) {
  deals.forEach((t) => {
    let image, location;

    if (!t.image) {
      return; /* skip for now */
    }

    image = server.create('image', {
      url: `${window.location.href.substring(0, window.location.href.length - 1)}${t.image}`,
      path: t.image
    });

    location = server.create('location', {
      street1: null,
      street2: null,
      zip: t.zip,
      longitude: null,
      latitude: null,
      phone: t.phone,
      email: null
    });

    server.create('deal', {
      title: t.title,
      locations: [location],
      photos: [image]
    });
  });
}
