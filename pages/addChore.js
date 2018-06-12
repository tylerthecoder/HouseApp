import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';


export class AddChoreScreen extends React.Component {
  submitChore() {
    fetch(`http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com/postChore?chore=${this.state.text}`)
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
