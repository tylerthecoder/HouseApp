import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, TextInput, AsyncStorage } from 'react-native';
import { baseURL } from '../../config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    padding: 10,
  },
  phraseInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
    alignSelf: 'stretch',
  },
  button: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});


export class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  isCorrectPhrase() {
    const { friend, closeModal, navigation } = this.props;
    const { text } = this.state;
    fetch(`${baseURL}/login?friend_id=${friend.friend_id}&password=${text}`)
      .then(x => x.text())
      .then((x) => {
        if (x === 'Success') {
          try {
            AsyncStorage.setItem('@lounge621:phrase', text);
            AsyncStorage.setItem('@lounge621:user', friend.friend_id);
          } catch (err) {
            throw err;
          }
          closeModal();
          navigation.navigate('Home', { friend });
        } else {
          throw new Error('Inncorrect password');
        }
      })
      .catch(err => console.log(`ERROR ${err}`));
  }

  render() {
    const { friend } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Text> Enter Password for {friend.name} </Text>
        <TextInput
          style={styles.phraseInput}
          placeholder='Enter Pass Phrase'
          onChangeText={txt => this.setState({ text: txt })}
          value={text}
        />
        <TouchableHighlight
          onPress={() => this.isCorrectPhrase()}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
