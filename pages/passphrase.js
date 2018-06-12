import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, AsyncStorage } from 'react-native';


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
    if (this.state.text === this.state.hash) {
      try {
        AsyncStorage.setItem('@lounge621:phrase', this.state.hash);
      } catch (err) {
        console.log('bad');
      }
      this.props.navigation.navigate('Home', { name: this.state.name });
    }
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
