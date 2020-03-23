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
import MembInfo from '../screens/MembInfo';

import VerifyOTP from '../screens/VerifyOTP';
import ChangePassword from '../screens/ChangePassword';
import ChangeOldPassword from '../screens/ChangeOldPassword';
import DoctorSearchNavigation from '../routes/DoctorSearchNavigation';
import Medgate from '../screens/Medgate';
import EditProfile from '../screens/EditProfile';
import Benefits from '../screens/Benefits';
import ERCS1Request from '../screens/ERCS1Request';
import ERCS1Landing from '../screens/ERCS1Landing';
import ERCS1Success from '../screens/ERCS1Success';
import ERCS1History from '../screens/ERCS1History';
import ERCS2Request from '../screens/ERCS2Request';
import ERCS2Landing from '../screens/ERCS2Landing';
import ERCS2Success from '../screens/ERCS2Success';
import ERCS2History from '../screens/ERCS2History';
import ERCS2Details from '../screens/ERCS2Details';
import ERCS2CancelDetails from '../screens/ERCS2CancelDetails';
import ERCS2DisapprovedDetails from '../screens/ERCS2DisapprovedDetails';
import ERCS2DisapprovedProcedure from '../screens/ERCS2DisapprovedProcedure';
import ERCS1Details from '../screens/ERCS1Details';
import ERCS1CancelDetails from '../screens/ERCS1CancelDetails';
import ERCSCancelRemarks from '../screens/ERCSCancelRemarks';
import ERCS1CancelRemarks from '../screens/ERCS1CancelRemarks';
import ERCS2AutoApproved from '../screens/ERCS2AutoApproved';

import AgoraMap from '../screens/Map/Home';
import OfficesComponent from '../screens/Map/OfficesComponent';
import PrivacyPolicy from '../screens/PrivacyPolicy';

const STATUSBAR_HEIGHT = require('react-native-extra-dimensions-android').getStatusBarHeight();

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
      title: '',
      headerStyle: {
        backgroundColor: '#5DADE2',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: STATUSBAR_HEIGHT,
        height: 80,
      },
      headerTintColor: '#fff',
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
  MapPage: {
    screen: AgoraMap,
    navigationOptions: {
      header: <StatusBar backgroundColor="#5fb650" barStyle="light-content" />,
    },
  },

  OfficesPage: {
    screen: OfficesComponent,
    navigationOptions: {
      header: <StatusBar backgroundColor="#5fb650" barStyle="light-content" />,
    },
  },
  PrivacyPolicyPage: {
    screen: PrivacyPolicy,
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
    navigationOptions: {
      title: '',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: STATUSBAR_HEIGHT,
        height: 80,
      },
    },
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#5DADE2',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: STATUSBAR_HEIGHT,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ChangeOldPassword: {
    screen: ChangeOldPassword,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#5DADE2',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: STATUSBAR_HEIGHT,
        height: 80,
      },
      headerTintColor: '#fff',
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
      title: 'Medgate Philippines',
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
      title: 'Create your e-RCS1',
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
  ERCS1DetailsPage: {
    screen: ERCS1Details,
    navigationOptions: {
      title: 'Details',
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
  ERCS1CancelDetailsPage: {
    screen: ERCS1CancelDetails,
    navigationOptions: {
      title: 'Cancellation Details',
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
      title: 'Request for e-RCS2',
      headerStyle: {
        backgroundColor: '#e74c3c',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ERCS2LandingPage: {
    screen: ERCS2Landing,
    navigationOptions: {
      header: null,
    },
  },
  ERCS2HistoryPage: {
    screen: ERCS2History,
    navigationOptions: {
      title: 'Transaction History',
      headerStyle: {
        backgroundColor: '#e74c3c',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ERCS2DetailsPage: {
    screen: ERCS2Details,
    navigationOptions: {
      title: 'Details',
      headerStyle: {
        backgroundColor: '#e74c3c',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ERCS2CancelDetailsPage: {
    screen: ERCS2CancelDetails,
    navigationOptions: {
      title: 'Cancellation Details',
      headerStyle: {
        backgroundColor: '#e74c3c',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ERCS2DisapprovedDetailsPage: {
    screen: ERCS2DisapprovedDetails,
    navigationOptions: {
      title: 'Dispapproval Details',
      headerStyle: {
        backgroundColor: '#e74c3c',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ERCS2DisapprovedProcedurePage: {
    screen: ERCS2DisapprovedProcedure,
    navigationOptions: {
      title: 'Disapproved Procedures',
      headerStyle: {
        backgroundColor: '#e74c3c',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ERCSCancelRemarks: {
    screen: ERCSCancelRemarks,
    navigationOptions: {
      title: 'Cancel Request',
      headerStyle: {
        backgroundColor: '#e74c3c',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: 20,
        height: 80,
      },
      headerTintColor: '#fff',
    },
  },
  ERCS1CancelRemarks: {
    screen: ERCS1CancelRemarks,
    navigationOptions: {
      title: 'Cancel Request',
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
  ERCS2AutoApproved: {
    screen: ERCS2AutoApproved,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(AppStack);
