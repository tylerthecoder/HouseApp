import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { ApolloProvider } from 'react-apollo';
import { client } from '../../config';
import { QueryCard } from '../../components/queryCard';
import { GET_MY_IOUS, GET_FRIEND_CHORES } from '../../queries';

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
          <QueryCard
            query={GET_FRIEND_CHORES}
            queryVars={{ friend_id: friend.friend_id }}
            titleFunc={() => 'Chores'}
            bodyFunc={(data) => {
              const { points } = data.friend;
              return `You have ${points} point${points !== 1 ? 's' : ''}`;
            }}
            onclick={() => {
              navigation.navigate('Chores', { friend });
            }}
          />
          <QueryCard
            query={GET_MY_IOUS}
            queryVars={{ friend: friend.friend_id }}
            titleFunc={() => 'IOUs'}
            bodyFunc={(data) => {
              const totOwe = data.friend.iowho.reduce((count, iou) => count + iou.amount, 0);
              return `You owe ${totOwe}`;
            }}
            onclick={() => {
              navigation.navigate('Ious', { friend });
            }}
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
