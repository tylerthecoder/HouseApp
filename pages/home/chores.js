import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Query } from 'react-apollo';
import { GET_FRIEND_CHORES } from '../../queries';

const style = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 5,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export class ChoresCard extends React.Component {
  onclick() {
    const { navigation, friend } = this.props;
    // navigate to the chores page
    navigation.navigate('Chores', { friend });
  }

  render() {
    const { friend } = this.props;
    return (
      <Query query={GET_FRIEND_CHORES} variables={{ friend_id: friend.friend_id }}>
        {({ loading, error, data }) => {
          if (loading) return <Text> Loading...</Text>;
          if (error) return <Text> {JSON.stringify(error)} </Text>;
          return (
            <TouchableHighlight onPress={() => this.onclick()} style={style.card}>
              <View>
                <Text style={style.cardTitle}>  Chores </Text>
                <Text style={style.cardText}> You have {data.friend.points} point{data.friend.points !== 1 ? 's' : ''} </Text>
              </View>
            </TouchableHighlight>
          )
        }}
      </Query>
    );
  }
}