import React from 'react';
import {StyleSheet, View, ActivityIndicator, StatusBar} from 'react-native';
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
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const ACCESS_TOKEN = 'access_token';
const MEMBER_ID = 'member_id';

export default class Profile extends React.Component {
  state = {dataSource: []};

  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      dataSource: [],
      isLoading: true,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  async componentDidMount() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let userID = await AsyncStorage.getItem(MEMBER_ID);
    const response = await fetch(
      'http://52.230.122.226:3000/api/v1/getUserInfo/' + userID,
      {
        method: 'GET',
        headers: {
          authorization: 'token ' + token,
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
      dataSource: [json],
    });
  }
  onUser = item => {
    this.props.navigation.navigate('EditProfilePage', item);
  };

  renderItem = ({item}) => {
    const {photo} = this.state;

    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.header}>
          <Body style={{justifyContent: 'center'}}>
            {photo && (
              <Thumbnail
                large
                style={{alignSelf: 'center'}}
                source={{uri: photo.uri}}
              />
            )}
            <Label style={styles.labelNickname}>{item.first_name}</Label>
          </Body>
        </View>
        <ScrollView>
          <View style={{paddingHorizontal: 20}}>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Label style={styles.itemLabel}>Full Name</Label>
              </Left>
              <Right style={{flex: 1}}>
                <Text style={styles.itemInfo}>
                  {item.first_name} {item.last_name}
                </Text>
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Label style={styles.itemLabel}>Gender</Label>
              </Left>
              <Right style={{flex: 1}}>
                <Text style={styles.itemInfo}>{item.gender}</Text>
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Label style={styles.itemLabel}>Birth Date</Label>
              </Left>
              <Right style={{flex: 1}}>
                <Text style={styles.itemInfo}>{item.birth_date}</Text>
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left style={{flex: 1}}>
                <Label style={styles.itemLabel}>Email</Label>
              </Left>
              <Right style={{flex: 3}}>
                <Text style={{color: '#b2bec3'}}>{item.email}</Text>
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Label style={styles.itemLabel}>Account No.</Label>
              </Left>
              <Right style={{flex: 1}}>
                <Text style={styles.itemInfo}>{item.account_no}</Text>
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Label style={styles.itemLabel}>Card No.</Label>
              </Left>
              <Right style={{flex: 1}}>
                <Text style={styles.itemInfo}>{item.card_no}</Text>
              </Right>
            </ListItem>
            <View style={{marginTop: 50}}>
              <Button
                iconLeft
                bordered
                success
                block
                onPress={() => this.onUser(item)}>
                <Icon type="Feather" name="edit" />
                <Text>Edit Profile</Text>
              </Button>
              <Button
                rounded
                success
                block
                style={{marginTop: 20}}
                onPress={this.handleChoosePhoto}>
                <Text>Choose Photo</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  };
  render() {
    {
      console.log('member', this.state);
    }

    const {spinnerStyle, spinnerTextStyle} = styles;
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
        <FlatList
          roundAvatar
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 100,
    backgroundColor: '#5fb650',
    paddingHorizontal: 30,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentStyle: {
    paddingVertical: 20,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  itemStyle: {
    marginLeft: 0,
  },
  profileInfo: {
    flex: 4,
    marginTop: 20,
  },
  itemLabel: {
    color: '#6d6e72',
    fontWeight: 'bold',
  },
  itemInfo: {
    color: '#b2bec3',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  labelNickname: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
});
