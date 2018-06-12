import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText: {
    fontSize: 50,
  },
  halfContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 2
  },
  personNameText: {
    color: 'white',
    fontSize: 30,
  }
});

export class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: [],
    };
    this.getFriendData();

    this.style = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      topText: {
        fontSize: 100,
      },
      headingText: {
        fontSize: 100,
      },
      halfContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 2
      },
      personNameText: {
        color: 'white',
        fontSize: 30,
      }
    });
  }

  getFriendData() {
    fetch('http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com/getFriendData')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          friendData: responseJson
        });
      });
  }

  getFriendStyle(color) {
    return {
      backgroundColor: color,
      alignItems: 'center',
      width: Dimensions.get('window').width,
      borderRadius: 3,
      borderWidth: 2,
      height: Dimensions.get('window').height / 12,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    };
  }

  render() {
    const friendsHTML = this.state.friendData.map((x) => {
      const friendStyle = this.getFriendStyle((x.color) ? x.color : 'red');
      return (
      <TouchableHighlight
          style={friendStyle}
          key={x._id}
          onPress = {() => this.props.navigation.navigate('PassPhrase', { name: x.name, phrase: x.hash })}>
              <Text style={styles.personNameText}> {x.name} </Text>
      </TouchableHighlight>
      );
    });
    return (
        <View style={this.style.container}>
            <View style={this.style.halfContainer}>
                <Text style={this.style.topText}> Lounge </Text>
                <Text style={this.style.headingText}> 621 </Text>
            </View>
            <View style={this.style.halfContainer}>
                {friendsHTML}
            </View>
        </View>
    );
  }
}
