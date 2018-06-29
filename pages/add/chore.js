import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { client } from '../../config';
import gql from "graphql-tag";
import { ApolloProvider, Mutation } from "react-apollo";

const ADD_CHORE = gql`
  mutation addChore($name: String!, $points: Number!, $friend: String!) {
    addChore(name: $name, points: $points, friend_id: $friend) {
      chore_id
      doer {
        name
      }
    }
  }
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  choreName: {
    fontSize: 16,
    textAlign: 'center'
  },
  chore: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 5,
    padding: 5,
  }
});

const chores = [{ //get this from db later
    name: "Mow",
    points: 3,
    id: 1
  },{
    name:"Mop",
    points: 3,
    id: 2
  },{
    name:"Clean Dishes",
    points: 2,
    id: 3
  },{
    name:"Sweep",
    points: 3,
    id: 4
  }]

export class AddChoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.friend = this.props.navigation.getParam('friend');
    this.state = {
      selectChore: chores[0].id
    }
  }


  submitChore(addChore) {
    const newChore = chores.filter(chore => this.state.selectChore === chore.id)[0];
    console.log(newChore.name, newChore.points, this.friend.friend_id);
    addChore({
      variables: {
        name: newChore.name,
        points: newChore.points,
        friend: this.friend.friend_id
      }
    })
    .then( x => console.log(x))
    .catch(err => console.error(err));
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Mutation mutation={ADD_CHORE}>
          {(addChore, {data}) => (
            <View style={styles.container}>
              <View>
                <Text> Pick a preset chore </Text>
                <Picker
                  selectedValue={this.state.selectChore}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(selectChore) => this.setState({selectChore})}>
                  {
                    chores.map(chore => {
                      return (
                        <Picker.Item key={chore.id} label={`${chore.name} (${chore.points})`} value={chore.id}/* change this to the chore_id later */ />
                      )
                    })
                  }
                </Picker>
              </View>
              <Button
                  title="Submit Chore"
                  onPress={this.submitChore.bind(this, addChore)}
              />
            </View>
          )}
        </Mutation>
      </ApolloProvider>
    );
  }
}
