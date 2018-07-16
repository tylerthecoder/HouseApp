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

export class AllChores extends React.Component {
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
    const notMyChores = chores.filter(chore => chore.doer.friend_id !== friend.friend_id);
    return (
      <View style={styles.choresView}>
        <Text style={styles.header} onPress={() => this.toggle()}> All Chores {show ? '▲' : '▼'}</Text>
        {
          show && notMyChores.map(chore => (
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
