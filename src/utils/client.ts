import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        images: {
          keyArgs: false,

          read(existing) {
            return existing;
          },

          merge(existing = [], incoming = []) {
            // Note. Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache,
});

export default client;
