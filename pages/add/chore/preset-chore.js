import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Picker,
} from 'react-native';
import { Mutation, Query } from 'react-apollo';
import { ADD_CHORE, GET_ALL_BASE_CHORES, ALL_CHORES } from '../../../queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#22b',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    padding: 3,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export class AddPrestChore extends React.Component {
  constructor() {
    super();
    this.state = {
      selectChore: undefined,
    };
  }

  submitChore(addChore) {
    const { selectChore } = this.state;
    const baseChore = this.baseChores.filter(chore => selectChore === chore.id)[0];
    const { friend } = this.props;
    if (!selectChore) alert('Please select a chore');
    addChore({
      variables: {
        baseChoreId: baseChore.id,
        friend: friend.friend_id,
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
                    <Text style={styles.headerText}> Select a preset chore </Text>
                    <Picker
                      selectedValue={selectChore}
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
                    <TouchableHighlight
                      style={styles.button}
                      onPress={() => this.submitChore(addChore)}
                    >
                      <Text style={styles.buttonText}> Submit Chore </Text>
                    </TouchableHighlight>
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
