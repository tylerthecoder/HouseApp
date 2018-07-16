import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Mutation } from 'react-apollo';
import {
  COMPLETE_CHORE,
  ALL_CHORES,
} from '../../queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 5,
  },
  topBar: {
  },
  bottomBar: {
    flexDirection: 'row',
  },
  choreName: {
    fontSize: 30,
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  points: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  creator: {
    fontSize: 12,
    textAlign: 'center',
  },
  assignee: {
    fontSize: 12,
    textAlign: 'center',
  },
  leftText: {
    flex: 1,
  },
  button: {
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    marginTop: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  image: {
    flex: 1,
  },
  checkmark: {
    color: 'green',
    fontWeight: '900',
  },
});


const finishChore = (query, choreId, updateParent) => {
  query({
    variables: { id: choreId },
    update: (store, { data: { changeStatus: newChore } }) => {
      try {
        const data = store.readQuery({
          query: ALL_CHORES,
        });
        data.chores.forEach((chore) => {
          if (chore.id === newChore.id) chore.status = 'completed';
        });
        store.writeQuery({
          data,
          query: ALL_CHORES,
        });
        updateParent(choreId);
      } catch (err) {
        console.log(err);
      }
    },
  });
};

export class Chore extends React.Component {
  constructor({ chore }) {
    super();
    this.state = {
      imageUrl: '',
    };
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=AIfeuOiQHOMFT1XAY7hLwAwnFFMX9GNp&q=${chore.name}&limit=10&offset=0&rating=R&lang=en`)
      .then(res => res.json())
      .then(({ data: images }) => {
        const rnd = Math.floor(Math.random() * images.length);
        this.setState({
          imageUrl: images[rnd].images.fixed_height_still.url,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { chore, updateParent, friend } = this.props;
    const { imageUrl } = this.state;
    const creatorInitials = chore.creator.name.split(' ').map(word => word.substr(0, 1).toUpperCase()).join('');
    const doerInitials = chore.doer.name.split(' ').map(word => word.substr(0, 1).toUpperCase()).join('');
    const isMe = chore.doer.friend_id === friend.friend_id;
    return (
      <Mutation mutation={COMPLETE_CHORE}>
        {changeStatus => (
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Text style={styles.choreName}>
                {chore.name}
                {chore.status === 'completed' && (<Text style={styles.checkmark}>✓</Text>)}
              </Text>
            </View>
            <View style={styles.bottomBar}>
              <View style={styles.leftText}>
                <Text style={styles.points}> {chore.points} Points </Text>
                <Text style={styles.creator}> Creator: {creatorInitials} </Text>
                {
                   !isMe && (
                     <Text style={styles.assignee}> Assigned to: {doerInitials} </Text>
                   )
                }
              </View>
              {
                imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                  />
                )
              }
            </View>
            {
              isMe && chore.status === 'assigned' && (
                <TouchableHighlight
                  onPress={() => finishChore(changeStatus, chore.id, updateParent)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}> Finish! </Text>
                </TouchableHighlight>
              )
            }
          </View>
        )}
      </Mutation>
    );
  }
}
