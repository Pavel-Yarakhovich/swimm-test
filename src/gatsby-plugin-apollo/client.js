// src/gatsby-plugin-apollo/client.js
import fetch from 'isomorphic-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          collection_by_id: {
            // // Concatenate the incoming list items with
            // // the existing list items.
            keyArgs: ['slug'], //fill the unique identier here (ex: slug, id, _id) https://www.apollographql.com/docs/react/caching/cache-configuration#customizing-cache-ids
          },
        },
      },
    },
  }),

  link: new HttpLink({
    uri: process.env.GATSBY_DIRECTUS_GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_DIRECTUS_TOKEN}`,
    },
    fetch,
  }),
});

export default client;
