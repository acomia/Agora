import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import DoctorSearchMainScreen from '../screens/DoctorSearch/DoctorSearchMainScreen';
import DoctorProfile from '../screens/DoctorProfile';
import DoctorSearchLandingPage from '../screens/DoctorSearch/DoctorSearchLandingPage';

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
      header: null,
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
