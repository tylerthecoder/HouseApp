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


export class CurrentChores extends React.Component {
  constructor({ chores }) {
    super();
    this.state = {
      chores: chores.filter(chore => chore.status === 'assigned'),
      show: true,
    };
  }

  finishChore(choreId) {
    this.setState(prev => ({
      chores: prev.chores.filter(chore => choreId !== chore.id),
      show: prev.show,
    }));
  }

  toggle() {
    this.setState(prev => ({
      chores: prev.chores,
      show: !prev.show,
    }));
  }

  render() {
    const { chores, show } = this.state;
    const { friend } = this.props;
    return (
      <View style={styles.choresView}>
        <Text style={styles.header} onPress={() => this.toggle()}> Your Chores {show ? '▲' : '▼'}</Text>
        { show && chores.map(chore => (
          <Chore
            chore={chore}
            key={chore.id}
            friend={friend}
            updateParent={choreId => this.finishChore(choreId)}
          />
        ))
        }
      </View>
    );
  }
}


