import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView} from 'react-native';


export class ChoresScreen extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.navigation.getParam('name')
    }

    render() {
        
        return (
        <ScrollView>
            <Text>{this.name}</Text>
            <Text> Chores Chores </Text>
        </ScrollView>
        );
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