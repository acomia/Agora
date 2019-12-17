import React from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar, TouchableNativeFeedback, Modal, TouchableHighlight, Alert } from 'react-native';
import ActionSheet from 'react-native-custom-actionsheet'
import {
  Container,
  Header,
  Button,
  Text,
  Left,
  Right,
  Body,
  Label,
  Thumbnail,
  ListItem,
  Icon,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-spinkit';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

const ACCESS_TOKEN = 'access_token';
const MEMB_ACCOUNTNO = 'memb_accountno';

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const acOptions = ['Cancel', 'Take photo', 'Upload from gallery ', 'View photo']

export default class Profile extends React.Component {
  state = { selected: '', dataSource: [] };


  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      dataSource: [],
      isLoading: true,
      selected: '',
    };
  }

  showActionSheet = () => this.actionSheet.show()

  getActionSheetRef = ref => (this.actionSheet = ref)

  handlePress = (index) => {
    this.setState({ selected: index });
    const options = {
      title: 'Select Avatar',
      noData: true,
    };
    switch (this.state.selected) {
      case 1:
        ImagePicker.launchCamera(options, response => {
          if (response.uri) {
            this.setState({ photo: response });
          }
        });
        break;
      case 2:
        ImagePicker.launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            if (response.uri) {
              this.setState({ photo: response });
            }
          }
        });
        break;
      case 3: alert("No view photo yet");
        break;
    }

  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
    const response = await fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/member/profile',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          AccountNo: membacct,
        },
      },
    )
      .then(response => {
        return response;
      })
      .catch(error => {
        alert('Error!' + error);
      });
    const json = await response.json();
    console.log('datasource ito: ', json.data)
    this.setState({
      isLoading: false,
      dataSource: json.data,
    });
  }
  onUser = item => {
    this.props.navigation.navigate('EditProfilePage', item);
  };

  render() {
    const { spinnerStyle, spinnerTextStyle } = styles;
    const { dataSource, photo } = this.state

    if (this.state.isLoading) {
      return (
        <View style={spinnerStyle}>
          <Spinner color={'green'} size={50} type={'ChasingDots'} />
          <Text style={spinnerTextStyle}>Loading...</Text>
        </View>
      );
    }

    function renderAvatar() {
      if (photo == null)
        return (
          <Thumbnail
            large
            style={{ alignSelf: "center" }}
            source={require('../../assets/images/nav-coordinator.png')}
            resizeMode='contain'
          />
        );
      else {
        return (
          photo && (
            <Thumbnail
              large
              style={{ alignSelf: 'center' }}
              source={{ uri: photo.uri }}
              resizeMode='contain'
            />
          )
        )
      };
    }

    return (
      <View style={StyleSheet.container}>
        <ScrollView>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={styles.header}>
            <Body style={{ justifyContent: 'center' }}>
              <TouchableNativeFeedback
                onPress={this.showActionSheet}>
                <Thumbnail large style={{ alignSelf: "center" }} source={require('../../assets/images/nav-coordinator.png')} resizeMode='contain' />
              </TouchableNativeFeedback>
              <Label style={styles.labelNickname}></Label>
            </Body>
          </View>

          <View style={styles.contentStyle}>
            <View style={styles.viewForm}>
              <Text style={styles.headerText}>Personal Information</Text>
              <ListItem style={styles.itemStyle}>
                <Left>
                  <Label style={styles.itemLabel}>Full Names</Label>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={styles.itemInfo}>
                    {dataSource && dataSource.fullname}
                  </Text>
                </Right>
              </ListItem>
              <ListItem style={styles.itemStyle}>
                <Left>
                  <Label style={styles.itemLabel}>Gender</Label>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={styles.itemInfo}>
                    {dataSource && dataSource.gender === 'M' ? 'Male' : 'Female'}
                  </Text>
                </Right>
              </ListItem>
              <ListItem style={styles.itemStyle}>
                <Left>
                  <Label style={styles.itemLabel}>Birth Date</Label>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={styles.itemInfo}>{moment(dataSource && dataSource.birth_date).format('L')}</Text>
                </Right>
              </ListItem>

              <Text style={styles.headerText}>Account Information</Text>

              <ListItem style={styles.itemStyle}>
                <Left style={{ flex: 1 }}>
                  <Label style={styles.itemLabel}>Email</Label>
                </Left>
                <Right style={{ flex: 3 }}>
                  <Text style={{ color: '#214021' }}>
                    sample@intellicare.com
                    </Text>
                </Right>
              </ListItem>
              <ListItem style={styles.itemStyle}>
                <Left>
                  <Label style={styles.itemLabel}>Account No.</Label>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={styles.itemInfo}>{dataSource && dataSource.acct}</Text>
                </Right>
              </ListItem>
              <ListItem style={styles.itemStyle}>
                <Left>
                  <Label style={styles.itemLabel}>Card No.</Label>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={styles.itemInfo}>{dataSource && dataSource.cardno}</Text>
                </Right>
              </ListItem>
              {/* <View style={{ marginTop: 30 }}>
                <Button
                  iconLeft
                  bordered
                  success
                  block
                  onPress={() => this.onUser(item)}>
                  <Icon type="Feather" name="edit" />
                  <Text>Edit Profile</Text>
                </Button>
              </View> */}
              <View style={styles.wrapper}>
                <ActionSheet
                  ref={this.getActionSheetRef}
                  options={acOptions}
                  cancelButtonIndex={CANCEL_INDEX}
                  destructiveButtonIndex={DESTRUCTIVE_INDEX}
                  onPress={this.handlePress}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: '#5fb650',
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentStyle: {
    flex: 1,
    paddingVertical: 20,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  headerStyle: {
    height: 150,
    backgroundColor: '#5fb650',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  itemStyle: {
    padding: 5,
  },
  itemLabel: {
    color: '#6d6e72',
  },
  itemInfo: {
    color: '#214021',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  labelNickname: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  labelUserID: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0.2,
    backgroundColor: 'black',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  headerText: {
    color: '#5fb650',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewForm: {
    flex: 1,
    padding: 10,
  },
  formInfo: {
    paddingHorizontal: 10,
  },
});