import React from 'react';
import { Text, View } from 'react-native';
import { ApolloProvider, Query } from 'react-apollo';
import { CurrentChores } from './current-chores';
import { DoneChores } from './done-chores';
import { client } from '../../config';
import { choreQuery } from '../../queries';


export class ChoresScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <ApolloProvider client={client}>
        <Query
          query={choreQuery}
          variables={{ friend_id: friend.friend_id }}
          skip={!choreQuery}
        >
          {
            ({ loading, error, data }) => {
              if (loading) return <Text> Loading... </Text>;
              if (error) return <Text> {JSON.stringify(error)} </Text>;
              const { chores } = data; // learn how to do this in the params
              return (
                <View>
                  <Text>{chores.length} chores</Text>
                  <CurrentChores
                    chores={chores}
                    friend={friend}
                  />
                  <DoneChores
                    chores={chores}
                  />
                </View>
              );
            }
          }
        </Query>
      </ApolloProvider>
    );
  }
}
