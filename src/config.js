import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// export const baseURL = 'http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com';
export const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:1337'
  : 'http://72.204.8.169:1337';


const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: new HttpLink({
    uri: `${baseURL}/graphql`,
  }),
  cache,
});

module.exports = {
  client,
  baseURL,
};
