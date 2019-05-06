import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import productQuery from 'dealzilla/gql/queries/find-product.graphql';
import Product from 'dealzilla/models/product';

export default Route.extend(RouteQueryManager, {
  async model(params) {
    const { product: content } = await this.get('apollo').watchQuery({ query: productQuery, variables: { 'id': params.product_id } });
    return Product.create({ content });
  }
});
