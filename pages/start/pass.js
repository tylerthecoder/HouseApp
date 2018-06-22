import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, TextInput, AsyncStorage } from 'react-native';
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
          width: Dimensions.get('window').width * .9,
        }
      });
  }

  isCorrectPhrase() {
    fetch(`${baseURL}/login?user=${this.props.name}&password=${this.state.text}`)
      .then(x => x.text())
      .then(x => {
        if ( x == "Success" ) {
          try {
            AsyncStorage.setItem('@lounge621:phrase', this.state.text);
            AsyncStorage.setItem('@lounge621:user', this.props.name);
          } catch (err) {
            console.log(err);
          }
          this.props.closeModal()
          this.props.navigation.navigate('Home', { name: this.props.name });
        } else {
          console.log("Inncorrect password");
        }
      })
      .catch(err => console.log("ERROR" + err))
  }

  render() {
    return (
        <View style={this.styles.container}>
            <Text> Enter Password </Text>
            <TextInput
            style={this.styles.phraseInput}
            placeholder="Enter Pass Phrase"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            />
            <Button
            onPress={() => this.isCorrectPhrase()}
            title="Submit"
            />
        </View>
    );
  }
}
