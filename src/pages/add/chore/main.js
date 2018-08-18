import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { AddBaseChore } from './base-chore';
import { AddPrestChore } from './preset-chore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'lightgrey',
  },
  dividerText: {
    fontSize: 30,
    textAlign: 'center',
    color:'white',
  },
});


export class AddChoreScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <View style={styles.container}>
        <AddPrestChore
          friend={friend}
        />
        <View style={styles.divider}>
          <Text style={styles.dividerText}> Or... </Text>
        </View>
        <AddBaseChore
          friend={friend}
        />
      </View>
    );
  }
}
