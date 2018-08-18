import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import { client } from './src/config';

import { StartScreen } from './src/pages/start/main';
import { HomeScreen } from './src/pages/home/main';
import { ChoresScreen } from './src/pages/chores/main';
import { AddChoreScreen } from './src/pages/add/chore/main';
import { IouScreen } from './src/pages/ious/main';
import { PayScreen } from './src/pages/ious/pay';
import { SplitCostScreen } from './src/pages/ious/split';

const RootStack = createStackNavigator({
  Start: StartScreen,
  Home: HomeScreen,
  Chores: ChoresScreen,
  AddChore: AddChoreScreen,
  Ious: IouScreen,
  Pay: PayScreen,
  Split: SplitCostScreen,
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
