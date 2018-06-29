import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { choreQuery } from './main.js'


const COMPLETE_CHORE = gql`
  mutation changeStatus($chore_id: String!) {
    changeStatus(chore_id: $chore_id, status: "completed") {
      chore_id
    }
  }
`

const styles = StyleSheet.create({
    choresView: {
    },
    choreName: {
      fontSize: 16,
      textAlign: 'center'
    },
    chore: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 3,
      marginBottom: 5,
      padding: 5,
    }
  });


export class CurrentChores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chores: this.props.chores.filter(chore => chore.status == 'assigned')
        }
    }

    finishChore(query, chore_id) {
      query({
        variables: { chore_id },
        update: (store, { data: {changeStatus} }) => {
          try {
            const data = store.readQuery({ query: choreQuery, variables: {friend_id: this.props.friend.friend_id} });
            data.chores.forEach(chore => {
              if (chore.chore_id == changeStatus.chore_id) chore.status = "completed";
            })

            store.writeQuery({
              data,
              query: choreQuery,
              variables: {friend_id: this.props.friend.friend_id}
            })

            this.setState(prev => ({
              chores: prev.chores.filter(chore => changeStatus.chore_id !== chore.chore_id)
            }))

          } catch(err) {
            console.log(err);
          }
        }
      })
    }

    render() {
      return (
        <View style={styles.choresView}>
          <Text> Chores List </Text>
           {
            this.state.chores.map((chore, index) => (
              <Mutation mutation={COMPLETE_CHORE} key={index}>
                {(changeStatus, {data}) => (
                  <View style={styles.chore}>
                    <Text style={styles.choreName}>{chore.name} ({chore.points} Points)</Text>
                    <Button
                      title="Done!"
                      color="#841584"
                      onPress={this.finishChore.bind(this, changeStatus, chore.chore_id)}
                    />
                  </View>
                )}
              </Mutation>
           ))
            }
        </View>
      );
    }
  }