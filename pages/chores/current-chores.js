import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { Mutation } from 'react-apollo';
import {
  choreQuery,
  COMPLETE_CHORE,
} from '../../queries';


const styles = StyleSheet.create({
  choresView: {
  },
  choreName: {
    fontSize: 16,
    textAlign: 'center',
  },
  chore: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 5,
    padding: 5,
  },
});


export class CurrentChores extends React.Component {
  constructor({ chores }) {
    super();
    this.state = {
      chores: chores.filter(chore => chore.status === 'assigned'),
    };
  }

  finishChore(query, choreId) {
    const { friend } = this.props;
    query({
      variables: { chore_id: choreId },
      update: (store, { data: { changeStatus } }) => {
        try {
          const data = store.readQuery({
            query: choreQuery,
            variables: { friend_id: friend.friend_id },
          });
          data.chores.forEach((chore) => {
            if (chore.chore_id === changeStatus.chore_id) chore.status = 'completed';
          });

          store.writeQuery({
            data,
            query: choreQuery,
            variables: { friend_id: friend.friend_id },
          });

          this.setState(prev => ({
            chores: prev.chores.filter(chore => changeStatus.chore_id !== chore.chore_id),
          }));
        } catch (err) {
          console.log(err);
        }
      },
    });
  }

  render() {
    const { chores } = this.state;
    return (
      <View style={styles.choresView}>
        <Text> Chores List </Text>
        {
          chores.map(chore => (
            <Mutation mutation={COMPLETE_CHORE} key={chore.chore_id}>
              {changeStatus => (
                <View style={styles.chore}>
                  <Text style={styles.choreName}>{chore.name} ({chore.points} Points)</Text>
                  <Button
                    title='Done!'
                    color='#841584'
                    onPress={() => this.finishChore(changeStatus, chore.chore_id)}
                  />
                </View>
              )}
            </Mutation>
          ))
          }
      </View>
    );
  }
}
