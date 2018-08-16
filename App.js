import { createStackNavigator } from 'react-navigation';

import { StartScreen } from './src/pages/start/main';
import { HomeScreen } from './src/pages/home/main';
import { ChoresScreen } from './src/pages/chores/main';
import { AddChoreScreen } from './src/pages/add/chore/main';
import { IouScreen } from './src/pages/ious/main';
import { PayScreen } from './src/pages/ious/pay';

export default createStackNavigator({
  Start: StartScreen,
  Home: HomeScreen,
  Chores: ChoresScreen,
  AddChore: AddChoreScreen,
  Ious: IouScreen,
  Pay: PayScreen,
}, {
  initialRouteName: 'Start',
});
