import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import productQuery from 'dealzilla/gql/queries/find-product.graphql';
import Product from 'dealzilla/models/product';

export default Route.extend(RouteQueryManager, {
  findProductFromDeals(id) {
    const deals = this.modelFor('app');
    const products = deals.map((d) => d.product);

    return products.find((p) => p.get('id') === id);
  },

  async model(params) {
    let product = this.findProductFromDeals(params.product_id);

    if (!product) {
      // fetch products we don't already have
      const { product: content } = await this.get('apollo').watchQuery({ query: productQuery, variables: { 'id': params.product_id } });
      product = Product.create({ content });
    }

    return product;
  },

  async titleToken(model) {
    return model.get('title');
  }
});
