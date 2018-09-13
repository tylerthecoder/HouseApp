import React from 'react';
import {
  Text,
  FlatList,
  TextInput,
  View,
} from 'react-native';
import { Query } from 'react-apollo';
import { GET_SUGESTED_ITEMS, ADD_SHOPPING_LIST_ITEM, GET_SHOPPING_LIST } from '../../queries';
import { MutationButton } from '../../components';

export class AddToShoppingListScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      notes: '',
    };
  }

  render() {
    const { itemName, notes } = this.state;
    return (
      <View>
        <TextInput
          value={itemName}
          onChangeText={(txt) => {
            this.setState((prev) => {
              prev.itemName = txt;
              return prev;
            });
          }}
        />
        <Query query={GET_SUGESTED_ITEMS} variables={{ str: itemName }}>
          {({ loading, error, data }) => {
            if (loading) return <Text> Laoding </Text>;
            if (error) return <Text> {error.message} </Text>;

            const { suggestedItem } = data;

            return (
              <FlatList
                data={suggestedItem}
                renderItem={({ item }) => {
                  const { id, name } = item;
                  return <Text key={id}> {name} </Text>;
                }}
                keyExtractor={(_item, index) => String(index)}
              />
            );
          }}
        </Query>
        <TextInput
          value={notes}
          placeholder='Notes'
          onChangeText={(txt) => {
            this.setState((prev) => {
              prev.notes = txt;
              return prev;
            });
          }}
        />
        <MutationButton
          buttonText='Add Item'
          mutation={ADD_SHOPPING_LIST_ITEM}
          onPress={(mutateFunc) => {
            mutateFunc({
              variables: {
                itemName,
                notes,
              },
              refetchQueries: [
                {
                  query: GET_SHOPPING_LIST,
                },
              ],
            })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
      </View>
    );
  }
}
