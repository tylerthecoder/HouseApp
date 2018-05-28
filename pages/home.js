import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView} from 'react-native';


export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:this.props.navigation.getParam('name'),
        }
    }

    render() {
        
        return (
        <ScrollView>
            <Text>{this.state.name}</Text>
            <Chores 
            name={this.state.name} 
            navigation={this.props.navigation}
            ></Chores>
        </ScrollView>
        );
    }

}

class Chores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chores:[{name:""}]
        }
        fetch("http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com/myChores?name=" + this.props.name)
        .then(response => response.json())
        .then(json => {
            this.setState({chores:json})
        })
    }

    onclick() {
        //navigate to the chores page
        this.props.navigation.navigate("Chores",{name:this.props.name})
    }

    render () {
        return (
            <TouchableHighlight onPress={this.onclick.bind(this)} style={styles.card}>

                <Text> Your Chore is {JSON.stringify(this.state.chores[0].name)}</Text>

            </TouchableHighlight>
        )
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
  },
  card: {
      width: Dimensions.get('window').width,
      height: 60,
      backgroundColor: "white",
      borderWidth: 0.5,
      borderColor: "black"
  }
});