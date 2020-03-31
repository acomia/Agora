import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
  StatusBar,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Left,
  Body,
  Thumbnail,
  Icon,
  Right,
  Title,
  Label,
  Item,
} from 'native-base';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ScrollView } from 'react-native-gesture-handler';
import { MEDGATE } from '../util/api';

const ACCESS_TOKEN = 'access_token';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight();

export default class OnBoarding extends React.Component {
  componentWillMount() {
    this.getToken();
  }
  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) {
        console.log('No token');
      } else {
        console.log('token is: ' + accessToken);
        this.props.navigation.replace('Dashboard');
      }
    } catch (error) {
      console.log('ERROR');
    }
  }

  _MedgateApi() {
    fetch(MEDGATE, {
      method: 'GET',
      Params: {
        Name: 'MEDGATE',
      },
    })
      .then(response => {
        response.json().then(medgatemsg => {
          //console.log('medgate', medgatemsg)
          if (medgatemsg.data.is_active === false) {

            return Alert.alert('Attention!', medgatemsg.data.callback_msg
              + '\n\nYou may still reach them by calling them directly through the following numbers:'
              + '\n\nManila: 02 8075 0700'
              + '\n\nCebu: 032 265 5111'
              + '\n\nDavao: 082 285 5111'
              + '\n\nDumaguete: 035 522 5111'
              + '\n\nGlobe: 0917 536 2156/ 0917 536 2715/ 0917 548 7672'
              + '\n\nSmart: 0998 990 7540/ 0998 990 7541/ 0998 843 2880'
              + '\n\nSun: 0925 714 7794/ 0925 714 7793');
          } else {
            if (medgatemsg.data.is_active === true) {
              Alert.alert('NOTE', 'Please ready your Account and Card number for verification.',
                [
                  { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                  { text: 'OK', onPress: () => this.props.navigation.navigate('MedgatePage') },
                ],
                { cancelable: false }
              )
            }
          }
        });
      })
      .catch(error => {
        return Alert.alert('Oops', + error);
      });
  }

  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={require('../../assets/images/photo5.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.sectionWelcome}>
            <View style={styles.welcomeLabelLogo}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../../assets/images/intellicare-logo-white.png')}
                  style={styles.logoStyle}
                  resizeMode="contain"
                />
                <Image
                  source={require('../../assets/images/avega-logo-white.png')}
                  style={styles.logoStyle}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.welcomeLabel}>
                Your healthcare mobile app, right in your hands!
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              success
              rounded
              style={styles.buttonSignIn}
              onPress={() => this.props.navigation.navigate('LoginPage')}>
              <Text style={styles.textButtonSignIn}>Sign in</Text>
            </Button>
            <Button
              light
              rounded
              style={styles.buttonCreateAccount}
              onPress={() => this.props.navigation.navigate('RegisterPage')}>
              <Text style={styles.textButtonCreateAccount}>Register</Text>
            </Button>
          </View>
          <View
            style={{
              fle: 1,
              justifyContent: 'center',
              padding: 10,
              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
              You can also:
            </Text>
          </View>
          <View style={styles.viewFeatures}>
            <SwiperFlatList
              autoplay
              autoplayDelay={3}
              autoplayLoop
              index={0}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}>
              <Card transparent style={styles.cardContainer}>
                <CardItem style={styles.cardItemStyle}>
                  <Body style={{ justifyContent: 'space-evenly' }}>
                    <Icon
                      type="SimpleLineIcons"
                      name="earphones-alt"
                      style={styles.cardIconStyleMedgate}
                    />
                    <Label style={{ textAlign: 'center' }}>
                      Call Doc. Anywhere. Anytime. No line.
                    </Label>
                    <Button
                      iconRight
                      rounded
                      style={styles.cardButtonMedgate}
                      onPress={() => this._MedgateApi()
                      }>
                      <Text style={styles.cardButtonText}>Medgate</Text>
                      <Icon type="Ionicons" name="ios-arrow-forward" />
                    </Button>
                  </Body>
                </CardItem>
              </Card>
              <Card transparent style={styles.cardContainer}>
                <CardItem style={styles.cardItemStyle}>
                  <Body style={{ justifyContent: 'space-evenly' }}>
                    <Icon
                      type="SimpleLineIcons"
                      name="map"
                      style={styles.cardIconStyleIntellimap}
                    />
                    <Label style={{ textAlign: 'center' }}>
                      Locate our Accredited Facilities.
                    </Label>
                    <Button
                      iconRight
                      rounded
                      style={styles.cardButtonIntellimap}
                      onPress={() => this.props.navigation.navigate('MapPage')}>
                      <Text style={styles.cardButtonText}>Agora Map</Text>
                      <Icon type="Ionicons" name="ios-arrow-forward" />
                    </Button>
                  </Body>
                </CardItem>
              </Card>
              <Card transparent style={styles.cardContainer}>
                <CardItem style={styles.cardItemStyle}>
                  <Body style={{ justifyContent: 'space-evenly' }}>
                    <Icon
                      type="SimpleLineIcons"
                      name="magnifier"
                      style={styles.cardIconStyleProviders}
                    />
                    <Label style={{ textAlign: 'center' }}>
                      Our Accredited Doctors and Dentists.
                    </Label>
                    <Button
                      iconRight
                      rounded
                      style={styles.cardButtonProviders}
                      onPress={() =>
                        this.props.navigation.navigate('DoctorSearchNavigation')
                      }>
                      <Text style={styles.cardButtonText}>Providers</Text>
                      <Icon type="Ionicons" name="ios-arrow-forward" />
                    </Button>
                  </Body>
                </CardItem>
              </Card>
              {/* <Card transparent style={styles.cardContainer}>
                <CardItem style={styles.cardItemStyle}>
                  <Body style={{ justifyContent: 'space-evenly' }}>
                    <Icon type="SimpleLineIcons" name="book-open" style={styles.cardIconStyleGuidebook} />
                    <Label style={{ textAlign: 'center' }}>Learn more about your benefit coverage.</Label>
                    <Button iconRight rounded style={styles.cardButtonGuidebook}>
                      <Text style={styles.cardButtonText}>e-Guidebook</Text>
                      <Icon type="Ionicons" name='ios-arrow-forward' />
                    </Button>
                  </Body>
                </CardItem>
              </Card> */}
            </SwiperFlatList>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  sectionWelcome: {
    flex: 2,
    justifyContent: 'center',
    padding: 10,
  },
  welcomeLabelLogo: {
    alignItems: 'center',
  },
  welcomeLabel: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  logoStyle: {
    paddingHorizontal: 30,
    height: 80,
    width: 120,
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonSignIn: {
    flex: 1,
    margin: 5,
  },
  textButtonSignIn: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonCreateAccount: {
    backgroundColor: '#ffffff',
    flex: 1,
    margin: 5,
    textAlign: 'center',
  },
  textButtonCreateAccount: {
    color: '#5fb650',
  },
  labelOR: {
    color: '#fff',
  },
  viewFeatures: {
    flex: 1.5,
    justifyContent: 'center',
  },
  cardContainer: {
    width: SCREEN_WIDTH / 2,
  },
  cardContent: {
    color: '#2d2d2d',
    alignSelf: 'center',
  },
  cardItemStyle: {
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    flex: 1,
  },
  cardIconStyleMedgate: {
    color: '#258bf5',
    fontSize: SCREEN_HEIGHT > 750 ? 40 : 30,
    marginVertical: SCREEN_HEIGHT > 750 ? 10 : 2,
    alignSelf: 'center',
  },
  cardIconStyleIntellimap: {
    color: '#f39c12',
    fontSize: SCREEN_HEIGHT > 750 ? 40 : 30,
    marginVertical: SCREEN_HEIGHT > 750 ? 10 : 2,
    alignSelf: 'center',
  },
  cardIconStyleProviders: {
    color: '#e74c3c',
    fontSize: SCREEN_HEIGHT > 750 ? 40 : 30,
    marginVertical: SCREEN_HEIGHT > 750 ? 10 : 2,
    alignSelf: 'center',
  },
  cardIconStyleGuidebook: {
    color: '#2ecc71',
    fontSize: SCREEN_HEIGHT > 750 ? 40 : 30,
    marginVertical: SCREEN_HEIGHT > 750 ? 10 : 0,
    alignSelf: 'center',
  },
  cardButtonMedgate: {
    marginVertical: SCREEN_HEIGHT > 750 ? 10 : 4,
    backgroundColor: '#258bf5',
    alignSelf: 'center',
    height: 40,
  },
  cardButtonIntellimap: {
    marginVertical: SCREEN_HEIGHT > 750 ? 10 : 4,
    backgroundColor: '#f39c12',
    alignSelf: 'center',
    height: 40,
  },
  cardButtonProviders: {
    marginVertical: SCREEN_HEIGHT > 750 ? 10 : 4,
    backgroundColor: '#e74c3c',
    alignSelf: 'center',
    height: 40,
  },
  cardButtonGuidebook: {
    marginVertical: SCREEN_HEIGHT > 750 ? 10 : 0,
    backgroundColor: '#2ecc71',
    alignSelf: 'center',
    // bottom: SCREEN_HEIGHT > 750 ? 0 : 6,
    height: 40,
  },
  cardButtonText: {
    color: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
});
