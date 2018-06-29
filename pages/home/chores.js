import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import { Query } from 'react-apollo';
import gql from "graphql-tag";



const style = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 5
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20
  },
  cardText: {
    textAlign: 'center',
    fontSize: 16
  }
});

export class ChoresCard extends React.Component {
  constructor(props) {
    super(props);
    this.choreQuery = gql`
      {
        friend(id: "${this.props.friend.friend_id}") {
          points
          chores {
            name
          }
        }
      }`
  }

  onclick() {
    // navigate to the chores page
    this.props.navigation.navigate('Chores', { friend: this.props.friend });
  }

  render() {
    return (
      <Query query={this.choreQuery}>
        {({ loading, error, data }) => {
          if (loading) return  <Text> Loading...</Text>
          if (error) return <Text> {JSON.stringify(error)} </Text>
          return (
            <TouchableHighlight onPress={this.onclick.bind(this)} style={style.card}>
              <View>
                <Text style={style.cardTitle}>  Chores </Text>
                <Text style={style.cardText}> You have {data.friend.points} point{data.friend.points !== 1 ? "s":""} </Text>
              </View>
            </TouchableHighlight>
          )
        }}
      </Query>
    );
  }
}