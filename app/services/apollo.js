import ApolloService from 'ember-apollo-client/services/apollo';
import { setContext } from 'apollo-link-context';

class Apollo13 extends ApolloService {
  link() {
    const httpLink = super.link();
    const cacheLink = setContext(() => {
      return {

        headers: {
          /* Authorization header goes here */
          'cache-control': 'max-age=600' // 10 minutes
        }

      };
    });

    return cacheLink.concat(httpLink);
  }
}

export default Apollo13;
