import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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
import DoctorSearchNavigation from '../routes/DoctorSearchNavigation';
import Medgate from '../screens/Medgate';

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
      title: 'Sign In',
    },
  },
  RegisterPage: {
    screen: Register,
    navigationOptions: {
      title: 'Create an Account',
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
      header: null,
    },
  },
  MedgatePage: {
    screen: Medgate,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#258bf5',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
      },
      headerTintColor: '#fff',
    }
  }
});

export default createAppContainer(AppStack);
