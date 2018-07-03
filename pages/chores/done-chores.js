import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
  choresView: {
  },
  chore: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 5,
    padding: 5,
  },
});

export class DoneChores extends React.Component {
  render() {
    const { chores } = this.props;
    const completedChores = chores.filter(chore => chore.status === 'completed');
    return (
      <View style={styles.choresView}>
        <Text> Completed Chores </Text>
        {
        completedChores.map(chore => (
          <View style={styles.chore} key={chore.chore_id}>
            <Text style={styles.choresName}>{chore.name}</Text>
            <Text> {chore.points} Points </Text>
          </View>
        ))
        }
      </View>
    );
  }
}
