/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import DoctorSearchNavigation from './src/routes/DoctorSearchNavigation';
import StackNavigator from './src/routes/StackNavigator';

AppRegistry.registerComponent(appName, () => StackNavigator);
