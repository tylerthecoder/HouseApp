import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { ApolloProvider } from 'react-apollo';
import { ChoresCard } from './chores';
import { client } from '../../config';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameText: {
    textAlign: 'center',
    fontSize: 26,
  },
});

export class HomeScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <ApolloProvider client={client}>
        <View style={style.container}>
          <Text style={style.nameText}> Welcome {friend.name} </Text>
          <ChoresCard
            friend={friend}
            navigation={navigation}
          />
          <ActionButton buttonColor='rgba(231,76,60,1)'>
            <ActionButton.Item buttonColor='#9b59b6' title='New Chore' onPress={() => navigation.navigate('AddChore', { friend })}>
              <Text> Chore </Text>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title='Add Transaction' onPress={() => {}}>
              <Text> IOU </Text>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title='Add to Shopping list' onPress={() => {}}>
              <Text> List </Text>
            </ActionButton.Item>
          </ActionButton>
        </View>
      </ApolloProvider>
    );
  }
}
