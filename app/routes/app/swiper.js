import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';

export default Route.extend({
  graph: service(),
  model() {
    return this.graph.deals;
  }
});
