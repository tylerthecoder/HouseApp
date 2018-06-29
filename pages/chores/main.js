import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { CurrentChores } from './currentChores';
import { DoneChores } from './doneChores';
import { client } from '../../config';
import { ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";


export const choreQuery = gql`
  query chores($friend_id: String!) {
    chores(friend_id: $friend_id) {
      name
      status
      chore_id
      points
    }
  }
`



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText: {
    fontSize: 50,
  },
  choresView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 5
  },
  choreName: {
    fontSize: 16,
  },
  personNameText: {
    color: 'white',
    fontSize: 30,
  }
});

export class ChoresScreen extends React.Component {
  constructor(props) {
    super(props);
    this.friend = this.props.navigation.getParam('friend');
    this.state = {
      chores: []
    };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Query
        query={choreQuery}
        variables={{friend_id: this.friend.friend_id}}
        skip={!choreQuery}
        >
          {
            ({ loading, error, data}) => {
              if (loading) return (<Text> Loading... </Text>);
              if (error) return (<Text> {JSON.stringify(error)} </Text>);
              const chores = data.chores;
              return (
                <View>
                  <Text>{chores.length} chores</Text>
                  <CurrentChores
                  chores={chores}
                  friend={this.friend}
                  />
                  <DoneChores
                  chores={chores}
                  />
                </View>
              )
            }
          }
        </Query>
      </ApolloProvider>
    );
  }
}
