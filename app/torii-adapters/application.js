import EmberObject from '@ember/object';
// import { inject } from '@ember/service';

export default EmberObject.extend({
  open: function(authentication){
    var { authorizationToken: { access_token } } = authentication;
    debugger;
  }
});
