import {
  useShopQuery,
  ProductProviderFragment,
  flattenConnection,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../components/Layout.server';
import ProductList from '../components/ProductList.server';
import LoadMore from '../components/LoadMore.client';

export default function Index({first = 3}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      numProductMetafields: 0,
      numProductVariants: 250,
      numProductMedia: 10,
      numProductVariantMetafields: 10,
      numProductVariantSellingPlanAllocations: 10,
      numProductSellingPlanGroups: 10,
      numProductSellingPlans: 10,
      first,
    },
  });

  const products = flattenConnection(data.products);
  // Return the first three products and the load more button.
  return (
    <Layout>
      <LoadMore current={first}>
        <ProductList products={products} />
      </LoadMore>
    </Layout>
  );
}

// Define the GraphQL query.
const QUERY = gql`
  query HomeQuery(
    $numProductMetafields: Int!
    $numProductVariants: Int!
    $numProductMedia: Int!
    $numProductVariantMetafields: Int!
    $numProductVariantSellingPlanAllocations: Int!
    $numProductSellingPlanGroups: Int!
    $numProductSellingPlans: Int!
    $first: Int!
  ) {
    products(first: $first) {
      edges {
        node {
          ...ProductProviderFragment
        }
      }
    }
  }
  ${ProductProviderFragment}
`;
