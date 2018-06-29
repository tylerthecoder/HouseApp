import { createStackNavigator } from 'react-navigation';

import { StartScreen } from './pages/start/main';
import { HomeScreen } from './pages/home/main';
import { ChoresScreen } from './pages/chores/main';
import { AddChoreScreen } from './pages/add/chore';

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
