import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from 'react-native-action-button';
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
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
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
          onPress={() => {
            navigation.navigate('Chores', { friend });
          }}
        />
        <QueryCard
          query={GET_MY_IOUS}
          queryVars={{ friend: friend.friend_id }}
          titleFunc={() => 'IOUs'}
          bodyFunc={(data) => {
            const totOwe = data.friend.iowho.reduce((count, iou) => count + iou.amount, 0);
            const roundedAmount = Math.abs(Math.floor(totOwe * 100) / 100);
            return totOwe < 0 ? `You owe $${roundedAmount}` : `You are owed ${roundedAmount}`;
          }}
          onPress={() => {
            navigation.navigate('Ious', { friend });
          }}
        />

        <ActionButton buttonColor='rgba(231,76,60,1)'>
          <ActionButton.Item buttonColor='#9b59b6' title='New Chore' onPress={() => navigation.navigate('AddChore', { friend })}>
            <Text> Chore </Text>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title='Add Transaction' onPress={() => navigation.navigate('Pay', { friend })}>
            <Text> IOU </Text>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title='Add to Shopping list' onPress={() => {}}>
            <Text> List </Text>
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}
