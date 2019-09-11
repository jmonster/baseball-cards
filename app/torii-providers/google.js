/**
 * This class implements authentication against google
 * using the client-side OAuth2 authorization flow in a popup window.
 */

import GoogleOauth2Bearer from 'torii/providers/google-oauth2-bearer-v2';
import { configurable } from 'torii/configuration';

var TDGoogleOauth2Bearer = GoogleOauth2Bearer.extend({
  name: 'google',
  redirectUri: configurable('redirectUri', function (){
    // whatever domain we're currently one
    const url = [
      window.location.protocol,
      "//",
      window.location.host
    ].join('');

    return `${url}/torii/redirect.html`;
  })
});

export default TDGoogleOauth2Bearer;
