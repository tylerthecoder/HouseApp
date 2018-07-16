import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { Query } from 'react-apollo';
import { GET_FRIENDS } from '../../queries';


const getStyle = color => ({
  backgroundColor: color,
  alignItems: 'center',
  width: Dimensions.get('window').width,
  borderRadius: 3,
  borderWidth: 2,
  height: Dimensions.get('window').height / 12,
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
});

const styles = StyleSheet.create({
  personNameText: {
    color: 'white',
    fontSize: 30,
  },
});


export class FriendsList extends React.Component {
  render() {
    const { promptPassword } = this.props;
    return (
      <Query query={GET_FRIENDS}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text> {JSON.stringify(error)} </Text>;
          return data.friends.map((friend) => {
            const friendStyle = getStyle(friend.color || 'red');
            return (
              <TouchableHighlight
                style={friendStyle}
                key={friend.friend_id}
                onPress={() => promptPassword(friend)}
              >
                <Text style={styles.personNameText}> {friend.name} </Text>
              </TouchableHighlight>
            );
          });
        }}
      </Query>
    );
  }
}
