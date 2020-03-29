import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  ImageBackground,
  View,
  Alert,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Header,
  Text,
  Icon,
  Left,
  Body,
  ListItem,
  Thumbnail,
  Label,
  Button,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';

const ACCESS_TOKEN = 'access_token';
const MEMBER_ID = 'member_id';
const MEMB_ACCOUNTNO = 'memb_accountno';
const MEMB_NAME = 'memb_name';
const MEMB_EMAIL = 'memb_email';
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight();


const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'OnBoardingPage' })],
});

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      oldpw: '',
      visibleModal: false
    };
  }
  onLogout() {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to Logout?',
      [
        { text: 'Logout', onPress: () => this.deleteToken() },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: false },
    );
  }
  async deleteDataStored() {
    const dataStored = [
      'hospitalData',
      'clinicData',
      'ACCESS_TOKEN',
      'MEMBER_ID',
      'MEMB_ACCOUNTNO',
      'MEMB_NAME',
      'MEMB_EMAIL',
      'OLD_PW',
    ];
    try {
      await AsyncStorage.multiRemove(dataStored);
      this.props.navigation.dispatch(resetAction);
    } catch {
      console.log('Something went wrong');
    }
  }
  async componentDidMount() {

    let user_name = await AsyncStorage.getItem(MEMB_EMAIL);
    let old_pw = await AsyncStorage.getItem('OLD_PW');

    this.setState({ username: user_name, oldpw: old_pw });
  }
  async deleteToken() {
    const mapData = ['hospitalData', 'clinicData'];
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await AsyncStorage.removeItem(MEMBER_ID);
      await AsyncStorage.removeItem(MEMB_ACCOUNTNO);
      await AsyncStorage.removeItem(MEMB_NAME);
      await AsyncStorage.removeItem(MEMB_EMAIL);
      await AsyncStorage.removeItem(MEMB_CARDNO);
      await AsyncStorage.multiRemove(mapData);


      this.props.navigation.dispatch(resetAction);
    } catch {
      console.log('Something went wrong');
    }
  }

  render() {
    return (
      <Container>
        <Header
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0.3,
            borderBottomColor: '#c4c4c4',
            backgroundColor: '#fff',
            height: 100,
            paddingTop: 20,
          }}>
          {/* <ImageBackground
            source={require('../../assets/images/drawer-header-background.jpg')}
            style={styles.backgroundImage}>
            <Text></Text>
          </ImageBackground> */}
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Thumbnail
                small
                source={require('../../assets/images/sidebar-nav/user-profile-icon.png')}
                resizeMode="contain"
              />
              <View style={styles.headerDetailsContainer}>
                <Text style={styles.labelUsernameText}>
                  {this.state.username}
                </Text>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('ChangeOldPassword')
                  }>
                  <View style={styles.changePasswordContainer}>
                    {/* <Icon
                      type="MaterialCommunityIcons"
                      name="settings"
                      style={styles.iconSettings}
                    />
                    <Label style={styles.labelChangePassword}>
                      Change password
                    </Label> */}
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </Header>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('MembersPage')}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              {/* <Icon type="MaterialCommunityIcons" name="account-outline" /> */}
              <Thumbnail
                source={require('../../assets/images/sidebar-nav/profile.png')}
                resizeMode="contain"
                style={styles.navStyle}></Thumbnail>
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>Member Profiles</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() =>
            this.props.navigation.navigate('DoctorSearchNavigation')
          }>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              {/* <Icon type="MaterialCommunityIcons" name="medical-bag" /> */}
              <Thumbnail
                source={require('../../assets/images/sidebar-nav/doctor.png')}
                resizeMode="contain"
                style={styles.navStyle}></Thumbnail>
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>Doctors & Dentists</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.setState({ visibleModal: true })}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              {/* <Icon type="MaterialCommunityIcons" name="medical-bag" /> */}
              <Thumbnail
                source={require('../../assets/images/sidebar-nav/plus.png')}
                resizeMode="contain"
                style={styles.navStyle}></Thumbnail>
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>eConsultation form</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('ERCS2LandingPage')}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              {/* <Icon type="MaterialCommunityIcons" name="headset" /> */}
              <Thumbnail
                source={require('../../assets/images/sidebar-nav/droplet.png')}
                resizeMode="contain"
                style={styles.navStyle}></Thumbnail>
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>eDiagnostic Procedures form</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('MapPage')}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              {/* <Icon type="MaterialCommunityIcons" name="headset" /> */}
              <Thumbnail
                source={require('../../assets/images/sidebar-nav/map.png')}
                resizeMode="contain"
                style={styles.navStyle}></Thumbnail>
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>Agora Map</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() =>
            MedgateDisabled == true
              ?
              Alert.alert('Attention!', Medgate_Message
              + '\n\nYou may still reach them by calling them directly through the following numbers:'
              + '\n\nManila: 02 8075 0700'
              + '\n\nCebu: 032 265 5111'
              + '\n\nDavao: 082 285 5111'
              + '\n\nDumaguete: 035 522 5111'
              + '\n\nGlobe: 0917 536 2156/ 0917 536 2715/ 0917 548 7672'
              + '\n\nSmart: 0998 990 7540/ 0998 990 7541/ 0998 843 2880'
              + '\n\nSun: 0925 714 7794/ 0925 714 7793')
              :
              this.props.navigation.navigate('MedgatePage')
          }>


          <ListItem icon style={styles.listItemStyle}>
            <Left>
              {/* <Icon type="MaterialCommunityIcons" name="headset" /> */}
              <Thumbnail
                source={require('../../assets/images/sidebar-nav/teleconsult.png')}
                resizeMode="contain"
                style={styles.navStyle}></Thumbnail>
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>Medgate</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('PrivacyPolicyPage')}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              {/* <Icon type="MaterialCommunityIcons" name="headset" /> */}
              <Thumbnail
                source={require('../../assets/images/sidebar-nav/privacy.png')}
                resizeMode="contain"
                style={styles.navStyle}></Thumbnail>
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>Privacy Policy</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <View style={styles.divider} />
        <TouchableNativeFeedback
          onPress={() => {
            this.onLogout();
          }}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              {/* <Icon active type="Ionicons" name="md-log-out" /> */}
              <Thumbnail
                source={require('../../assets/images/sidebar-nav/logout.png')}
                resizeMode="contain"
                style={styles.navStyle}></Thumbnail>
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.logoutText}>Logout</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <Modal
          onBackButtonPress={() => this.setState({ visibleModal: false })}
          isVisible={this.state.visibleModal}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}>
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
          onPress={() => cardno == null || cardno == ''
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

    if(MedgateDisabled == true) {
      Alert.alert('Attention!', Medgate_Message
      + '\n\nYou may still reach them by calling them directly through the following numbers:'
      + '\n\nManila: 02 8075 0700'
      + '\n\nCebu: 032 265 5111'
      + '\n\nDavao: 082 285 5111'
      + '\n\nDumaguete: 035 522 5111'
      + '\n\nGlobe: 0917 536 2156/ 0917 536 2715/ 0917 548 7672'
      + '\n\nSmart: 0998 990 7540/ 0998 990 7541/ 0998 843 2880'
      + '\n\nSun: 0925 714 7794/ 0925 714 7793')
    }
    else {
      this.setState({ visibleModal: false });
      this.props.navigation.navigate('MedgatePage');
    }

 
  }

  goToERC1() {
    this.setState({ visibleModal: false });
    this.props.navigation.navigate('ERCS1LandingPage');
  }


}

const styles = StyleSheet.create({
  listItemStyle: {
    marginTop: 15,
    borderBottomColor: '#2d2d2d',
  },
  listStyle: {
    color: '#2d2d2d',
    fontSize: 14,
  },
  listLabel: {
    borderBottomColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  divider: {
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#c4c4c4',
  },
  logoutText: {
    color: '#6d6e72',
    fontSize: 14,
  },
  navStyle: {
    height: 18,
    width: 18,
  },
  labelUsernameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5fb650',
  },
  iconSettings: {
    color: '#2d2d2d',
    fontSize: 16,
    justifyContent: 'center',
    paddingRight: 2,
  },
  labelChangePassword: {
    fontSize: 12,
    color: '#2d2d2d',
  },
  changePasswordContainer: {
    flexDirection: 'row',
    paddingTop: 3,
  },
  headerDetailsContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingLeft: 5,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
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
