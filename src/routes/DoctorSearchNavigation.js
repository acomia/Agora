import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DoctorSearchMainScreen from '../screens/DoctorSearch/DoctorSearchMainScreen';
import DoctorProfile from '../screens/DoctorProfile';
import DoctorSearchLandingPage from '../screens/DoctorSearch/DoctorSearchLandingPage';
import {StatusBar} from 'react-native';
import React from 'react';

DoctorSearchModule = createStackNavigator({
  SearchLandingPage: {
    screen: DoctorSearchLandingPage,
    navigationOptions: {
      header: null,
    },
  },
  DoctorSearchMainScreen: {
    screen: DoctorSearchMainScreen,
    navigationOptions: {
      header: <StatusBar backgroundColor="transparent" />,
    },
  },
  DoctorProfile: {
    screen: DoctorProfile,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(DoctorSearchModule);
