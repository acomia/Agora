import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  ImageBackground,
  View,
  Alert,
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
import {StackActions, NavigationActions} from 'react-navigation';

// const ACCESS_TOKEN = 'access_token';
// const MEMBER_ID = 'member_id';
// const MEMB_ACCOUNTNO = 'memb_accountno';
// const MEMB_NAME = 'memb_name';
// const MEMB_EMAIL = 'memb_email';

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  key: null,
  actions: [NavigationActions.navigate({routeName: 'OnBoardingPage'})],
});

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {username: '', oldpw: ''};
  }
  onLogout() {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to Logout?',
      [
        {text: 'Logout', onPress: () => this.deleteDataStored()},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
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
    let user_name = await AsyncStorage.getItem('MEMB_EMAIL');
    let old_pw = await AsyncStorage.getItem('OLD_PW');
    this.setState({username: user_name, oldpw: old_pw});
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
            <View style={{flexDirection: 'row'}}>
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
                    <Icon
                      type="MaterialCommunityIcons"
                      name="settings"
                      style={styles.iconSettings}
                    />
                    <Label style={styles.labelChangePassword}>
                      Change password
                    </Label>
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
          onPress={() => this.props.navigation.navigate('ERCS1LandingPage')}>
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
          onPress={() => this.props.navigation.navigate('IntellimapPage')}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              {/* <Icon type="MaterialCommunityIcons" name="headset" /> */}
              <Thumbnail
                source={require('../../assets/images/sidebar-nav/map.png')}
                resizeMode="contain"
                style={styles.navStyle}></Thumbnail>
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>Intellimap</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('MedgatePage')}>
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
      </Container>
    );
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
});
