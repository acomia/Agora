/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import StackNavigator from './src/routes/StackNavigator'
import DoctorSearchNavigation from './src/routes/DoctorSearchNavigation.js';

AppRegistry.registerComponent(appName, () => DoctorSearchNavigation);
