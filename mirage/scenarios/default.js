export default function(server) {
  const products = server.createList('product', 5);

  // currently logged in user
  const jerry = server.create('user', {
    name: 'Jerry Smith',
    email: 'jsmith@aol.com',
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    isCurrentUser: true
  });

  server.createList('list', 1, {
    owner: jerry,
    products
  });
}
