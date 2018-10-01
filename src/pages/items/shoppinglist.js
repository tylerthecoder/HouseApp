import React from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Query } from 'react-apollo';
import { Card, MutationButton, BlockButton } from '../../components';
import { GET_SHOPPING_LIST, REMOVE_SHOPPING_LIST_ITEM } from '../../queries';

export class ShoppingListScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Query query={GET_SHOPPING_LIST}>
          {({
            loading,
            error,
            data,
            refetch,
          }) => {
            if (loading) return <Text> Loading </Text>;
            if (error) return <Text> error </Text>;
            return (
              <ScrollView>
                <BlockButton
                  text='Add to list'
                  onPress={() => {
                    navigation.navigate('AddItemToShoppingList');
                  }}
                />
                <BlockButton
                  text='Refresh'
                  onPress={() => refetch()}
                />
                {
                  data.shoppingList.map(listItem => (
                    <Card
                      key={listItem.id}
                      titleText={listItem.name}
                    >
                      <Text> { listItem.notes } </Text>
                      <MutationButton
                        mutation={REMOVE_SHOPPING_LIST_ITEM}
                        buttonText='Remove'
                        onPress={
                          (removeListItem) => {
                            removeListItem({
                              variables: {
                                listItemId: listItem.id,
                              },
                              refetchQueries: [
                                {
                                  query: GET_SHOPPING_LIST,
                                },
                              ],
                            });
                          }
                        }
                      />
                    </Card>
                  ))
                }
              </ScrollView>
            );
          }}
        </Query>
      </View>
    );
  }
}
