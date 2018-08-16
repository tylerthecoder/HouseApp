import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Chore } from './chore-componet';


const styles = StyleSheet.create({
  choresView: {
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export class DoneChores extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }

  toggle() {
    this.setState(prev => ({
      show: !prev.show,
    }));
  }

  render() {
    const { chores, friend } = this.props;
    const { show } = this.state;
    const completedChores = chores.filter(chore => chore.status === 'completed');
    return (
      <View style={styles.choresView}>
        <Text style={styles.header} onPress={() => this.toggle()}> Completed Chores {show ? '▲' : '▼'}</Text>
        {
          show && completedChores.map(chore => (
            <Chore
              key={chore.id}
              chore={chore}
              friend={friend}
            />
          ))
        }
      </View>
    );
  }
}
