import React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import { ApolloProvider, Mutation } from 'react-apollo';
import { client } from '../../../config';
import { ADD_BASE_CHORE, GET_ALL_BASE_CHORES } from '../../../queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export class AddBaseChore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: '',
      name: '',
    };
  }

  addBaseChore(query) {
    const { name, points } = this.state;
    const { friend } = this.props;
    query({
      variables: {
        name,
        points: parseInt(points, 10),
        friend: friend.friend_id,
      },
      update: (store, { data }) => {
        const bChore = data.addBaseChore;
        const allBaseChores = store.readQuery({ query: GET_ALL_BASE_CHORES });
        allBaseChores.baseChores.push(bChore);
        store.writeQuery({
          data: allBaseChores,
          query: GET_ALL_BASE_CHORES,
        });
      },
    })
      .catch(err => console.log(err));
  }

  validatePoint(points) {
    this.setState({
      points: parseInt(points, 10) || 0,
    });
  }

  render() {
    const { name, points } = this.state;
    return (
      <ApolloProvider client={client}>
        <Mutation mutation={ADD_BASE_CHORE}>
          {addBaseChore => (
            <View style={styles.container}>
              <Text style={styles.headerText}> Add new preset chore </Text>
              <TextInput
                value={name}
                onChangeText={n => this.setState({ name: n })}
                placeholder='Enter name of chore'
              />
              <TextInput
                value={points.toString()}
                onChangeText={p => this.validatePoint(p)}
                placeholder='Enter point value of new chore'
              />
              <Button
                title='Add'
                onPress={() => this.addBaseChore(addBaseChore)}
              />
            </View>
          )}
        </Mutation>
      </ApolloProvider>
    );
  }
}
