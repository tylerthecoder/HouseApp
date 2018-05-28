import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button} from 'react-native';


export class getUsersPhrase extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        text:"",
        name:this.props.navigation.getParam('name'),
        hash:this.props.navigation.getParam('phrase',"default")
      }
    }
  
    isCorrectPhrase () {
      if (this.state.text == this.state.hash) {
        this.props.navigation.navigate("Home",{name:this.state.name})
      }else {
        alert("Inncorrect")
      }
    }
  
    render () {
      return (
        <View style={styles.container}>
          <Text> Enter Pass Phrase </Text>
          <TextInput
            style={styles.phraseInput}
            placeholder="Enter Pass Phrase"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Button 
            onPress={() => this.isCorrectPhrase()}
            title="Submit"
          />
  
        </View>
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
    phraseInput:{
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1,
      width: Dimensions.get('window').width/2,
      alignItems: 'center',
    }
  });