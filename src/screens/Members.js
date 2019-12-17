import React from 'react';
import { StyleSheet, View, FlatList, Dimensions, Image, TouchableOpacity, StatusBar, } from 'react-native';
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Label, ListItem, Thumbnail, Item, Title, List, Badge, } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-spinkit'
import { StackActions, NavigationActions } from 'react-navigation';

const MEMB_ACCOUNTNO = 'memb_accountno';
const ACCESS_TOKEN = 'access_token';

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'OnBoardingPage' })],
});

export default class Members extends React.Component {

  constructor(props) {
    super(props)
    global.storeToken = ''
    // this.membacct = ''
    this.state = {
      isLoading: false,
      dataSource: []
    }
  }

  onLogout() {
    this.deleteToken();
  }
  async deleteToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await AsyncStorage.removeItem(MEMB_ACCOUNTNO);
      this.props.navigation.dispatch(resetAction);
    } catch {
      console.log('Something went wrong');
    }
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
    this.setState({
      isLoading: true
    })
    // this.getacct()
    // this.getToken()
    // let xmemb = await AsyncStorage.getItem(MEMB_ACCOUNTNO)
    console.log('acct1', membacct)
    console.log('token1', 'bearer', token)

    //global.storeToken = data.data.token
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/member/profile', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'AccountNo': membacct,
        // 'paramContract': '1',
        // 'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then((response) => {
        response.json()
          .then((responseJson) => {
            console.log('data', responseJson)
            if (responseJson.data != null) {
              console.log('sampledata', responseJson)
              this.setState({
                isLoading: false,
                dataSource: [responseJson.data],
              });
            } else
              if (response.Json = "Invalid Access Token") {
                this.onLogout();
              }

              else {
                alert('Members not found!')
                this.setState({ isLoading: false })
                this.props.navigation.navigate('Dashboard')
              }
          })
      })
      .catch((error) => {
        alert('Unable to connect to server' + error)
      })

  }
  //store member account no.
  // async getacct() {
  //   try {
  //     this.membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
  //       let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
  //     console.log("membacct is: " + this.membacct);
  //     return this.membacct
  //   } catch (error) {
  //     console.log("CANT GET ACCT NO")
  //   }

  // }

  // async getToken() {
  //   try {
  //     this.token  = await AsyncStorage.getItem(ACCESS_TOKEN);
  //     console.log('membtoken is: ' + this.token);
  //     return this.token
  //   } catch (error) {
  //     console.log('CANT GET TOKEN');
  //   }
  // }

  onUser = (item) => {
    this.props.navigation.navigate('MemberInfoPage', item);
  };


  renderItem = ({ item }) => {
    var xgender = item.gender
    switch (xgender)     // Passing the variable to switch condition
    {
      case "M":
        xgender =  <Thumbnail source={require('../../assets/images/man.png')} />
        break;
      case "F":
        xgender =  <Thumbnail source={require('../../assets/images/girl.png')} />
        break;
      default:
        xgender =<Thumbnail source={require('../../assets/images/man.png')} />
          break;
      }
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />

        <ScrollView>

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Account Profiles</Text>
          </View>

          <View style={styles.contentStyle}>

            <List style={styles.listStyle}>

              <ListItem thumbnail style={styles.listItemMember} key={item.acct} onPress={() => this.onUser(item)}>

                <Left>
                  {/* <Thumbnail source={require('../../assets/images/person-100.png')} /> */}
                  {xgender}
                </Left>

                <Body style={{ borderBottomWidth: 0 }}>
                  <View style={styles.viewNameBadge}>
                    <Text style={styles.listFullname}>{item.fullname}</Text>
                  </View>
                  <Text note style={styles.listAccountNote}> {item.acct} / {item.contract}</Text>
                  <Badge style={styles.badgeStyle}><Text style={styles.badgeText}>{item.member_type}</Text></Badge>
                  {/* <Text>{item.member_type}</Text> */}
                </Body>

              </ListItem>
            </List>
          </View>
        </ScrollView>
      </Container>

    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{ height: 0, backgroundColor: 'gray' }}>
      </View>
    )
  }
  render() {
    //  const { data } = this.state
    const { spinnerStyle, spinnerTextStyle } = styles
    if (this.state.isLoading) {
      return (
        <View style={spinnerStyle}>
          <Spinner
            color={'green'}
            size={50}
            type={'ChasingDots'}
          />
          <Text style={spinnerTextStyle}>Fetching data...</Text>
        </View>
      )
    }
    return (
      <View style={StyleSheet.container}>
        <FlatList
          roundAvatar
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item}
          ItemSeparatorComponent={this.renderSeparator}
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
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  headerStyle: {
    backgroundColor: '#fff',
    marginBottom: 10,
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
  listItemMember: {
    marginLeft: 0,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#c4c4c4',
  },
  listFullname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5fb650',
  },
  listAccountNote: {
    fontSize: 16,
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
  }
});
