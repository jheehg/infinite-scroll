import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        images: {
          keyArgs: false,

          read(existing) {
            return existing && existing.slice(0);
          },

          merge(existing = [], incoming) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            return [...merged, ...incoming];
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
