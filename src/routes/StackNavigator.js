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
import Members from '../screens/Members';
import MemberInformation from '../screens/MemberInformation';
import ApprovedUtilModal from '../screens/ApprovedUtilModal';
// import PostedUtil from "../screens/PostedUtil"
import MembInfo from '../screens/MembInfo';
// import ApprovedUtil from "../screens/ApprovedUtil"
import Intellimap from '../screens/Intellimap';
import VerifyOTP from '../screens/VerifyOTP';
import ChangePassword from '../screens/ChangePassword';
import DoctorSearchNavigation from '../routes/DoctorSearchNavigation';
import Medgate from '../screens/Medgate';
import ApprovedUtil from '../screens/ApprovedUtil';
import PostedUtil from '../screens/PostedUtil';
import EditProfile from '../screens/EditProfile';
import Benefits from '../screens/Benefits';
import ERCS1Request from '../screens/ERCS1Request';
import ERCS1Landing from '../screens/ERCS1Landing';
import ERCS1Success from '../screens/ERCS1Success';
import ERCS1History from '../screens/ERCS1History';
import ERCS2Request from '../screens/ERCS2Request';
import ERCS2Landing from '../screens/ERCS2Landing';
import ERCS2Success from '../screens/ERCS2Success';

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
        height: 80,
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
        height: 80,
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
        height: 80,
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
        height: 80,
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
        height: 80,
      },
      headerTintColor: '#fff',
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
  VerifyOTP: {
    screen: VerifyOTP,
  },
  ChangePassword: {
    screen: ChangePassword,
  },
  IntellimapPage: {
    screen: Intellimap,
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
  EditProfilePage: {
    screen: EditProfile,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
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
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  BenefitsPage: {
    screen: Benefits,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ERCS1RequestPage: {
    screen: ERCS1Request,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#ffff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#2d2d2d',
    },
  },
  ERCS1SuccessPage: {
    screen: ERCS1Success,
    navigationOptions: {
      header: null,
    },
  },
  ERCS1LandingPage: {
    screen: ERCS1Landing,
    navigationOptions: {
      header: null,
    },
  },
  ERCS1HistoryPage: {
    screen: ERCS1History,
    navigationOptions: {
      title: 'Transaction History',
      headerStyle: {
        backgroundColor: '#5fb650',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ERCS2SuccessPage: {
    screen: ERCS2Success,
    navigationOptions: {
      header: null,
    },
  },
  ERCS2RequestPage: {
    screen: ERCS2Request,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#2d2d2d',
    },
  },
  ERCS2LandingPage: {
    screen: ERCS2Landing,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(AppStack);

const styles = StyleSheet.create({
  backIcon: {
    padding: 10,
  },
});
