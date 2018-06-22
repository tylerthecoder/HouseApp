import { createStackNavigator } from 'react-navigation';

import { StartScreen } from './pages/start/main.js';
import { HomeScreen } from './pages/home.js';
import { ChoresScreen } from './pages/chores.js';
import { AddChoreScreen } from './pages/addChore.js';

export default createStackNavigator(
  {
    Start: StartScreen,
    Home: HomeScreen,
    Chores: ChoresScreen,
    AddChore: AddChoreScreen,
  },
  {
    initialRouteName: 'Start',
  }
);
