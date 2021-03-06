import React from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {
  Container,
  Header,
  Text,
  Icon,
  Thumbnail,
  Button,
  H1,
  Left,
  Body,
  Right,
  Card,
  CardItem,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import SwiperFlatList from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import Dialog from 'react-native-dialog';
import Spinner from 'react-native-spinkit';
import {
  MEDGATE_TOKEN_REQUEST_TEST,
  MEDGATE_TOKEN_REQUEST_LIVE,
  MEDGATE_CALLBACK_REQUEST_TEST,
  MEDGATE_CALLBACK_REQUEST_LIVE,
} from '../util/api.js';

export default class SideBar extends React.Component {
  state = {
    dialogVisible: false,
    mobileNumber: '',
    accessToken: '',
    tokenType: '',
    expiresIn: 0,
  };

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleCancel = () => {
    console.log("Oops",'click cancel');
    this.setState({dialogVisible: false});
  };

  handleSubmit = () => {
    console.log('mobileNumber: ' + this.state.mobileNumber);

    if (this.state.mobileNumber === '') {
      Alert.alert("Oops",'Please provide mobile number!');
      return;
    }

    if (this.state.mobileNumber.length < 10) {
      Alert.alert("Oops",'Please input a valid number!');
      return;
    }
 
    this.postMedgateToken();
    this.getMedgateCallbackRequest();

    this.refresh();
  };

  refresh() {
    this.setState({
      mobileNumber: '',
      accessToken: '',
    });
    this.setState({dialogVisible: false});
    console.log('state refresh');
  }

  //Get Token from Medgate
  postMedgateToken() {

    this.setState({
      isLoading: true,
    });

    var details = {
      grantType: 'clientCredentials',
      // test
      clientId: '1886D070-DC43-435E-94BD-56581D7097B7',
      clientSecret: '111E76AE-7F6D-4924-8095-083300DFC7D0',

      // live
      // clientId: '1886D070-DC43-435E-94BD-56581D7097B7',
      // clientSecret: '111E76AE-7F6D-4924-8095-083300DFC7D0',
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    fetch(
      // test
      MEDGATE_TOKEN_REQUEST_TEST,

      // live2
      // MEDGATE_TOKEN_REQUEST_LIVE,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      },
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          accessToken: responseData.accessToken,
          tokenType: responseData.tokenType,
          expiresIn: responseData.expiresIn,
          isLoading: false
        });
        console.log('authentication');
        console.log('accessToken:' + this.state.accessToken);
        console.log('tokenType:' + this.state.tokenType);
        console.log('expiresIn:' + this.state.expiresIn);  
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
        Alert.alert('Error!' + error);
      });
  }

  //Medgate Callback Request
  getMedgateCallbackRequest() {
    
    this.setState({
      isLoading: true,
    });

    fetch(

      // test
      MEDGATE_CALLBACK_REQUEST_TEST +

      // live
      // MEDGATE_CALLBACK_REQUEST_LIVE +
        this.state.mobileNumber +
        '&provider=Intellicare',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.state.accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(responseData => {
        console.log('callback request');
        console.log('token: ' + this.state.accessToken);
        console.log(responseData);
        this.setState({
          isLoading: false,
        });
        if (responseData.isSuccess) alert(responseData.data);
        else {
          if (responseData.error['code']) {
            if (responseData.error['code'] == '500')
            Alert.alert("Oops",'You already scheduled a callback earlier.');
            else if ((responseData.error['code'] = '400'))
            Alert.alert(responseData.error['message']);
            else  Alert.alert("Oops",'Invalid request. Try again.');
          } else  Alert.alert("Oops",'Communication error.');

          this.setState({
            isLoading: false,
          });

        }
        ;
      })
      .catch(error => {
        //alert('Error!' + error);
        this.setState({
          isLoading: false,
        });
        Alert.alert("Oops",'Unable to contact Medgate server.');
      });
  }

  componentDidMount() {
    this.postMedgateToken();
  }

  render() {
    const {spinnerStyle} = styles;

    return (
      <Container style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          {/* <View style={styles.header}>
            <Image
              source={require('../../assets/images/medgatelogo-white.png')}
              style={styles.medgate}
              resizeMode="contain"
            />
          </View> */}
          {/* <View style={{padding: 20}}>
            <Text style={styles.title}>
              Call Doc. Anytime. Anywhere. No lines.™
            </Text>
            <Text style={styles.subtitle}>
              Get your hassle-free medical consultation. Our Filipino specialist
              doctors are just a phone call away to give you the care you
              deserve.
            </Text>
          </View> */}
          <View style={styles.swiperFeatures}>
            <SwiperFlatList
              autoplay
              autoplayDelay={10}
              autoplayLoop
              index={0}
              paginationDefaultColor="#c4c4c4"
              paginationActiveColor="#258bf5"
              showPagination
              paginationStyle={{marginVertical: 0}}
              paginationStyleItem={{
                height: 10,
                width: 10,
                marginHorizontal: 5,
              }}>
              <View style={styles.child}>
                <View style={styles.MedgateContents}>
                  <Image
                    source={require('../../assets/images/card-calldoc.png')}
                    style={styles.Telemedicine}
                    resizeMode="contain"
                  />
                  <Text style={styles.cardTitle}>Call Doc</Text>
                  <Text style={styles.cardDetails}>Manila: 028 705 0700</Text>
                  <Text style={styles.cardDetails}>Globe: 0917 829 9996</Text>
                  <Text style={styles.cardDetails}>Smart: 0998 990 7540</Text>
                  <Text style={styles.cardDetails}>Sun: 0925 714 7794</Text>
                </View>
              </View>
              <View style={styles.child}>
                <View style={styles.MedgateContents}>
                  <Image
                    source={require('../../assets/images/card-triage.png')}
                    style={styles.Telemedicine}
                    resizeMode="contain"
                  />
                  <Text style={styles.cardTitle}>Triage</Text>
                  <Text style={styles.cardDetails}>
                    A telemedicine assistant will assess your concern and
                    transfer you to our specialist doctor
                  </Text>
                </View>
              </View>
              <View style={styles.child}>
                <View style={styles.MedgateContents}>
                  <Image
                    source={require('../../assets/images/card-consult.png')}
                    style={styles.Telemedicine}
                    resizeMode="contain"
                  />
                  <Text style={styles.cardTitle}>Consult</Text>
                  <Text style={styles.cardDetails}>
                    Speak to a Medgate specialist doctor through your mobile
                    phone
                  </Text>
                </View>
              </View>
              <View style={styles.child}>
                <View style={styles.MedgateContents}>
                  <Image
                    source={require('../../assets/images/card-etreatment.png')}
                    style={styles.Telemedicine}
                    resizeMode="contain"
                  />
                  <Text style={styles.cardTitle}>E-treatment</Text>
                  <Text style={styles.cardDetails}>
                    Receive your e-prescription and care plan via email
                  </Text>
                </View>
              </View>
            </SwiperFlatList>
          </View>

          <View style={{padding: 50, flex: 1}}>
            <Button
              iconLeft
              rounded
              style={{backgroundColor: '#258bf5', flexDirection: 'row',justifyContent: 'center'}}
              onPress={this.showDialog}>
              <Icon type="Ionicons" name="ios-call" />
              <Text >Request Callback!</Text>
            </Button>
          </View>
          <View>
            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Description style={{padding: 20}}>
                Need to speak to a doctor now? Provide your details and Medgate
                will call you.
              </Dialog.Description>
              <Dialog.Input
                keyboardType="phone-pad"
                label="Mobile Number"
                onChangeText={mobileNumber =>
                  this.setState({mobileNumber})
                }></Dialog.Input>
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
              <Dialog.Button
                label="Submit"
                bold={true}
                onPress={this.handleSubmit}
              />
            </Dialog.Container>
          </View>
          {/* <View style={{padding: 50, backgroundColor: '#fff'}}>
            <Text style={{fontSize: 24, color: '#258bf5', fontWeight: 'bold'}}>
              Easy, fast, secure.
            </Text>
            <Text style={{color: '#2d2d2d', fontSize: 14}}>
              Download the Medgate Philippines app now!
            </Text>
            <Text style={{color: '#2d2d2d', fontSize: 14}}>
              Call Doc. Anytime. Anywhere. No lines.™
            </Text>
          </View> */}
        </ScrollView>
        {
          this.state.isLoading && (
            <View style={spinnerStyle}>
              <Spinner color={'#4287f5'} size={60} type={'ThreeBounce'} />
            </View>
          )
        }
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#258bf5',
    padding: 30,
    alignItems: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    borderWidth: 0,
    shadowColor: '#fff',
    shadowOffset: {width: 10, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    color: '#258bf5',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: '#258bf5',
    alignSelf: 'center',
    textAlign: 'justify',
  },
  HowToUse: {
    fontSize: 24,
    color: '#258bf5',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 30,
  },
  WhatIsMedgate: {
    fontSize: 20,
    color: '#2d2d2d',
    alignSelf: 'center',
  },
  medgate: {
    height: height * 0.05,
    width: width * 0.5,
    marginBottom: 10,
  },
  MedgateContents: {
    flex: 5,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginHorizontal: 40,
    justifyContent: 'center',
  },
  Telemedicine: {
    height: height * 0.15,
    width: width * 0.5,
    marginVertical: 10,
    alignSelf: 'center',
  },

  swiperFeatures: {
    flex: 2,
    justifyContent: 'center',
  },
  child: {
    marginBottom: 20,
    paddingVertical: 20,
    height: height * 0.6,
    width,
  },
  cardTitle: {
    color: '#2d2d2d',
    alignSelf: 'center',
    marginVertical: 10,
  },
  cardDetails: {
    color: '#2d2d2d',
    textAlign: 'center',
    fontSize: 12,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
