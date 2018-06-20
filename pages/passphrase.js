import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, AsyncStorage } from 'react-native';
import { baseURL } from '../config';


export class getUsersPhrase extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      text: '',
      name: navigation.getParam('name'),
      hash: navigation.getParam('phrase', 'default')
    };
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      phraseInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: Dimensions.get('window').width / 2,
        alignItems: 'center',
      }
    });
  }

  isCorrectPhrase() {
    fetch(`${baseURL}/login?user=${this.state.name}&password=${this.state.text}`)
      .then(x => x.text())
      .then(x => {
        if ( x == "Success" ) {
          try {
            AsyncStorage.setItem('@lounge621:phrase', this.state.text);
            AsyncStorage.setItem('@lounge621:user', this.state.name);
          } catch (err) {
            console.log(err);
          }
          this.props.navigation.navigate('Home', { name: this.state.name });
        } else {
          console.log("Inncorrect password");
        }
      })
      .catch(err => console.log("ERROR" + err))
  }

  render() {
    return (
        <View style={this.styles.container}>
          <Text> Enter Pass Phrase </Text>
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
