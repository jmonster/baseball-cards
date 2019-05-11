import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import productQuery from 'dealzilla/gql/queries/find-product.graphql';
import Product from 'dealzilla/models/product';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';

export default Route.extend(RouteQueryManager, {
  graph: service(),

  deals: alias('graph.deals'),

  async findProductFromDeals(id) {
    const products = (await this.get('deals')).map((d) => d.product);
    return products.find((p) => p.get('id') === id);
  },

  async model(params) {
    let product = await this.findProductFromDeals(params.product_id);

    if (!product) {
      // fetch products we don't already have
      const { product: content } = await this.get('apollo').query({ query: productQuery, variables: { 'id': params.product_id } });
      product = Product.create({ content });
    }

    return product;
  },

  async titleToken(model) {
    return model.get('title');
  }
});
