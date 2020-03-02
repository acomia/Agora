import React from 'react';
import {Alert, StyleSheet, View, Image, StatusBar} from 'react-native';
import {
  Container,
  Button,
  Text,
  Left,
  Item,
  Input,
  Label,
  Icon,
} from 'native-base';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';

export default class ChangePassword extends React.Component {
  constructor() {
    super();
    this.state = {
      new_PW: '',
      confirm_PW: '',
      isLoading: false,
      securePW: true,
      secureConfirmPW: true,
    };
  }

  CHANGE_PW() {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{6,50}$/;

    if (this.state.new_PW !== this.state.confirm_PW) {
      return Alert.alert('', 'Password does not match!');
    }
    if (!regularExpression.test(this.state.new_PW)) {
      return Alert.alert(
        'Oops!',
        'Password must contain at least one digit number, one uppercase letter, and one special character ( !@#$%^&*. ).',
      );
    }
    this.setState({isLoading: true});
    const {OTP_CODE, EMAIL_ADD} = this.props.navigation.state.params;
    console.log('CPW', OTP_CODE, EMAIL_ADD, this.state.new_PW);
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/member/forgotpassword/changepassword',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verification_code: OTP_CODE,
          email_address: EMAIL_ADD,
          new_password: this.state.new_PW,
        }),
      },
    )
      .then(response => {
        response.json().then(data => {
          if (data.error_message === 'Successfully updated.') {
            this.setState({isLoading: false});
            this.props.navigation.navigate('LoginPage');
          } else {
            console.log('Error');
            this.setState({visibleModal: true, isLoading: false});
          }
        });
      })
      .catch(error => {
        alert('Error!' + error);
        this.setState({isLoading: false});
      });
  }

  render() {
    return (
      // <KeyboardAvoidingView style={styles.topContent} behavior="padding">
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <View style={styles.topContent}>
          <Image
            style={{width: 100, height: 100, margin: 30}}
            source={require('../../assets/images/forgot_pw.png')}
            resizeMode="center"
          />
          <Label style={styles.chagePasswordText}>Change Password</Label>
          <Label style={{textAlign: 'center', margin: 30}}>
            Please enter your new password
          </Label>
        </View>
        <View style={styles.bottomContent}>
          <Item floatingLabel style={styles.formStyle}>
            <Icon name="md-lock" />
            <Label>New password</Label>
            <Input
              value={this.state.new_PW}
              onChangeText={new_PW => this.setState({new_PW})}
              secureTextEntry={this.state.securePW}
            />
            <Icon
              onPress={() => {
                this.state.securePW
                  ? this.setState({securePW: false})
                  : this.setState({securePW: true});
              }}
              type="Octicons"
              name={this.state.securePW ? 'eye' : 'eye-closed'}
              style={{
                color: 'silver',
                fontSize: 22,
              }}
            />
          </Item>
          <Item floatingLabel style={styles.formStyle}>
            <Icon name="md-lock" />
            <Label>Confirm new password</Label>
            <Input
              value={this.state.confirm_PW}
              onChangeText={confirm_PW => this.setState({confirm_PW})}
              secureTextEntry={this.state.secureConfirmPW}
            />
            <Icon
              onPress={() => {
                this.state.securePW
                  ? this.setState({secureConfirmPW: false})
                  : this.setState({secureConfirmPW: true});
              }}
              type="Octicons"
              name={this.state.secureConfirmPW ? 'eye' : 'eye-closed'}
              style={{
                color: 'silver',
                fontSize: 22,
              }}
            />
          </Item>
          <Button block rounded info onPress={() => this.CHANGE_PW()}>
            {this.state.isLoading ? (
              <Spinner color={'#fff'} size={60} type={'ThreeBounce'} />
            ) : (
              <Text style={{fontWeight: 'bold'}}>Submit</Text>
            )}
          </Button>
        </View>
        <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <Text style={[styles.textModalStyle, {color: 'red'}]}>Oops! </Text>
            <Text style={[styles.textModalStyle, {margin: 5}]}>
              unable to reset your password
            </Text>
            <Image
              style={{width: 40, height: 40}}
              source={require('../../assets/images/database_error.png')}
              resizeMode="center"
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 6,
            }}>
            <Button
              block
              rounded
              info
              onPress={() => this.setState({visibleModal: false})}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
                O K A Y
              </Text>
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  chagePasswordText: {
    color: '#5fb650',
    fontSize: 30,
    fontWeight: 'bold',
  },
  formStyle: {
    marginVertical: 20,
  },
  topContent: {
    height: '50%',
    // padding: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomContent: {
    height: '50%',
    paddingHorizontal: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  textModalStyle: {
    color: '#5fb650',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
