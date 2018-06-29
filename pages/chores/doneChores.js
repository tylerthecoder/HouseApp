import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { choreQuery } from './main.js'


const UNCOMPLETE_CHORE = gql`
  mutation changeStatus($chore_id: String!) {
    changeStatus(chore_id: $chore_id, status: "assigned") {
      chore_id
    }
  }
`

const CompleteChore = (finishChore, chore_id) => (
  <Mutation mutation={COMPLETE_CHORE(chore_id)}>
    {(changeStatus, {data}) => {
      return (
      <Button
        title="Done!"
        color="#841584"
        onPress={finishChore(changeStatus)}
      />
      )
    }}

  </Mutation>
)

const styles = StyleSheet.create({
    choresView: {
    },
    choreName: {
      fontSize: 16,

    },
    chore: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 3,
      marginBottom: 5,
      padding: 5
    }
  });


export class DoneChores extends React.Component {

    render() {
      const completedChores = this.props.chores.filter(chore => chore.status == 'completed');
      return (
        <View style={styles.choresView}>
          <Text> Completed Chores </Text>
           {
            completedChores.map((chore, index) => (
              <View style={styles.chore} key={index} >
                <Text style={styles.choresName}>{chore.name}</Text>
                <Text> {chore.points} Points </Text>
              </View>
           ))
            }
        </View>
      );
    }
  }