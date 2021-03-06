import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-spinkit';
import {MEMBER_LOGIN, SEND_EMAIL_VERIFICATION} from '../util/api.js';

const ACCESS_TOKEN = 'access_token';
const MEMBER_ID = 'member_id';
const MEMB_ACCOUNTNO = 'memb_accountno';
const MEMB_NAME = 'memb_name';
const MEMB_EMAIL = 'memb_email';
const MEMB_CARDNO = 'memb_cardno';

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [NavigationActions.navigate({routeName: 'Dashboard'})],
});

// Subscribe
const unsubscribe = NetInfo.addEventListener(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
});

// Unsubscribe
unsubscribe();

NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
});

export default class Login extends React.Component {
  constructor() {
    super();
    global.loginToken = '';
  }
  state = {
    username: '',
    password: '',
    LoginSubmit: false,
    securePW: true,
  };

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch (error) {
      console.log('CANT STORE TOKEN');
    }
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log('token is: ' + token);
    } catch (error) {
      console.log('CANT GET TOKEN');
    }
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch (error) {
      console.log('CANT STORE TOKEN');
    }
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log('token is: ' + token);
    } catch (error) {
      console.log('CANT GET TOKEN');
    }
  }

  render() {
    return (
      <ScrollView>
        <Container>
          <ImageBackground
            source={require('../../assets/images/white-with-skin.jpg')}
            style={styles.backgroundImage}>
            <View style={styles.companyLogo}>
              <Image
                source={require('../../assets/images/intellicarelogo.png')}
                style={styles.imageStyle}
                resizeMode="contain"
              />
              <Label style={styles.fullertonLabel}>
                A Member of Fullerton Health
              </Label>
            </View>
            <View style={styles.loginForm}>
              <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input
                    style={styles.labelStyle}
                    onChangeText={username => this.setState({username})}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input
                    secureTextEntry
                    style={styles.labelStyle}
                    onChangeText={password => this.setState({password})}
                  />
                </Item>
              </Form>
              <Text
                style={styles.ForgotPasswordLink}
                onPress={() =>
                  this.props.navigation.navigate('ForgotPasswordPage')
                }>
                Forgot Password?
              </Text>
              <Button
                rounded
                block
                success
                style={{marginTop: 50}}
                onPress={() => this._postUser()}>
                <Text> Login </Text>
              </Button>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                By logging in to this application, I have read and understood
                the Terms and Conditions
              </Text>
            </View>
          </ImageBackground>
        </Container>
      </ScrollView>
    );
  }
  _getRequest() {
    fetch('http:192.168.1.104:3005/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(response => {
        response.json().then(data => {
          alert(JSON.stringify(data.key));
        });
      })
      .catch(error => {
        Alert.alert('Oops', 'Error!' + error);
      });
  }

  //store memb_id
  async storememberId(membId) {
    try {
      await AsyncStorage.setItem(MEMBER_ID, membId);
      this.getId();
    } catch (error) {
      console.log('CANT STORE ID');
    }
  }

  async getId() {
    try {
      let membid = await AsyncStorage.getItem(MEMBER_ID);
      //console.log('memb id is: ' + membid);
    } catch (error) {
      console.log('CANT GET  MEMB ID');
    }
  }
  //store memb_id

  //store member account no.
  async storeacct(memb_Accountno) {
    try {
      await AsyncStorage.setItem(MEMB_ACCOUNTNO, memb_Accountno);
      this.getacct();
    } catch (error) {
      console.log('CANT STORE MEMB ACCT OR ID');
    }
  }

  async storecardno(cardno) {
    try {
      await AsyncStorage.setItem(MEMB_CARDNO, cardno);
      this.getcard();
    } catch (error) {
      console.log('CANT STORE MEMB CARD NO');
    }
  }

  async getcard() {
    try {
      let card = await AsyncStorage.getItem(MEMB_CARDNO);
      console.log('memb card is: ' + card);
    } catch (error) {
      console.log('CANT GET ACCT NO');
    }
  }

  async getacct() {
    try {
      let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
      //console.log('memb acct is: ' + membacct);
    } catch (error) {
      console.log('CANT GET ACCT NO');
    }
  }

  //store member name
  async storemembname(memb_name) {
    try {
      await AsyncStorage.setItem(MEMB_NAME, memb_name);
      this.getname();
    } catch (error) {
      console.log('CANT STORE MEMB NAME');
    }
  }

  async getname() {
    try {
      let membname = await AsyncStorage.getItem(MEMB_NAME);
      //console.log('memb name is: ' + membname);
    } catch (error) {
      console.log('CANT GET NAME');
    }
  }

  async storemembemail(memb_email) {
    try {
      await AsyncStorage.setItem(MEMB_EMAIL, memb_email);
      this.getemail();
    } catch (error) {
      console.log('CANT STORE MEMB EMAIL');
    }
  }

  async getemail() {
    try {
      let membemail = await AsyncStorage.getItem(MEMB_EMAIL);
      //console.log('memb email is: ' + membemail);
    } catch (error) {
      console.log('CANT GET EMAIL');
    }
  }
  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.header} />
        <View style={styles.contentStyle}>
          {/* <View style={{flex: 1, justifyContent: 'center'}}>
            <Image
              source={require('../../assets/images/intellicarelogo.png')}
              style={styles.imageStyle}
              resizeMode="contain"
            />
            <Label style={styles.fullertonLabel}>
              A Member of Fullerton Health
            </Label>
          </View> */}
          <View>
            <Icon
              type="SimpleLineIcons"
              name="lock-open"
              style={{
                color: '#5fb650',
                fontSize: 60,
                textAlign: 'center',
                marginBottom: 20,
              }}
            />
            <Text style={styles.headerTitle}>Sign in to your account</Text>
          </View>
          <View style={styles.loginForm}>
            <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  autoCompleteType="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.labelStyle}
                  onChangeText={username => this.setState({username})}
                />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry={this.state.securePW}
                  style={styles.labelStyle}
                  onChangeText={password => this.setState({password})}
                />
                {this.state.password !== '' ? (
                  <Icon
                    onPress={() => {
                      this.state.securePW
                        ? this.setState({securePW: false})
                        : this.setState({securePW: true});
                    }}
                    type="Octicons"
                    name={this.state.securePW ? 'eye-closed' : 'eye'}
                    style={{
                      color: 'silver',
                      fontSize: 20,
                    }}
                  />
                ) : null}
              </Item>
            </Form>
            <Button
              rounded
              block
              success
              style={{marginTop: 50}}
              onPress={() => this.checkConnectivity()}>
              {this.state.LoginSubmit ? (
                <Spinner color={'#fff'} size={60} type={'ThreeBounce'} />
              ) : (
                <Text> Login </Text>
              )}
            </Button>
            <Text note style={{textAlign: 'center', marginVertical: 30}}>
              OR
            </Text>
            <Text
              style={styles.ForgotPasswordLink}
              onPress={() =>
                this.props.navigation.navigate('ForgotPasswordPage')
              }>
              Forgot Password?
            </Text>
          </View>
        </View>
      </Container>
    );
  }

  checkConnectivity() {
    this.setState({LoginSubmit: true});
    NetInfo.fetch().then(state => {
      // console.log("Connection type2", state.type);
      //console.log("Is connected?2", state.isConnected);
      if (state.isConnected == true) {
        //alert('Online');
        this._postUser();
      } else {
        // alert('Please check your internet connection and try again.');
        Alert.alert(
          'Oops!',
          'Please check your internet connection and try again.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        this.setState({LoginSubmit: false});
      }
    });
  }

  _postUser() {
    fetch(MEMBER_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password,
      }),
    })
      .then(response => {
        response.json().then(data => {
          if (data.is_success == true) {
            if (data.error_message !== 'Verification Required!') {
              let accessToken = data.access_token;
              this.storeToken(accessToken);

              let memberId = data.data.recordid;
              this.storememberId(memberId);

              let memb_Accountno = data.data.accountno;
              this.storeacct(memb_Accountno);

              let memb_Cardno = data.data.cardno;
              this.storecardno(memb_Cardno);

              let memb_name = data.data.firstname;
              this.storemembname(memb_name);

              let memb_email = data.data.email;
              this.storemembemail(memb_email);
              this.setState({LoginSubmit: false});
              this.props.navigation.dispatch(resetAction);
            } else {
              let membfname = data.data.firstname;
              let memblname = data.data.lastname;
              let membemail = data.data.email;
              this.SEND_EMAILVERIFICATION(membfname, memblname, membemail);
            }
          } else {
            Alert.alert('Oops', data.error_message);
            this.setState({LoginSubmit: false});
          }
        });
      })
      .catch(error => {
        Alert.alert('Oops', 'Error!' + error);
      });
  }

  SEND_EMAILVERIFICATION(membfname, memblname, membemail) {
    fetch(SEND_EMAIL_VERIFICATION + membfname + '&lastname=' + memblname, {
      method: 'PUT',
      headers: {
        EmailAddress: membemail,
      },
    })
      .then(response => {
        response.json().then(data => {
          if (
            data.error_message === 'Successfully generate verification code.'
          ) {
            this.props.navigation.navigate('VerifyOTP', {
              routeAddress: 'registration',
              emailAddress: membemail,
              f_NAME: membfname,
              l_NAME: memblname,
            });
            this.setState({LoginSubmit: false});
          } else {
            Alert.alert('Oops', 'error');
            this.setState({LoginSubmit: false});
          }
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#5fb650',
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5fb650',
    textAlign: 'center',
  },
  contentStyle: {
    flex: 1,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  headerBackground: {
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
  },
  loginForm: {
    padding: 10,
    paddingHorizontal: 30,
  },
  imageStyle: {
    height: 30,
    width: width * 0.5,
    alignSelf: 'center',
  },
  fullertonLabel: {
    color: '#273c75',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'center',
  },
  labelStyle: {
    marginBottom: 5,
  },
  buttonBack: {
    color: '#2d2d2d',
    width: 30,
    height: 30,
  },
  ForgotPasswordLink: {
    color: '#3498db',
    fontSize: 12,
    alignSelf: 'center',
  },
});
