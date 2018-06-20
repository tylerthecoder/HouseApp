import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { baseURL } from '../config';


export class AddChoreScreen extends React.Component {
  submitChore() {
    fetch(`${baseURL}/postChore?chore=${this.state.text}`)
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((response) => {
        console.log(response);
        alert('Chore uploaded');
      })
      .catch(err => console.log(`ERROR: ${err}`));
  }

  render() {
    return (
      <View>
          <Text> Chore Name: </Text>
          <TextInput
              onChangeText={text => this.setState({ text })}
          />
          <Button
              title="Submit Chore"
              onPress={() => this.submitChore()}
          />
      </View>
    );
  }
}
