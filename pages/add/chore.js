import React from 'react';
import { Text, View, Button, StyleSheet, Picker } from 'react-native';
import { ApolloProvider, Mutation } from 'react-apollo';
import { client } from '../../config';
import { ADD_CHORE } from '../../queries';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerStyle: {
    height: 50,
    width: 300,
  },
});

const chores = [{ // get this from db later
  name: 'Mow',
  points: 3,
  id: 1,
}, {
  name: 'Mop',
  points: 3,
  id: 2,
}, {
  name: 'Clean Dishes',
  points: 2,
  id: 3,
}, {
  name: 'Sweep',
  points: 3,
  id: 4,
}];

export class AddChoreScreen extends React.Component {
  constructor({ navigation }) {
    super();
    this.friend = navigation.getParam('friend');
    this.state = {
      selectChore: chores[0].id,
    };
  }


  submitChore(addChore) {
    const { selectChore } = this.state;
    const newChore = chores.filter(chore => selectChore === chore.id)[0];
    addChore({
      variables: {
        name: newChore.name,
        points: newChore.points,
        friend: this.friend.friend_id,
      },
    })
      .then(x => console.log(x))
      .catch(err => console.error(err));
  }

  render() {
    const { selectChore } = this.state;
    return (
      <ApolloProvider client={client}>
        <Mutation mutation={ADD_CHORE}>
          {addChore => (
            <View style={styles.container}>
              <View>
                <Text> Pick a preset chore </Text>
                <Picker
                  selectedValue={selectChore}
                  style={styles.pickerStyle}
                  onValueChange={chore => this.setState({ selectChore: chore })}
                >
                  {
                    chores.map(chore => (
                      <Picker.Item
                        key={chore.id}
                        label={`${chore.name} (${chore.points})`}
                        value={chore.id} /* change this to the chore_id later */
                      />
                    ))
                  }
                </Picker>
              </View>
              <Button
                title='Submit Chore'
                onPress={() => this.submitChore(addChore)}
              />
            </View>
          )}
        </Mutation>
      </ApolloProvider>
    );
  }
}
