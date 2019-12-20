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
import moment from 'moment';
import ImageView from 'react-native-image-view';

const ACCESS_TOKEN = 'access_token';
const MEMBER_ID = 'member_id';
const MEMB_ACCOUNTNO = 'memb_accountno';
const MEMB_EMAIL = 'memb_email'

export default class Profile extends React.Component {
  state = { selected: '', dataSource: [], isImageViewVisible: false };


  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      selected: '',
      isImageViewVisible: false,
      imgsrc: '',
      membemail: '',
      imgPath: '',
    };
  }

  async getProfilePhotoPath(token) {
    let membid = await AsyncStorage.getItem(MEMBER_ID);
    let resp2 = await fetch("https://intellicare.com.ph/uat/webservice/memberprofile/api/member/files",
      {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token,
          "MemberID": membid,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    )
      .then(resp2 => resp2.json())
      .then(jsonObject => {
        const data = jsonObject.data;
        const record = data.find(item => item.tag === 'govid');
        if (record) {
          varImagePath = record.path;
        }
      })
      .catch(error => {
        alert('Error: ' + error);
      });
  }

  async getProfilePhoto() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);

    await this.getProfilePhotoPath(token);

    let resp = await fetch("https://intellicare.com.ph/uat/webservice/memberprofile/api/member/filepathtoimage", {
      headers: {
        "Authorization": "Bearer " + token,
        "ImagePath": varImagePath,
      }
    })

    let respBlob = await resp.blob();
    let reader = new FileReader()
    reader.readAsDataURL(respBlob)

    reader.onload = () => {
      this.setState({ imgsrc: reader.result })
    }
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
    let memb_email = await AsyncStorage.getItem(MEMB_EMAIL);
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
    this.setState({
      isLoading: false,
      dataSource: json.data,
      membemail: memb_email,
    });

    this.getProfilePhoto();
  }

  render() {
    const { spinnerStyle, spinnerTextStyle } = styles;
    const { dataSource } = this.state

    if (this.state.isLoading) {
      return (
        <View style={spinnerStyle}>
          <Spinner color={'green'} size={50} type={'ChasingDots'} />
          <Text style={spinnerTextStyle}>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={StyleSheet.container}>
        <ScrollView>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={styles.header}>
            <Body style={{ justifyContent: 'center' }}>
              <TouchableNativeFeedback
                onPress={() => {
                  this.setState({
                    isImageViewVisible: true,
                  });
                }}
              >
                <Thumbnail large style={{ alignSelf: "center" }} source={{ uri: this.state.imgsrc }} resizeMode='contain' />
              </TouchableNativeFeedback>
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
                    {this.state.membemail}
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
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 140,
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