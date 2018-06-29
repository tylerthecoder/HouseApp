import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, TextInput, AsyncStorage } from 'react-native';
import { baseURL } from '../../config';


export class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        text: ''
    };
    this.styles = StyleSheet.create({
        container: {
          backgroundColor: '#fff',
          alignItems: 'center',
          backgroundColor: 'white'
        },

        phraseInput: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingLeft: 5,
          width: Dimensions.get('window').width * .9,
        },

        button: {
          width: Dimensions.get('window').width * .9,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          marginTop: 5,
          borderColor: 'black',
          borderWidth: 1,
          padding: 5
        },

        buttonText: {
          color: 'white',
          fontSize: 20
        }
      });
  }

  isCorrectPhrase() {
    fetch(`${baseURL}/login?friend_id=${this.props.friend.friend_id}&password=${this.state.text}`)
      .then(x => x.text())
      .then(x => {
        if ( x == "Success" ) {
          try {
            AsyncStorage.setItem('@lounge621:phrase', this.state.text);
            AsyncStorage.setItem('@lounge621:user', this.props.friend.friend_id);
          } catch (err) {
            console.log(err);
          }
          this.props.closeModal()
          this.props.navigation.navigate('Home', { friend: this.props.friend });
        } else {
          console.log("Inncorrect password");
        }
      })
      .catch(err => console.log("ERROR" + err))
  }

  render() {
    return (
        <View style={this.styles.container}>
            <Text> Enter Password for {this.props.friend.name} </Text>
            <TextInput
              style={this.styles.phraseInput}
              placeholder="Enter Pass Phrase"
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <TouchableHighlight
              onPress={() => this.isCorrectPhrase()}
              style={this.styles.button}
            >
              <Text style={this.styles.buttonText}> Submit </Text>
            </TouchableHighlight>
        </View>
    );
  }
}
