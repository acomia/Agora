import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  TouchableNativeFeedback,
  Modal,
  TouchableHighlight,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Input,
  Button,
  Text,
  Title,
  Left,
  Right,
  Body,
  Label,
  Thumbnail,
  ListItem,
  Icon,
  Item,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import {RCS1_SENDTOMAIL} from '../util/api';

const ACCESS_TOKEN = 'access_token';
const MEMB_EMAIL = 'memb_email';
const MEMBER_ID = 'member_id';

export default class ERCS1Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  async _resendemail() {
    <ActivityIndicator size="small" color="white" />;
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let email = await AsyncStorage.getItem(MEMB_EMAIL);
    let mid = await AsyncStorage.getItem(MEMBER_ID);
    fetch(RCS1_SENDTOMAIL + global.rcsNum, {
      method: 'GET',
      params: {
        no: global.rcsNum,
      },
      headers: {
        Authorization: 'Bearer ' + token,
        EmailAddress: email,
        AccountNo: global.acctNum,
        AccountID: mid,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        response.json().then(data => {
          console.log('final', data);
          if (data.is_success === true) {
            alert('Resend Email Successfully');
          } else {
            alert(data.error_message);
          }
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }

  render() {
    // const { navigation } = this.props;
    // const rcsNumber = navigation.getParam('rcsNo', '');
    // const acctNUmber = navigation.getParam('acctNo', '');

    console.log('sa kabila rcs', global.rcsNum);
    console.log('sa kabila accc', global.acctNum);
    return (
      <Container style={{display: 'flex'}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            paddingHorizontal: 30,
          }}>
          <Icon
            type="SimpleLineIcons"
            name="check"
            style={{fontSize: 100, color: '#5fb650'}}
          />
          <Text style={styles.headerTitle}>Success!</Text>
          <Text style={styles.subHeader}>
            Your e-RCS 1 no. for this transaction is
          </Text>
          <Text style={styles.ercsText}>{global.rcsNum}</Text>
          <Text style={styles.subHeader1}>
            We have sent your Referral Control Sheet 1 (RCS 1) form to your
            registered e-mail address. You may print and present it to your
            chosen facility and avail your consultation.
          </Text>
        </View>
        <View style={styles.viewButton}>
          <Button
            iconLeft
            block
            rounded
            info
            style={styles.buttonResend}
            onPress={() => this._resendemail()}>
            <Icon type="Ionicons" name="ios-mail" />
            <Text>Resend e-mail</Text>
          </Button>
          <Button
            iconLeft
            rounded
            success
            block
            style={styles.buttonHome}
            onPress={() => this.props.navigation.navigate('DashboardPage')}>
            <Icon type="Ionicons" name="md-home" />
            <Text>Go back home</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#5fb650',
    marginBottom: 30,
  },
  subHeader: {
    color: '#6d6e72',
    textAlign: 'center',
  },
  subHeader1: {
    color: '#6d6e72',
    textAlign: 'center',
    marginTop: 30,
  },
  ercsText: {
    color: '#5fb650',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonHome: {
    backgroundColor: '#5fb650',
    color: '#fff',
  },
  buttonResend: {
    color: '#fff',
    justifyContent: 'center',
    marginBottom: 20,
  },
  viewButton: {
    flex: 1,
    margin: 20,
  },
});
