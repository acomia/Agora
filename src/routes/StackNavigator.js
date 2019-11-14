import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {Icon, Header} from 'native-base';
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
import DoctorSearchNavigation from '../routes/DoctorSearchNavigation';
import Medgate from '../screens/Medgate';
import LinearGradient from 'react-native-linear-gradient';
import ApprovedUtil from '../screens/ApprovedUtil';
import PostedUtil from '../screens/PostedUtil';
import ApprovedUtilModal from '../screens/ApprovedUtilModal';
import MembInfo from '../screens/MembInfo';
import EditProfile from '../screens/EditProfile';

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
      title: '',
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
      },
      headerTintColor: '#fff',
    },
  },
  RegisterPage: {
    screen: Register,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
      },
      headerTintColor: '#fff',
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
        paddingTop: 20,
      },
      headerTintColor: '#fff',
    },
  },
  Dashboard: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: <StatusBar translucent backgroundColor="transparent" />,
    },
  },
  IntellimapPage: {
    screen: Intellimap,
    navigationOptions: {
      header: <StatusBar backgroundColor="#5fb650" barStyle="light-content" />,
    },
  },
  MembersPage: {
    screen: Members,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
      },
      headerTintColor: '#fff',
    },
  },
  MemberInfoPage: {
    screen: MemberInformation,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
      },
      headerTintColor: '#fff',
    },
  },
  MembInfoPage: {
    screen: MembInfo,
    navigationOptions: {
      title: 'Member information',
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
      },
      headerTintColor: '#fff',
    },
  },
  ApprovedUtilPage: {
    screen: ApprovedUtil,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
      },
      headerTintColor: '#fff',
    },
  },
  PostedUtilPage: {
    screen: PostedUtil,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
      },
      headerTintColor: '#fff',
      header: null,
    },
  },
  MembInfo: {
    screen: MembInfo,
    navigationOptions: {
      header: null,
    },
  },
  ApprovedUtilModal: {
    screen: ApprovedUtilModal,
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
    },
  },
});

export default createAppContainer(AppStack);

const styles = StyleSheet.create({
  backIcon: {
    padding: 10,
  },
});
