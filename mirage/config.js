export default function() {
  this.get('/lists');
  this.post('/lists');
  this.get('/lists/:id');
  this.put('/lists/:id');
  this.del('/lists/:id');

  this.post('/users');
  this.get('/users/:id');
  this.patch('/users/:id');

  this.get('/current_user', (schema) => {
    return schema.users.findBy({ isCurrentUser: true });
  });

  this.passthrough('https://people.googleapis.com/**');
  this.passthrough('https://www.googleapis.com/**');
  this.passthrough('https://api.github.com/user');
  this.passthrough('https://github.com/login/oauth/access_token');
}
