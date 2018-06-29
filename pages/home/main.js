import React from 'react';
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from 'react-native';
import ActionButton from 'react-native-action-button';
import { ChoresCard } from './chores';
import { client } from '../../config';
import { ApolloProvider } from 'react-apollo';

const style = StyleSheet.create({
  container:{
    flex: 1
  },
  nameText:{
    textAlign: 'center',
    fontSize: 26
  }
})

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.friend = this.props.navigation.getParam('friend');
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={style.container}>
            <Text style={style.nameText}> Welcome {this.friend.name} </Text>
            <ChoresCard
            friend = {this.friend}
            navigation = {this.props.navigation}
            />
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="New Chore" onPress={() => this.props.navigation.navigate('AddChore', { friend: this.friend })}>
                    <Text> Chore </Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Add Transaction" onPress={() => {}}>
                    <Text> IOU </Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="Add to Shopping list" onPress={() => {}}>
                    <Text> List </Text>
                </ActionButton.Item>
            </ActionButton>
        </View>
      </ApolloProvider>
    );
  }
}