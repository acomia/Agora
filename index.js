/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import StackNavigator from './src/routes/StackNavigator'

AppRegistry.registerComponent(appName, () => StackNavigator);
