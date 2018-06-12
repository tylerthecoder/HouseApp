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
    console.log(this.name);
    fetch(`http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com/myChores?name=${this.name}`)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          inChores: json.filter(x => x.status === 'assigned'),
          doneChores: json.filter(x => x.status === 'completed')
        });
      });
  }

  deleteChore(id) {
    const newChores = this.state.chores.filter(ele => ele._id !== id);
    this.setState({
      chores: newChores
    });
  }

  render() {
    return (
      <ScrollView>
        <Text>{this.state.inChores.length} chores</Text>
        <Text> Chores List </Text>
          {
            this.state.inChores.map((chore, index) =>
              <ChoreView key={index} chore={chore} deleteMe={this.deleteChore.bind(this)}></ChoreView>)
          }
        <Text> Completed Chores </Text>
          {
            this.state.inChores.map((chore, index) =>
              <ChoreView key={index} chore={chore} deleteMe={this.deleteChore.bind(this)}></ChoreView>)
          }
      </ScrollView>
    );
  }
}


class ChoreView extends React.Component {
  constructor(props) {
    super(props);
    this.chore = this.props.chore;
    console.log(this.chore);
  }

  finishJob() {
    fetch(`http://lounge621app.qu2kndcevx.us-west-2.elasticbeanstalk.com/doneChore?choreId=${this.chore._id}`)
      .then(response => response.text())
      .then(() => {
        this.props.deleteMe(this.chore._id);
        // put a banner that says chore was deleted successfully
      })
      .catch(err => console.log(`ERROR: ${err}`));
  }

  render() {
    return (
        <View style={styles.choresView}>
            <Text style={styles.choresName}>{this.chore.name}</Text>
            <Button
              onPress={this.finishJob.bind(this)}
              title="I'm Done!"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
  }
}
