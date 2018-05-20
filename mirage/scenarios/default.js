export default function(server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  server.create('user', {
    id: "currentUser",
    name: "Cookie Monster",
    email: "monster@cook.ies"
  });
}
