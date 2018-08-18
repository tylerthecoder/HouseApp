import React from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Query } from 'react-apollo';
import { CurrentChores } from './current-chores';
import { DoneChores } from './done-chores';
import {
  ALL_CHORES,
} from '../../queries';
import { AllChores } from './all-chores';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export class ChoresScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <Query
        query={ALL_CHORES}
        variables={{ friend_id: friend.friend_id }}
        skip={!ALL_CHORES}
      >
        {
          ({ loading, error, data }) => {
            if (loading) return <Text> Loading... </Text>;
            if (error) return <Text> {JSON.stringify(error)} </Text>;
            const { chores } = data;
            return (
              <View style={styles.container}>
                <ScrollView>
                  <CurrentChores
                    chores={chores.filter(chore => chore.doer.friend_id === friend.friend_id)}
                    friend={friend}
                  />
                  <DoneChores
                    chores={chores.filter(chore => chore.doer.friend_id === friend.friend_id)}
                    friend={friend}
                  />
                  <AllChores
                    chores={chores}
                    friend={friend}
                  />
                </ScrollView>
              </View>
            );
          }
        }
      </Query>
    );
  }
}
