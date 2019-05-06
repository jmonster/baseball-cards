import ApolloService from 'ember-apollo-client/services/apollo';
import { setContext } from 'apollo-link-context';

export default ApolloService.extend({
  clientOptions() {
    const httpLink = this._super().link;
    const cacheLink = setContext(() => {
      return {


        headers: {
          /* Authorization header goes here */
          /* NOTE: the `cache-control` header is ignored */
        }


      };
    });

    return {
      link: cacheLink.concat(httpLink),
      cache: this.cache()
    };
  }
});
