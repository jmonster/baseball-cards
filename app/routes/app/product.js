import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import productQuery from 'dealzilla/gql/queries/find-product.graphql';
import Product from 'dealzilla/models/product';

import { inject as service } from '@ember/service';
import { readOnly }  from '@ember/object/computed';

export default Route.extend(RouteQueryManager, {
  graph: service(),
  deals: readOnly('graph.deals'),

  async model(params) {
    const { product: content } = await this.get('apollo').watchQuery({ query: productQuery, variables: { id: params.product_id } });
    return Product.create({ content });
  },

  async titleToken(model) {
    return model.get('title');
  }
});
