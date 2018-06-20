import { createStackNavigator } from 'react-navigation';

import { StartScreen } from './pages/start.js';
import { getUsersPhrase } from './pages/passphrase.js';
import { HomeScreen } from './pages/home.js';
import { ChoresScreen } from './pages/chores.js';
import { AddChoreScreen } from './pages/addChore.js';

export default createStackNavigator(
  {
    Start: StartScreen,
    PassPhrase: getUsersPhrase,
    Home: HomeScreen,
    Chores: ChoresScreen,
    AddChore: AddChoreScreen,
  },
  {
    initialRouteName: 'Start',
  }
);
