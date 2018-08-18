import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Picker,
} from 'react-native';
import { Mutation, Query } from 'react-apollo';
import { ADD_CHORE, GET_ALL_BASE_CHORES, ALL_CHORES } from '../../queries';
import { AddBaseChore } from './chore/base-chore';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  pickerStyle: {
    height: 50,
    width: 300,
  },
  descText: {
    textAlign: 'center',
  },
});
export class AddChoreScreen extends React.Component {
  constructor({ navigation }) {
    super();
    this.friend = navigation.getParam('friend');
    this.state = {
      selectChore: undefined,
    };
  }


  submitChore(addChore) {
    const { selectChore } = this.state;
    const baseChore = this.baseChores.filter(chore => selectChore === chore.id)[0];
    addChore({
      variables: {
        baseChoreId: baseChore.id,
        friend: this.friend.friend_id,
      },
      update: (store, { data }) => {
        const chore = data.addChore;
        try {
          const allChores = store.readQuery({ query: ALL_CHORES });
          allChores.chores.push(chore);
          store.writeQuery({
            data: allChores,
            query: ALL_CHORES,
          });
        } catch (err) {
          console.log(err);
        }
        // Alert user about what happened
      },
    })
      .catch(err => console.error(err));
  }

  render() {
    const { selectChore } = this.state;
    return (
      <Mutation mutation={ADD_CHORE}>
        {addChore => (
          <Query query={GET_ALL_BASE_CHORES}>
            {
              (({ loading, error, data }) => {
                if (loading) return (<Text> Loading </Text>);
                if (error) return (<Text> {error.message} </Text>);
                this.baseChores = data.baseChores;
                return (
                  <View style={styles.container}>
                    <View>
                      <Text style={styles.descText}> Pick a preset chore, create a new chore, or post a custom chore</Text>
                      <Picker
                        selectedValue={selectChore}
                        style={styles.pickerStyle}
                        onValueChange={chore => this.setState({ selectChore: chore })}
                      >
                        {
                          data.baseChores.map(chore => (
                            <Picker.Item
                              key={chore.id}
                              label={`${chore.name} (${chore.points})`}
                              value={chore.id}
                            />
                          ))
                        }
                      </Picker>
                    </View>
                    <Button
                      title='Submit Chore'
                      onPress={() => this.submitChore(addChore)}
                    />
                    <AddBaseChore
                      friend={this.friend}
                    />
                  </View>
                );
              })
            }

          </Query>
        )}
      </Mutation>
    );
  }
}
