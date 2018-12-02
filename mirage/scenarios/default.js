export default function(server) {
  server.createList(
    'deal',
    5,
    'withImages',
    'withTags',
    'withReviews'
  );

}
