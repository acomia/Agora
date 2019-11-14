import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {Container, Button, Text, Form, Item, Input, Label} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const ACCESS_TOKEN = 'access_token';
const MEMBER_ID = 'member_id';
const MEMB_ACCOUNTNO = 'memb_accountno';

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [NavigationActions.navigate({routeName: 'Dashboard'})],
});

export default class Login extends React.Component {
  constructor() {
    super();
    global.loginToken = '';
  }
  state = {
    username: '',
    password: '',
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
      console.log('memb id is: ' + membid);
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

  async getacct() {
    try {
      let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
      console.log('memb acct is: ' + membacct);
    } catch (error) {
      console.log('CANT GET ACCT NO');
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
        alert('Error!' + error);
      });
  }

  _postRequest() {
    fetch('http:192.168.9.104:3005/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(response => {
        response.json().then(data => {
          alert(JSON.stringify(data.message));
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }

  _postUser() {
    fetch('http://52.230.122.226:3000/api/v1/login', {
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
          if (data.status === 200) {
            let accessToken = data.token;
            this.storeToken(accessToken);

            let membId = data.user_info.id.toString();
            this.storememberId(membId);

            let memb_Accountno = data.user_info.account_no;
            this.storeacct(memb_Accountno);

            this.props.navigation.dispatch(resetAction);
          } else {
            alert(data.message);
          }
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }

  // _postUser() {
  //   // alert('sample')
  //   // return
  //   fetch('http:192.168.9.104:3005/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=UTF-8',
  //     },
  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password,
  //     }),
  //   })
  //     .then(response => {
  //       response.json().then(data => {
  //         alert(JSON.stringify(data.message));
  //         if (data.message === 'User found!') {
  //           alert;
  //           this.props.navigation.navigate('DashboardPage');
  //         } else {
  //           alert('Username not found!');
  //         }
  //       });
  //     })
  //     .catch(error => {
  //       alert('Error!' + error);
  //     });
  // }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  headerBackground: {
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
  },
  loginForm: {
    flex: 4,
    padding: 10,
    paddingHorizontal: 30,
  },
  companyLogo: {
    flex: 2,
    padding: 20,
    justifyContent: 'center',
  },
  imageStyle: {
    flex: 1,
    height: '10%',
    width: width * 0.65,
    alignSelf: 'center',
  },
  fullertonLabel: {
    color: '#273c75',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: -75,
    alignSelf: 'center',
  },
  labelStyle: {
    marginBottom: 5,
  },
  footer: {
    flex: 1,
    paddingBottom: 10,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
  },
  buttonBack: {
    color: '#2d2d2d',
    width: 30,
    height: 30,
  },
  ForgotPasswordLink: {
    color: '#3498db',
    fontSize: 16,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
