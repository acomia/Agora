import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/Login';
import OnBoarding from '../screens/OnBoarding';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import DrawerNavigator from '../routes/DrawerNavigator';
import Intellimap from '../screens/Intellimap';
import Members from '../screens/Members';
import MemberInformation from '../screens/MemberInformation';
import PostedUtil from '../screens/PostedUtil';
import DoctorSearchNavigation from '../routes/DoctorSearchNavigation';

AppStack = createStackNavigator({
  OnBoardingPage: {
    screen: OnBoarding,
    navigationOptions: {
      header: null,
    },
  },
  LoginPage: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  },
  RegisterPage: {
    screen: Register,
    navigationOptions: {
      title: 'Sign Up',
    },
  },
  ForgotPasswordPage: {
    screen: ForgotPassword,
    navigationOptions: {
      title: 'Forgot Password',
    },
  },
  DashboardPage: {
    screen: Dashboard,
    navigationOptions: {
      header: null,
    },
  },
  ProfilePage: {
    screen: Profile,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
    },
  },
  Dashboard: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: null,
    },
  },
  IntellimapPage: {
    screen: Intellimap,
    navigationOptions: {
      header: null,
    },
  },
  MembersPage: {
    screen: Members,
    navigationOptions: {
      title: 'Account Profiles',
    },
  },
  MemberInfoPage: {
    screen: MemberInformation,
    navigationOptions: {
      header: null,
    },
  },
  DoctorSearchNavigation: {
    screen: DoctorSearchNavigation,
    navigationOptions: {
      header: null
    },
  },
});

export default createAppContainer(AppStack);
