import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

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
  choresView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 5
  },
  choreName: {
    fontSize: 16,
  },
  personNameText: {
    color: 'white',
    fontSize: 30,
  }
});

export class ChoresScreen extends React.Component {
  constructor(props) {
    super(props);
    this.name = this.props.navigation.getParam('name');
    this.state = {
      inChores: [],
      doneChores: []
    };
    this.getChores();
  }

  getChores() {
    fetch(`http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com/myChores?name=${this.name}`)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          inChores: json.filter(x => x.status === 'assigned'),
          doneChores: json.filter(x => x.status === 'completed')
        });
      });
  }

  finishChore(id) {
    this.setState(prev => ({
      inChores: prev.inChores.filter(ele => ele._id !== id),
      doneChores: prev.inChores.filter(ele => ele._id === id).concat(prev.doneChores)
    }));
  }

  render() {
    return (
      <ScrollView>
        <Text>{this.state.inChores.length} chores</Text>
        <Text> Chores List </Text>
        <InChores chores={this.state.inChores} finishChore={this.finishChore.bind(this)}></InChores>
        <Text> Completed Chores </Text>
        <DoneChores chores={this.state.doneChores}></DoneChores>
      </ScrollView>
    );
  }
}


class InChores extends React.Component {
  finishJob(id) {
    fetch(`http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com/doneChore?choreId=${id}`)
      .then(response => response.text())
      .then(() => {
        this.props.finishChore(id);
        // put a banner that says chore was deleted successfully
      })
      .catch(err => console.log(`ERROR: ${err}`));
  }

  render() {
    return (
        <View style={styles.choresView}>
          {
            this.props.chores.map((ele, index) => (
              <View key={index}> 
                <Text style={styles.choresName}>{ele.name}</Text>
                <Button
                  onPress={this.finishJob.bind(this,ele._id)}
                  title="I'm Done!"
                  color="#841584"
                />
              </View>
            ))
          }
        </View>
    );
  }
}

class DoneChores extends React.Component {
  finishJob(id) {
    // fetch(`http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com/doneChore?choreId=${id}`)
    //   .then(response => response.text())
    //   .then(() => {
    //     this.props.deleteMe(id);
    //     // put a banner that says chore was deleted successfully
    //   })
    //   .catch(err => console.log(`ERROR: ${err}`));
  }

  render() {
    return (
        <View style={styles.choresView}>
            {
              this.props.chores.map((ele, index) => (
                <View key={index}> 
                  <Text style={styles.choresName}>{ele.name}</Text>
                </View>
              ))
            }
        </View>
    );
  }
}
