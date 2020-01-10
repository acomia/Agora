import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, Dimensions, Image, ImageBackground, TouchableNativeFeedback, StatusBar } from 'react-native'
import { Container, Header, Content, Button, Text, Card, CardItem, Left, Body, Thumbnail, Icon, Right, Title, Label, Item } from 'native-base'
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ScrollView } from 'react-native-gesture-handler';

const ACCESS_TOKEN = 'access_token';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth()
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight()

export default class OnBoarding extends React.Component {

  componentWillMount() {
    this.getToken();

  }
  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) {
        console.log("No token")
      }
      else {
        console.log("token is: " + accessToken)
        this.props.navigation.replace('Dashboard')
      }
    }
    catch (error) {
      console.log("ERROR")
    }

  }

  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground source={require('../../assets/images/photo2.jpg')} style={styles.backgroundImage}>
          <View style={styles.sectionWelome}>
            <View style={styles.welcomeLabelLogo}>
              <Image source={require('../../assets/images/intellicare-logo-white.png')} style={styles.logoStyle} />
              <Text style={styles.welcomeLabel}>Your healthcare mobile app, right in your hands!</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button success rounded style={styles.buttonSignIn} onPress={() => this.props.navigation.navigate('LoginPage')}>
              <Text style={styles.textButtonSignIn}>Sign in</Text>
            </Button>
            <Button light rounded style={styles.buttonCreateAccount} onPress={() => this.props.navigation.navigate('RegisterPage')}>
              <Text style={styles.textButtonCreateAccount}>Register</Text>
            </Button>
          </View>
          <View style={{ fle: 1, justifyContent: "center", padding: 10, alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              You can also:
            </Text>
          </View>
          <View style={styles.viewFeatures}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
              <Card transparent style={styles.cardContainer}>
                <CardItem style={styles.cardItemStyle}>
                  <Body style={{ justifyContent: 'space-evenly' }}>
                    <Icon type="SimpleLineIcons" name="earphones-alt" style={styles.cardIconStyleMedgate} />
                    <Label style={{ textAlign: 'center' }}>Call Doc. Anywhere. Anytime. No line.</Label>
                    <Button iconRight rounded style={styles.cardButtonMedgate} onPress={() => this.props.navigation.navigate('MedgatePage')} >
                      <Text style={styles.cardButtonText}>Medgate</Text>
                      <Icon type="Ionicons" name='ios-arrow-forward' />
                    </Button>
                  </Body>
                </CardItem>
              </Card>
              <Card transparent style={styles.cardContainer}>
                <CardItem style={styles.cardItemStyle}>
                  <Body style={{ justifyContent: 'space-evenly' }}>
                    <Icon type="SimpleLineIcons" name="map" style={styles.cardIconStyleIntellimap} />
                    <Label style={{ textAlign: 'center' }}>Locate our Accreditted Facilities.</Label>
                    <Button iconRight rounded style={styles.cardButtonIntellimap} onPress={() => this.props.navigation.navigate('IntellimapPage')}>
                      <Text style={styles.cardButtonText}>Intellimap</Text>
                      <Icon type="Ionicons" name='ios-arrow-forward' />
                    </Button>
                  </Body>
                </CardItem>
              </Card>
              <Card transparent style={styles.cardContainer}>
                <CardItem style={styles.cardItemStyle}>
                  <Body style={{ justifyContent: 'space-evenly' }}>
                    <Icon type="SimpleLineIcons" name="magnifier" style={styles.cardIconStyleProviders} />
                    <Label style={{ textAlign: 'center' }}>Our Accreditted Doctors and Dentists.</Label>
                    <Button iconRight rounded style={styles.cardButtonProviders} onPress={() => this.props.navigation.navigate('DoctorSearchNavigation')}>
                      <Text style={styles.cardButtonText}>Providers</Text>
                      <Icon type="Ionicons" name='ios-arrow-forward' />
                    </Button>
                  </Body>
                </CardItem>
              </Card>
              <Card transparent style={styles.cardContainer}>
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
              </Card>
            </ScrollView>
          </View>
        </ImageBackground>
      </Container>

    );
  };
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create(
  {
    sectionWelome: {
      flex: 2,
      justifyContent: "flex-end",
      padding: 10
    },
    welcomeLabelLogo: {
      alignItems: "center"
    },
    welcomeLabel: {
      fontSize: 18,
      color: "#fff",
      textAlign: 'center'
    },
    logoStyle: {
      height: 120,
      width: 280
    },
    buttonContainer: {
      flexDirection: "row",
      flex: 1,
      marginTop: 50,
      paddingHorizontal: 20
    },
    buttonSignIn: {
      flex: 1,
      marginHorizontal: 5,
    },
    textButtonSignIn: {
      color: "#fff",
      fontWeight: "bold"
    },
    buttonCreateAccount: {
      flex: 1,
      marginHorizontal: 5
    },
    textButtonCreateAccount: {
      color: "#5fb650"
    },
    labelOR: {
      color: "#fff"
    },
    viewFeatures: {
      flex: 1.5,
      justifyContent: "center"
    },
    cardContainer: {
      width: SCREEN_WIDTH / 2,
    },
    cardContent: {
      color: "#2d2d2d",
      alignSelf: "center"
    },
    cardItemStyle: {
      borderRadius: 20,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#fff",
      flex: 1,
    },
    cardIconStyleMedgate: {
      color: "#258bf5",
      fontSize: SCREEN_HEIGHT > 750 ? 40 : 30,
      marginVertical: SCREEN_HEIGHT > 750 ? 10 : 2,
      alignSelf: "center"
    },
    cardIconStyleIntellimap: {
      color: "#f39c12",
      fontSize: SCREEN_HEIGHT > 750 ? 40 : 30,
      marginVertical: SCREEN_HEIGHT > 750 ? 10 : 2,
      alignSelf: "center"
    },
    cardIconStyleProviders: {
      color: "#e74c3c",
      fontSize: SCREEN_HEIGHT > 750 ? 40 : 30,
      marginVertical: SCREEN_HEIGHT > 750 ? 10 : 2,
      alignSelf: "center"
    },
    cardIconStyleGuidebook: {
      color: "#2ecc71",
      fontSize: SCREEN_HEIGHT > 750 ? 40 : 30,
      marginVertical: SCREEN_HEIGHT > 750 ? 10 : 0,
      alignSelf: "center"
    },
    cardButtonMedgate: {
      marginVertical: SCREEN_HEIGHT > 750 ? 10 : 4,
      backgroundColor: "#258bf5",
      alignSelf: "center",
      height: 40
    },
    cardButtonIntellimap: {
      marginVertical: SCREEN_HEIGHT > 750 ? 10 : 4,
      backgroundColor: "#f39c12",
      alignSelf: "center",
      height: 40
    },
    cardButtonProviders: {
      marginVertical: SCREEN_HEIGHT > 750 ? 10 : 4,
      backgroundColor: "#e74c3c",
      alignSelf: "center",
      height: 40
    },
    cardButtonGuidebook: {
      marginVertical: SCREEN_HEIGHT > 750 ? 10 : 0,
      backgroundColor: "#2ecc71",
      alignSelf: "center",
      // bottom: SCREEN_HEIGHT > 750 ? 0 : 6,
      height: 40
    },
    cardButtonText: {
      color: "#fff"
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "stretch",
    },

  }
)



{/* <View style={styles.container}>
          <View style={styles.Section1}>
            <View style={styles.swiperContainer}>
              <SwiperFlatList
                autoplay
                autoplayDelay={35}
                autoplayLoop
                index={2}
                showPagination
                paginationDefaultColor="#fff"
                paginationActiveColor="#5fb650">
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo1.jpg')} style={styles.backgroundImage} />
                </View>
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo2.jpg')} style={styles.backgroundImage} />
                </View>
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo3.jpg')} style={styles.backgroundImage} />
                </View>
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo4.jpg')} style={styles.backgroundImage} />
                </View>
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo5.jpg')} style={styles.backgroundImage} />
                </View>
              </SwiperFlatList>
            </View>
            <View style={styles.Section2}>
              <Text style={styles.AppTitle}>
                <H1 style={styles.AppTitle}>Intellicare Mobile App</H1>
              </Text>
              <Text style={styles.AppDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </Text>
              <View style={styles.Buttons}>
                <Button rounded success style={{ flex: 1, marginHorizontal: 10 }} onPress={() => this.props.navigation.navigate('LoginPage')}>
                  <Text> Login </Text>
                </Button>
                <Button rounded bordered light style={{backgroundColor:"#fff", flex: 1, marginHorizontal: 10 }}>
                  <Text style={{ color: '#5fb650' }} onPress={() => this.props.navigation.navigate('Intellimap')}> Sign Up </Text>
                </Button>
              </View>
            </View>
          </View>
        </View> */}

// buttonLogin: {
//       color: '#2ecc71',
//       padding: 20,
//     },
//     container: {
//       display: 'flex',
//       flex: 1,
//     },
//     Section1: {
//       flex: 1,
//       backgroundColor: '#f5f5f5',

//     },
//     Section2: {
//       flex: 1,
//       height: height * 1.0,
//       padding: 20,
//       paddingBottom: 100,
//       position: 'absolute',
//       justifyContent: 'flex-end'
//     },
//     content1: {
//       flex: 6,
//     },
//     linkSkip: {
//       color: '#2ecc71',
//       fontWeight: "bold",
//       alignSelf: 'flex-end'
//     },
//     AppTitle: {
//       color: '#5fb650',
//       alignSelf: "center",
//       fontWeight: "bold",
//       padding: 10,
//     },
//     AppDescription: {
//       color: '#fff',
//       fontSize: 14,
//       textAlign: "center",
//     },
//     Buttons: {
//       flexDirection: 'row',
//       padding: 20,
//     },
//     child: {
//       flex: 1,
//       height: height * 1.0,
//       width,
//       justifyContent: 'center'
//     },
//     text: {
//       fontSize: width * 0.50,
//       textAlign: 'center'
//     },
//     swiperContainer: {
//       flex: 1,
//       alignItems: "center",
//       backgroundColor: 'white',
//     },
//     backgroundImage: {
//       flex: 1,
//       resizeMode: "stretch",
//     },
//     paginationStyle: {
//       color: "#fff",
//       backgroundColor: "#fff",
//     },
