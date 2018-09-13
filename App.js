import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import { YellowBox } from 'react-native';
import { client } from './src/config';

import { StartScreen } from './src/pages/start/main';
import { HomeScreen } from './src/pages/home/main';
import { ChoresScreen } from './src/pages/chores/main';
import { AddChoreScreen } from './src/pages/add/chore/main';
import { IouScreen } from './src/pages/ious/main';
import { PayScreen } from './src/pages/ious/pay';
import { SplitCostScreen } from './src/pages/ious/split';
import { AllTransaction } from './src/pages/ious/allTrans';
import { ShoppingListScreen } from './src/pages/items/shoppinglist';
import { AddToShoppingListScreen } from './src/pages/items/addToShoppingList';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const RootStack = createStackNavigator({
  Start: StartScreen,
  Home: HomeScreen,
  Chores: ChoresScreen,
  AddChore: AddChoreScreen,
  Ious: IouScreen,
  Pay: PayScreen,
  Split: SplitCostScreen,
  AllTrans: AllTransaction,
  ShoppingList: ShoppingListScreen,
  AddItemToShoppingList: AddToShoppingListScreen,
}, {
  initialRouteName: 'Start',
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    );
  }
}
