import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import { YellowBox } from 'react-native';
import { client } from './config';

import { StartScreen } from './pages/start/main';
import { HomeScreen } from './pages/home/main';
import { ChoresScreen } from './pages/chores/main';
import { AddChoreScreen } from './pages/add/chore/main';
import { IouScreen } from './pages/ious/main';
import { PayScreen } from './pages/ious/pay';
import { SplitCostScreen } from './pages/ious/split';
import { AllTransaction } from './pages/ious/allTrans';
import { ShoppingListScreen } from './pages/items/shoppinglist';
import { AddToShoppingListScreen } from './pages/items/addToShoppingList';

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
