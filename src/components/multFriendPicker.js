import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Query } from 'react-apollo';
import { GET_FRIENDS } from '../queries';
import { SelectableFriend } from './selectableFriend';


export class MultiFriendPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFriends: [],
    };
  }

  setActiveFriends(friendId, state, onChange) {
    const { selectedFriends } = this.state;
    // if we have the friend selected and we shouldn't
    if (selectedFriends.includes(friendId) && !state) {
      // remove that friend from the selected friends
      const index = selectedFriends.indexOf(friendId);
      if (index > -1) {
        selectedFriends.splice(index, 1);
      }
    // if we don't have the friend selected and we need to
    } else if (!selectedFriends.includes(friendId) && state) {
      selectedFriends.push(friendId);
    }

    this.setState({
      selectedFriends,
    });
    onChange(selectedFriends);
  }

  render() {
    const { exclude, onChange } = this.props;
    return (
      <Query query={GET_FRIENDS}>
        {({ loading, error, data }) => {
          if (loading) return (<Text> Loading </Text>);
          if (error) return (<Text> {error.message} </Text>);
          const { friends } = data;
          const filteredFriends = friends.filter(fri => !exclude || exclude.indexOf(fri.friend_id) === -1);
          return (
            <View>
              {
                filteredFriends.map(friend => (
                  <SelectableFriend
                    key={friend.friend_id}
                    friend={friend}
                    onChange={(state) => {
                      this.setActiveFriends(friend.friend_id, state, onChange);
                    }}
                  />
                ))
              }
            </View>
          );
        }}
      </Query>
    );
  }
}
