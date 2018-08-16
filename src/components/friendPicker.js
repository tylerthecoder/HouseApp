import React from 'react';
import {
  Text,
  View,
  Picker,
} from 'react-native';
import { Query } from 'react-apollo';
import { GET_FRIENDS } from '../queries';

export class FriendPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      friend: undefined,
    };
    this.lastFriend = undefined;
    this.friends = {};
  }

  componentDidMount() {
    const { onChange } = this.props;
    const { friend } = this.state;
    if (!friend) {
      onChange(this.friends[0].friend_id);
    } else if (friend !== this.lastFriend) {
      this.lastFriend = friend;
      onChange(friend);
    }
  }

  render() {
    const { friend } = this.state;
    const { exclude, onChange } = this.props;
    return (
      <Query query={GET_FRIENDS}>
        {({ loading, error, data }) => {
          if (loading) return (<Text> Loading </Text>);
          if (error) return (<Text> {error.message} </Text>);
          const { friends } = data;
          this.friends = friends.filter(fri => !exclude || exclude.indexOf(fri.friend_id) === -1);
          return (
            <View>
              <Picker
                selectedValue={friend || this.friends[0].friend_id}
                onValueChange={(fri) => {
                  this.setState({
                    friend: fri,
                  });
                  onChange(fri);
                }}
              >
                {
                  this.friends
                    .map(fri => (
                      <Picker.Item
                        key={fri.friend_id}
                        label={fri.name}
                        value={fri.friend_id}
                      />
                    ))
                }
              </Picker>
            </View>
          );
        }}
      </Query>
    );
  }
}
