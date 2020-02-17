import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Text, Item, Input, Label, Icon, Container} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';

export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {email_add: '', visibleModal: false, isLoading: false};
  }

  RESET_PW() {
    this.setState({isLoading: true});
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/verification/forgotpassword/send?postedfrom=mobile',
      {
        method: 'PUT',
        headers: {
          EmailAddress: this.state.email_add,
        },
        // params: {
        //     postedfrom: 'mobile'
        // }
      },
    )
      .then(response => {
        response.json().then(data => {
          if (
            data.error_message === 'Successfully generate verification code.'
          ) {
            this.setState({isLoading: false});
            this.props.navigation.navigate('VerifyOTP', {
              routeAddress: 'forgot_PW',
              emailAddress: this.state.email_add,
            });
          } else {
            this.setState({visibleModal: true, isLoading: false});
          }
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }

  render() {
    return (
      // <KeyboardAvoidingView
      //     style={styles.topContent}
      //     behavior="padding"
      // >
      <Container style={styles.container}>
        <View style={styles.topContent}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../../assets/images/forgot_pw.png')}
            resizeMode="center"
          />
          <Label style={styles.forgotPWText}>Forgot Password?</Label>
          <Label style={{textAlign: 'center', paddingHorizontal: 30}}>
            We just need your registered email address to send your password
            reset code
          </Label>
        </View>
        <View style={styles.bottomContent}>
          <Item style={styles.formStyle}>
            <Icon
              active
              type="FontAwesome5"
              name="envelope"
              style={{justifyContent: 'center'}}
            />
            <Input
              placeholder="Email Address"
              value={this.state.email_add}
              onChangeText={email_add => this.setState({email_add})}
              autoCapitalize={false}
            />
          </Item>
          <Button block rounded info onPress={() => this.RESET_PW()}>
            {this.state.isLoading ? (
              <Spinner color={'#fff'} size={60} type={'ThreeBounce'} />
            ) : (
              <Text>RESET PASSWORD</Text>
            )}
          </Button>
        </View>
        <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <Text style={[styles.textModalStyle, {color: 'red'}]}>Oops,</Text>
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
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingVertical: 4,
            }}>
            <Button
              block
              rounded
              warning
              onPress={() => this.setState({visibleModal: false})}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
                Okay
              </Text>
            </Button>
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  forgotPWText: {
    color: '#5fb650',
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputPassword: {
    marginHorizontal: 10,
  },
  labelPassword: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    color: '#5fb650',
  },
  formStyle: {
    marginVertical: 20,
  },
  container: {
    display: 'flex',
  },
  topContent: {
    flex: 1,
    height: '50%',
    // padding: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 8,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});
