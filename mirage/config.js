export default function() {
  this.get('/products');
  this.get('/products/:id');

  this.get('/lists');
  this.post('/lists');
  this.get('/lists/:id');
  this.put('/lists/:id');
  this.del('/lists/:id');

  this.post('/users');
  this.get('/users/:id');
  this.put('/users/:id');

  this.get('/current_user', (schema) => {
    return schema.users.findBy({ isCurrentUser: true });
  });

  // this.passthrough('https://people.googleapis.com/**');
  this.get('https://people.googleapis.com/v1/people/**', () => { return {
    "names": [{ "displayName": "Johnny Domino" }],
    "photos": [{ "url": "https://lh3.googleusercontent.com/a-/AAuE7mDdSTj0F0YgtIxS-ibasjnd9hE6eCgKRhkFbykUDDU=s100" }],
    "emailAddresses": [{ "value": "jvdomino@gmail.com" }]
  }});
  this.passthrough('https://www.googleapis.com/**');


}
