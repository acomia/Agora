import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Button,
  Text,
  Icon,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  Thumbnail,
  Label,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { DrawerActions } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

const MEMB_NAME = 'memb_name';
const MEMB_CARDNO = 'memb_cardno';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight();

NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
});

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      visibleModal: false,
      accepted: false,
    };
  }

  async componentWillMount() {
   
    
    let membname = await AsyncStorage.getItem(MEMB_NAME);
     global.cardno = await AsyncStorage.getItem(MEMB_CARDNO);
    this.setState({
      fname: membname,
    });
   
  }

  render() {
    // const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

    return (
      <Container style={{ display: 'flex', flex: 1, backgroundColor: '#f5f5f5' }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Header style={styles.headerStyle}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
              }}>
              <Icon style={styles.headerIconStyle} name="ios-menu" />
            </Button>
          </Left>
          <Right>
            <Body />
            {/* <Icon
              style={styles.headerIconStyle}
              type="MaterialCommunityIcons"
              name="account-circle"
              //onPress={() => this.props.navigation.navigate('ProfilePage')}
            /> */}
          </Right>
        </Header>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Welcome!</Text>
          </View>
          <View style={styles.contentStyle}>
            <Text style={styles.WelcomeheaderTitle}>
              Hello, {this.state.fname}!
            </Text>
            <Text style={{ color: '#6d6e72', fontSize: 14 }}>
              How are you doing today? We hope you're having a great one!
            </Text>
          </View>
          <View style={styles.MenucontentStyle}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TouchableNativeFeedback
                  //onPress={() => this.props.navigation.navigate('MembersPage')}>
                  onPress={() => this.checkConnectivity('MembersPage')}>
                  <Card transparent>
                    <CardItem style={[styles.cardMenuStyle]}>
                      <Body
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Thumbnail
                          source={require('../../assets/images/menu-members.png')}
                          resizeMode="contain"
                        />
                        <Text style={styles.cardMenuText}>Member Profiles</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableNativeFeedback>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('DoctorSearchNavigation')
                  }>
                  <Card transparent>
                    <CardItem style={[styles.cardMenuStyle]}>
                      <Body
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Thumbnail
                          source={require('../../assets/images/menu-provider.png')}
                          resizeMode="contain"
                        />
                        <Text style={styles.cardMenuText}>Doctors & Dentists</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableNativeFeedback>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TouchableNativeFeedback
                  onPress={
                    () =>
                      this.setState({ visibleModal: true })
                    // this.props.navigation.navigate('ERCS1LandingPage')
                  }>
                  <Card transparent>
                    <CardItem style={[styles.cardMenuStyle]}>
                      <Body
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Thumbnail
                          source={require('../../assets/images/menu-consultation.png')}
                          resizeMode="contain"
                        />
                        <Text style={styles.cardMenuText}>
                          Request for eConsultation Form
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableNativeFeedback>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('ERCS2LandingPage')
                  }>
                  <Card transparent>
                    <CardItem style={[styles.cardMenuStyle]}>
                      <Body
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Thumbnail
                          source={require('../../assets/images/menu-diagnostics.png')}
                          resizeMode="contain"
                        />
                        <Text style={styles.cardMenuText}>
                          Request for eDiagnostic Procedures Form
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableNativeFeedback>
              </View>
            </View>
            <Card transparent>
              <CardItem style={[styles.cardMenuStyle1]}>
                <Left>
                  <Thumbnail
                    source={require('../../assets/images/map.png')}
                    resizeMode="contain"
                  />
                  <Body style={{ marginLeft: 15 }}>
                    <Text style={styles.cardMenuTextIntellimap}>Agora Map</Text>
                    <Text style={styles.cardMenuText1}>
                      Search for our Accredited Hospitals, Diagnostic and
                      Specialty Clinics, and Dental Clinics without leaving the
                      app!
                    </Text>
                    <Text
                      style={styles.textSearchNow}
                      onPress={() => this.props.navigation.navigate('MapPage')}>
                      Search now
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>

            <Card transparent>
              <CardItem style={[styles.cardMenuStyle1]}>
                <Left>
                  <Thumbnail
                    source={require('../../assets/images/medgate.png')}
                    resizeMode="contain"
                  />
                  <Body style={{ marginLeft: 15 }}>
                    <Text
                      style={{
                        color: '#258bf5',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Medgate Philippines
                    </Text>
                    <Text style={styles.cardMenuText1}>
                      Call Doc. Anytime. Anywhere. No lines.™
                    </Text>
                    <Button
                      transparent
                      block
                      iconLeft
                      style={styles.cardButtonMedgate}
                      onPress={() =>
                        this.props.navigation.navigate('MedgatePage')
                      }>
                      <Icon
                        type="Ionicons"
                        name="ios-call"
                        style={{ color: '#258bf5' }}
                      />
                      <Text style={styles.cardButtonText}>
                        Call a Doctor now
                      </Text>
                    </Button>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </View>
        </ScrollView>
        <Modal
        onBackButtonPress={() => this.setState({ visibleModal: false })}
          isVisible={this.state.visibleModal}
          animationInTiming={0}
          animationOutTiming={0}
          backdropTransitionInTiming={0}
          backdropTransitionOutTiming={0}>
          {this.renderMedgateModal()}
        </Modal>
      </Container>
    );
  }

  renderMedgateModal() {
    return (
      <View style={styles.Pncontainer}>
        {/* <Text style={styles.pnTitle}>MEDGATE</Text> */}
        <Thumbnail
          style={{
            width: 100,
            height: 110,
            alignSelf: 'center',
            paddingHorizontal: 140,
          }}
          source={require('../../assets/images/medgatelogo.png')}
          resizeMode="contain"
        />
        <ScrollView style={styles.tcContainer}>
          <Text style={{ fontWeight: 'bold', marginTop: 5 }}>
            What is Medgate?
          </Text>

          <Text style={styles.pnP}>
            Medgate is the leading international provider of telemedicine which
            offers high-quality, convenient, and confidential medical
            consultations over the phone for non-emergency cases.{' '}
          </Text>
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            cardno == null || cardno == ''
              ?
              Alert.alert('NOTE', "Your account's Card Number is is not yet available.Please contact Customer Support")
              :
              this.gotoMedgate()}
          style={styles.pnButton}>
          <Icon
            type="SimpleLineIcons"
            name="earphones-alt"
            style={styles.cardIconStyleMedgate}
          />
          <Text style={styles.pnButtonLabel}>Try Tele-consultation now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.goToERC1()}
          style={styles.pnButtonDisabled}>
          <Text style={styles.pnButtonLabel}>
            Continue request for eConsultation...
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  gotoMedgate() {
    this.setState({ visibleModal: false });
    this.props.navigation.navigate('MedgatePage');
  }

  goToERC1() {
    this.setState({ visibleModal: false });
    this.props.navigation.navigate('ERCS1LandingPage');
  }

  checkConnectivity(screen) {
    NetInfo.fetch().then(state => {
      // console.log("Connection type2", state.type);
      //console.log("Is connected?2", state.isConnected);
      if (state.isConnected == true) {
        //alert('Online');
        this.props.navigation.navigate(screen);
      } else {
        alert('Oops! Check Internet Connection...');
      }
    });
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: '#5fb650',
    paddingHorizontal: 30,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  WelcomeheaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5fb650',
  },
  contentStyle: {
    marginHorizontal: 20,
    padding: 20,
    marginTop: -40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  MenucontentStyle: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  scrollViewBackground: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerStyle: {
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#5fb650',
  },
  imageStyle: {
    flex: 1,
    height: '10%',
    width: width * 0.1,
    alignSelf: 'center',
  },
  headerIconStyle: {
    color: '#fff',
    marginHorizontal: 10,
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  child: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    height: height * 0.45,
    width,
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },
  mapSection: {
    borderRadius: 50,
    padding: 10,
    flex: 7,
    backgroundColor: '#fff',
  },
  menuTiles: {
    marginHorizontal: 20,
    flex: 8,
  },
  menuRow: {
    flexDirection: 'row',
  },
  cardItemStyle: {
    flex: 1,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 20,
    shadowColor: '#2d2d2d',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  cardMenuStyle: {
    height: 150,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#f5f5f5',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 0,
    justifyContent: 'center',
  },
  cardMenuStyle1: {
    margin: 5,
    borderRadius: 5,
    shadowColor: '#f5f5f5',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 0,
  },
  cardMenuText: {
    color: '#6d6e72',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  cardMenuText1: {
    color: '#6d6e72',
    fontSize: 14,
    marginTop: 10,
  },
  cardMenuTextIntellimap: {
    color: '#5fb650',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textSearchNow: {
    paddingTop: 5,
    color: '#5fb650',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardButtonMedgate: {
    marginTop: 10,
  },
  cardButtonText: {
    color: '#258bf5',
    alignSelf: 'center',
  },
  cardText: {
    color: '#5fb650',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerLabel: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
  },
  swiperFeatures: {
    flex: 1,
  },
  Section1: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  medgateLogo: {
    height: height * 0.05,
    width: width * 0.5,
  },
  medgateButton: {
    backgroundColor: '#1665ce',
  },
  mainCardStyle: {
    minHeight: 250,
    borderRadius: 20,
  },
  mainCardText: {
    marginVertical: 15,
    textAlign: 'justify',
  },
  backgroundImage: {
    resizeMode: 'contain',
  },

  Pncontainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 20,
    // marginLeft: 10,
    // marginRight: 10,
    padding: 16,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  pnTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#5fb650',
  },
  pnP: {
    fontSize: 12,
    padding: 5,
  },
  pnL: {
    padding: 10,
    fontSize: 12,
  },
  pnNL: {
    fontSize: 12,
    marginLeft: 10,
    padding: 2,
  },
  pnContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
    borderWidth: 0.5,
  },
  pnButton: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  pnButtonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  pnButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    alignSelf: 'center',
  },
  cardIconStyleMedgate: {
    color: '#258bf5',
    fontSize: SCREEN_HEIGHT > 750 ? 40 : 30,
    marginVertical: SCREEN_HEIGHT > 750 ? 10 : 2,
    alignSelf: 'center',
  },
});
