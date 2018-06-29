import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';




const baseURL = 'http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com';
//const baseURL = 'https://192.168.0.7:3000';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri:`${baseURL}/graphql`
  }),
  cache
});

module.exports = {
    client,
    baseURL
}