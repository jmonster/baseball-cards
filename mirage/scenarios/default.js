export default function(server) {
  server.createList(
    'product',
    5,
    'withImages',
    'withTags'
  );
}
