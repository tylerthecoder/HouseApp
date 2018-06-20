import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import ActionButton from 'react-native-action-button';
import { baseURL } from '../config';


export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.getParam('name'));
    this.state = {
      name: this.props.navigation.getParam('name'),
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
          <Text>{this.state.name}</Text>
          <Chores
          name={this.state.name}
          navigation={this.props.navigation}
          ></Chores>
          <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title="New Chore" onPress={() => this.props.navigation.navigate('AddChore', { name: this.state.name })}>
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
    );
  }
}

class Chores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chores: [{ name: '' }]
    };
    this.style = StyleSheet.create({
      card: {
        width: Dimensions.get('window').width,
        height: 60,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'black'
      }
    });

    fetch(`${baseURL}/myChores?name=${this.props.name}`)
      .then(response => response.json())
      .then((json) => {
        this.setState({ chores: json });
      });

    fetch(`${baseURL}/myPoints?name=${this.props.name}`)
      .then(response => response.text())
      .then((text) => {
        console.log(points);
      });
  }

  onclick() {
    // navigate to the chores page
    this.props.navigation.navigate('Chores', { name: this.props.name });
  }

  render() {
    return (
      <TouchableHighlight onPress={this.onclick.bind(this)} style={this.style.card}>
        <Text> Your Chore is {JSON.stringify(this.state.chores[0].name)}</Text>
      </TouchableHighlight>
    );
  }
}
