import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
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
import SwiperFlatList from 'react-native-swiper-flatlist';
import { DrawerActions } from 'react-navigation-drawer';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage'

const MEMB_NAME = 'memb_name'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: ""
    };
  }

  async componentWillMount() {
    let membname = await AsyncStorage.getItem(MEMB_NAME);
    this.setState({ fname: membname });
  }
  render() {
    // const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

    return (
      <Container style={{ display: 'flex', flex: 1, backgroundColor: '#f5f5f5' }}>
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
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('ProfilePage')}>
              <Thumbnail
                small
                source={require('../../assets/images/nav-coordinator.png')}
                resizeMode="contain"
              />
            </TouchableNativeFeedback>
          </Right>
        </Header>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Welcome!</Text>
          </View>
          <View style={styles.contentStyle}>
            <Text style={styles.WelcomeheaderTitle}>Hello, {this.state.fname}</Text>
            <Text style={{ color: '#6d6e72', fontSize: 14 }}>
              How are you doing today? We hope you're having a great one!
            </Text>
          </View>
          <View style={styles.MenucontentStyle}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate('MembersPage')}>
                  <Card transparent>
                    <CardItem style={[styles.cardMenuStyle]}>
                      <Body>
                        <Thumbnail
                          source={require('../../assets/images/menu-members.png')}
                          resizeMode="contain"
                        />
                        <Text style={styles.cardMenuText}>
                          Account Profiles
                        </Text>
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
                      <Body>
                        <Thumbnail
                          source={require('../../assets/images/menu-provider.png')}
                          resizeMode="contain"
                        />
                        <Text style={styles.cardMenuText}>
                          Medical Providers
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableNativeFeedback>
              </View>
            </View>
            <Card transparent>
              <CardItem style={[styles.cardMenuStyle]}>
                <Left>
                  <Thumbnail
                    source={require('../../assets/images/map.png')}
                    resizeMode="contain"
                  />
                  <Body style={{ marginLeft: 15 }}>
                    <Text style={styles.cardMenuTextIntellimap}>
                      Intellimap
                    </Text>
                    <Text style={styles.cardMenuText}>
                      Search for our Accredited Hospitals, Diagnostic and
                      Specialty Clinics, and Dental Clinics without leaving the
                      app!
                    </Text>
                    <Text
                      style={styles.textSearchNow}
                      onPress={() =>
                        this.props.navigation.navigate('IntellimapPage')
                      }>
                      Search now
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Card transparent>
              <CardItem style={[styles.cardMenuStyle]}>
                <Body style={{ marginLeft: 15 }}>
                  <Image
                    source={require('../../assets/images/medgatelogo.png')}
                    resizeMode="contain"
                    style={{ width: width * 0.5, height: height * 0.08 }}
                  />

                  <Text style={styles.cardMenuText}>
                    {/* Get your hassle-free medical consultation. Our Filipino
                    specialist doctors are just a phone call away to give you
                    the case you deserve. */}
                    Download the Medgate Philippines app now!
                  </Text>
                  <Text
                    style={{
                      color: '#258bf5',
                      fontSize: 14,
                      fontWeight: 'bold',
                      paddingBottom: 5,
                    }}>
                    Call Doc. Anytime. Anywhere. No lines.™
                  </Text>
                  <Button
                    iconLeft
                    rounded
                    style={styles.cardButtonMedgate}
                    onPress={() =>
                      this.props.navigation.navigate('MedgatePage')
                    }>
                    <Icon type="Ionicons" name="ios-call" />
                    <Text style={styles.cardButtonText}>Call a Doctor now</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </View>
        </ScrollView>
      </Container>
    );
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
    backgroundColor: '#258bf5',
    alignSelf: 'center',
  },
  cardButtonText: {
    color: '#fff',
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
});
