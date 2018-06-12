import { AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { StartScreen } from './pages/start.js';
import { getUsersPhrase } from './pages/passphrase.js';
import { HomeScreen } from './pages/home.js';
import { ChoresScreen } from './pages/chores.js';
import { AddChoreScreen } from './pages/addChore.js';


AsyncStorage.getItem('@lounge621:phrase')
  .then((val) => {
    if (val !== null) {
      // We have data!!
      // now try to log in with that data
      console.log(val);
    } else {
      console.log('No value found');
    }
  })
  .catch((err) => {
    console.log(err);
  });

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
