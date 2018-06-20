import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, AsyncStorage } from 'react-native';
import { baseURL } from '../config';

console.log(baseURL);

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

    let name;
    Promise.all([AsyncStorage.getItem('@lounge621:user'),AsyncStorage.getItem('@lounge621:phrase')])
      .then(([user,pass]) => {
        name = user
        if (user !== null && pass !== null) {
          return fetch(`${baseURL}/login?user=${user}&password=${pass}`);
        } else {
          throw 'No data saved';
        }
      })
      .then(x => x.text())
      .then(x => {
        if ( x == "Success" ) {
          this.props.navigation.navigate('Home', { name })
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      })

  }

  getFriendData() {
    fetch(`${baseURL}/getFriendData`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          friendData: responseJson
        });
      })
      .catch(err => console.log(err));
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
