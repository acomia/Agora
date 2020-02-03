import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  ImageBackground, View
} from 'react-native';
import { Container, Header, Text, Icon, Left, Body, ListItem } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

const ACCESS_TOKEN = 'access_token';
const MEMBER_ID = 'member_id';
const MEMB_ACCOUNTNO = 'memb_accountno';
const MEMB_NAME = 'memb_name';
const MEMB_EMAIL = 'memb_email';

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'OnBoardingPage' })],
});

export default class SideBar extends React.Component {
  onLogout() {
    this.deleteToken();
  }
  async deleteToken() {
    const mapData = ['hospitalData', 'clinicData']
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await AsyncStorage.removeItem(MEMBER_ID);
      await AsyncStorage.removeItem(MEMB_ACCOUNTNO);
      await AsyncStorage.removeItem(MEMB_NAME);
      await AsyncStorage.removeItem(MEMB_EMAIL);
      await AsyncStorage.multiRemove(mapData)
      this.props.navigation.dispatch(resetAction);
    } catch {
      console.log('Something went wrong');
    }
  }

  render() {
    return (
      <Container>
        <Header span style={{ paddingLeft: 0, paddingRight: 0 }}>
          <ImageBackground
            source={require('../../assets/images/drawer-header-background.jpg')}
            style={styles.backgroundImage}>
            <Text></Text>
          </ImageBackground>
        </Header>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('MembersPage')}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              <Icon type="MaterialCommunityIcons" name="account-outline" />
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>Member Profiles</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('IntellimapPage')}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              <Icon active name="md-map" />
            </Left>
            <Body style={styles.listLabel}>
              <Text>IntelliMap</Text>
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
              <Icon active type="Ionicons" name="md-log-out" />
            </Left>
            <Body style={styles.listLabel}>
              <Text>Logout</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItemStyle: {
    marginTop: 20,
    borderBottomColor: '#2d2d2d',
  },
  listStyle: {
    color: '#2d2d2d',
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
    color: '#c4c4c4',
  },
  navStyle: {
    height: 20,
    width: 20,
  },
});
