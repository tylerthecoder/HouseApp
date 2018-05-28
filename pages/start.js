import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, } from 'react-native';


export class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        friendData:[]
        }

        this.getFriendData()
    }

    getFriendData() {
        fetch('http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com/getFriendData')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                friendData:responseJson
            })
        })
    }

    render() {
        const friendsHTML = this.state.friendData.map(x => {
        const friendStyle = getFriendStyle((x.color) ? x.color:"red");
        return (
            <TouchableHighlight 
            style={friendStyle} 
            key={x._id}
            onPress = {() => this.props.navigation.navigate("PassPhrase",{name:x.name,phrase:x.hash})}>
                <Text style={styles.personNameText}> {x.name} </Text>
            </TouchableHighlight>
            )
        })
        return (
        <View style={styles.container}>
            <View style={styles.halfContainer}>
            <Text style={styles.headingText}> Lounge 621 </Text>
            </View>
            <View style={styles.halfContainer}>
            {friendsHTML}
            </View>
        </View>
        );
    }

}

const getFriendStyle = (color) => {
  return {
    backgroundColor:color,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    borderRadius: 10,
    borderWidth: 2,
    height: Dimensions.get('window').height/12,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText:{
    fontSize:50,
  },
  halfContainer:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:Dimensions.get('window').height/2
  },
  personNameText:{
    color:"white",
    fontSize:30,
  }
});