import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
// export const baseURL = 'http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com';
console.log('ENVIDSK');
console.log(process.env.NODE_ENV);
export const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:1337'
  : 'http://72.204.8.169:1337';

const httpLink = new HttpLink({
  uri: `${baseURL}/graphql`,
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();


export const client = new ApolloClient({
  link,
  cache,
});

module.exports = {
  client,
  baseURL,
};
