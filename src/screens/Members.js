import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Body,
  Text,
  Badge,
  List,
  ListItem,
  Left,
  Content,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';

const MEMB_ACCOUNTNO = 'memb_accountno';
const membacct = '';
// const membinfo = require('../../membinfo.json')
export default class Members extends React.Component {
  constructor(props) {
    super(props);
    global.storeToken = '';
    // this.membacct = ''
    this.state = {
      isLoading: false,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.getacct();
    // let xmemb = await AsyncStorage.getItem(MEMB_ACCOUNTNO)
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'digitalxform_util',
        password: 'memprof@pass',
      }),
    })
      .then(response => {
        response.json().then(data => {
          if (data.is_success === true) {
            console.log('membacct2 is: ' + this.membacct);
            global.storeToken = data.data.token;
            console.log('component ' + this.membacct);
            fetch(
              'https://intellicare.com.ph/uat/webservice/memberprofile/api/member/profile',
              {
                method: 'GET',
                headers: {
                  authToken: global.storeToken,
                  paramAcct: this.membacct,
                  // 'paramContract': '1',
                  'Content-Type': 'application/json;charset=UTF-8',
                },
              },
            )
              .then(response => {
                response.json().then(responseJson => {
                  console.log(responseJson);
                  this.setState({
                    isLoading: false,
                    dataSource: [responseJson.data],
                  });
                });
              })
              .catch(error => {
                alert('Error!' + error);
              });
          } else {
            alert(data.message);
          }
        });
      })

      .catch(error => {
        alert('Error!' + error);
      });
  }

  // componentDidMount() {

  // }
  //store member account no.
  async getacct() {
    try {
      this.membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
      console.log('membacct is: ' + this.membacct);
      return this.membacct;
    } catch (error) {
      console.log('CANT GET ACCT NO');
    }
  }

  onUser = item => {
    this.props.navigation.navigate('MemberInfoPage', item);
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={{flexDirection: 'row'}}>
        <ScrollView>
          <List style={styles.listStyle}>
            <ListItem
              thumbnail
              style={styles.listItemMember}
              key={item.acct}
              onPress={() => this.onUser(item)}>
              <Left>
                {/* <Image style={{ width: 60, height: 60, margin: 3, borderRadius: 150 / 2 }} source={{ uri: item.image_url }} /> */}
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <View style={styles.viewNameBadge}>
                  <Text style={styles.listFullname}>{item.fullname}</Text>
                  <Badge style={styles.badgeStyle}>
                    <Text style={styles.badgeText}>{item.member_type}</Text>
                  </Badge>
                </View>
                <Text note style={styles.listAccountNote}>
                  {' '}
                  {item.acct} / {item.contract}
                </Text>
                <Text>{item.member_type}</Text>
              </Body>
            </ListItem>
          </List>
        </ScrollView>
      </TouchableOpacity>
    );
  };
  renderSeparator = () => {
    return <View style={{height: 0, backgroundColor: 'gray'}}></View>;
  };

  render() {
    //  const { data } = this.state
    const {spinnerStyle, spinnerTextStyle} = styles;
    if (this.state.isLoading) {
      return (
        <View style={spinnerStyle}>
          <Spinner color={'green'} size={50} type={'ChasingDots'} />
          <Text style={spinnerTextStyle}>Fetching data...</Text>
        </View>
      );
    }
    return (
      <View style={StyleSheet.container}>
        <FlatList
          roundAvatar
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    padding: 5,
    marginBottom: 10,
  },
  listItemMember: {
    marginLeft: 0,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#c4c4c4',
  },
  badgeStyle: {
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#c4c4c4',
    borderWidth: 1,
  },
  badgeText: {
    color: '#c4c4c4',
    fontStyle: 'italic',
  },
  listAccountNote: {
    fontSize: 16,
  },
  listStyle: {
    backgroundColor: '#fff',
  },
  listFullname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5fb650',
  },
  viewNameBadge: {
    flexDirection: 'row',
    flex: 1,
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
