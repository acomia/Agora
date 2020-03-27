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
import AsyncStorage from '@react-native-community/async-storage';
import {RCS2_SENDTOMAIL} from '../util/api';

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
    console.log('resend', token, email, mid, global.acctNum, global.rcs2Num);
    fetch(RCS2_SENDTOMAIL + global.rcs2Num, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        EmailAddress: email,
        AccountNo: global.acctNum,
        AccountID: mid,
        //'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        response.json().then(data => {
          if (data.is_success === true) {
            return Alert.alert('','RCS sent to Email Successfully');
          } else {
            return Alert.alert('Oops',data.error_message);
          }
        });
      })
      .catch(error => {
        return Alert.alert('Oops',+ error);
      });
  }

  render() {
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
            style={{fontSize: 100, color: '#e74c3c'}}
          />
          <Text style={styles.headerTitle}>Approved!</Text>
          <Text style={styles.subHeader}>
            Your e-RCS 2 no. for this transaction is
          </Text>
          <Text style={styles.ercsText}>{global.rcs2Num}</Text>
          <Text style={styles.subHeader1}>
            We have sent your Referral Control Sheet 2 (RCS 2) form to your
            registered e-mail address. You may print and present it to your
            chosen facility and proceed with the availment.
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
    color: '#e74c3c',
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
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonHome: {
    backgroundColor: '#e74c3c',
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
