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

export default class SideBar extends React.Component {
  state = {
    dialogVisible: false,
    cardNumber: '',
    mobileNumber: '',
    accessToken: '',
    tokenType: '',
    expiresIn: 0
  };

  showAlert = () =>{
    Alert.alert(
       this.state.cardNumber
    )
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    console.log("click cancel");
    this.setState({ dialogVisible: false });
  };

  handleSubmit = () => {
    console.log("card number: " + this.state.cardNumber);
    console.log("mobile number: " + this.state.mobileNumber);

    //Medgate Callback Request
    this._postMedgateToken();

    this.setState({ dialogVisible: false });
  };

  _postMedgateToken() {
    var details = {
      'grantType': 'clientCredentials',
      'clientId': '1886D070-DC43-435E-94BD-56581D7097B7',
      'clientSecret': '111E76AE-7F6D-4924-8095-083300DFC7D0'
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch(' https://schedulingtest.medgatephilippines.com/CallbackRequestService/Token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      alert('Error!' + error);
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/medgatelogo-white.png')}
              style={styles.medgate}
              resizeMode="contain"
            />
          </View>
          <View style={{padding: 50}}>
            <Button
              iconLeft
              rounded
              style={{backgroundColor: '#258bf5', flexDirection: 'column'}}
              onPress={this.showDialog}
              >
              <Icon type="Ionicons" name="ios-call" />
              <Text>Request My Callback!</Text>
            </Button>
          </View>
          <View>
            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Description style={{padding: 20}}>
                Need to speak to a doctor now? Provide your details and Medgate will call you.
              </Dialog.Description>
              <Dialog.Input label="Intellicare Card Number" onChangeText={cardNumber => this.setState({cardNumber})}
                  ></Dialog.Input>
              <Dialog.Input label="Mobile Number" onChangeText={mobileNumber => this.setState({mobileNumber})}
                  ></Dialog.Input>                  
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
              <Dialog.Button label="Submit" bold={true} onPress={this.handleSubmit} 
              />
            </Dialog.Container>
          </View>            
          <View style={{padding: 20}}>
            <Text style={styles.title}>
              Call Doc. Anytime. Anywhere. No lines.™
            </Text>
            <Text style={styles.subtitle}>
              Get your hassle-free medical consultation. Our Filipino specialist
              doctors are just a phone call away to give you the case you
              deserve.
            </Text>
          </View>
          <LinearGradient
            colors={['#258bf5', '#1473d6']}
            style={{paddingVertical: 20}}>
            <View style={{flex: 1}}>
              <Text style={styles.HowToUse}>How to Use?</Text>
            </View>
            <View style={styles.swiperFeatures}>
              <SwiperFlatList
                autoplay
                autoplayDelay={10}
                autoplayLoop
                index={0}
                paginationDefaultColor="#fff"
                paginationActiveColor="#40ecb8"
                showPagination
                paginationStyle={{marginVertical: 0}}>
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
          </LinearGradient>

          <View style={{padding: 50, backgroundColor: '#fff'}}>
            <Text style={{fontSize: 24, color: '#258bf5', fontWeight: 'bold'}}>
              Easy, fast, secure.
            </Text>
            <Text style={{color: '#2d2d2d', fontSize: 14}}>
              Download the Medgate Philippines app now!
            </Text>
            <Text style={{color: '#2d2d2d', fontSize: 14}}>
              Call Doc. Anytime. Anywhere. No lines.™
            </Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
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
    paddingVertical: 40,
    paddingHorizontal: 40,
    marginHorizontal: 60,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    justifyContent: 'center',
  },
  Telemedicine: {
    height: height * 0.15,
    width: width * 0.5,
    marginVertical: 10,
    alignSelf: 'center',
  },

  swiperFeatures: {
    flex: 1,
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
});
