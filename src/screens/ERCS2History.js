import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  TouchableNativeFeedback,
  Modal,
  TouchableHighlight,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  Container,
  Header,
  Input,
  Button,
  Text,
  Title,
  Left,
  Right,
  Body,
  Label,
  Thumbnail,
  ListItem,
  List,
  Icon,
  Badge,
  Item,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';
import { StackActions, NavigationActions } from 'react-navigation';

const ACCESS_TOKEN = 'access_token';
const MEMBER_ID = 'member_id';
const MEMB_ACCOUNTNO = 'memb_accountno';
const MEMB_NAME = 'memb_name';
const MEMB_EMAIL = 'memb_email';

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'ERCS2LandingPage' })],
});

export default class ERCS2History extends React.Component {

  constructor(props) {
    super(props)
    global.storeToken = ''
    this.state = {
      isLoading: false,
      dataSource: [],
      membacctnum: '',
    }
  }

  onLogout() {
    this.deleteToken();
  }

  async deleteToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await AsyncStorage.removeItem(MEMBER_ID);
      await AsyncStorage.removeItem(MEMB_ACCOUNTNO);
      await AsyncStorage.removeItem(MEMB_NAME);
      await AsyncStorage.removeItem(MEMB_EMAIL);
      this.props.navigation.dispatch(resetAction);
    } catch {
      console.log('Something went wrong');
    }
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
    this.setState({
      isLoading: true,
      membacctnum: membacct
    })

    
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs2/history?acct=' + membacct , {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        // 'paramContract': '1',
        // 'Content-Type': 'application/json;charset=UTF-8'
      },
      params:{
        'acct': membacct
      }
    })
      .then((response) => {
        response.json().then((responseJson) => {
          console.log('rcshist', responseJson)
          if (responseJson.data != null) {
            console.log('rcshistory', responseJson)
            this.setState({
              isLoading: false,
              dataSource: responseJson.data,
            });
          } else {
            if (responseJson.error_message == 'No RCS Transaction Found!') {
              //this.showAlert();
              alert('No RCS Transaction found!')
              this.setState({ isLoading: false })

              this.props.navigation.navigate('Dashboard')
            }
          }

          if (responseJson == 'Invalid Access Token') {
            console.log('invalidToken', responseJson)
            alert('Session Expired')
            this.onLogout();
          }
        })
      })
      .catch((error) => {
        alert('Unable to connect to server' + error)
      })
  }


  renderItem = ({ item }) => {
    var xstatus = item.status
    switch (xstatus)     // Passing the variable to switch condition
    {
      case "A":
        xstatus = 'Approved'
        break;
      case "D":
        xstatus = 'DisApproved'
        break;
      case "W":
        xstatus = 'Pending'
        break;
      case "C":
        xstatus = 'Cancelled'
          break;
      default:
        xstatus = 'Pending'
        break;
    }
    
    return (
      
      <ScrollView>
      <View>
        <List>
          <ListItem noIndent>
            <Body>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.ERCSNumber}>{item.ercsno}</Text>
                <Badge style={styles.badgeStyle}>
                  <Text style={styles.badgeText}>{xstatus}</Text>
                </Badge>
              </View>
              <View style={styles.rowDetails}>
                <Icon type="EvilIcons" name="user" style={styles.iconLabel} />
                <Text note style={styles.textPatient}>
                  {item.patient}
                </Text>
              </View>
              <View style={styles.rowDetails}>
                <Icon
                  type="EvilIcons"
                  name="location"
                  style={styles.iconLabel}
                />
                <Text note>{item.hospital}</Text>
              </View>
              <View style={styles.rowDetails}>
                <Icon
                  type="EvilIcons"
                  name="clock"
                  style={styles.iconLabel}
                />
                <Text note>{item.validity_date}</Text>
              </View>
            </Body>
            <Right>
              <Text note>{item.ercs_date}</Text>
              <Button transparent>
                <Text
                  style={styles.buttonView}
                  onPress={() =>
                    this.props.navigation.navigate('ERCS2DetailsPage',{
                      rcsnum2 : item.ercsno,
                      acctno: this.state.membacctnum,
                      ercsid: item.record_id,
                      approvalcode: item.approval_code
                    })
                  }>
                  View
                </Text>
              </Button>
            </Right>
          </ListItem>
        </List>
      </View>
    </ScrollView>
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
    const { spinnerStyle, spinnerTextStyle } = styles
    return (
      <Container>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
 
          <FlatList
            roundAvatar
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item}
            ItemSeparatorComponent={this.renderSeparator}
          />

      </ScrollView>
      {
          (this.state.isLoading) &&
          <View styles={spinnerStyle}>
            <Spinner
              color={'#5fb650'}
              size={60}
              type={'Circle'}
              
            />
          </View>
        }
     </Container> 
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  ERCSNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#e74c3c',
  },
  iconLabel: {
    color: '#6d6e72',
    fontSize: 20,
    marginLeft: 18,
    marginTop: 1,
  },
  buttonView: {
    color: '#3498db',
  },
  badgeStyle: {
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    padding: 0,
  },
  badgeText: {
    color: '#6d6e72',
    fontStyle: 'italic',
    fontSize: 12,
  },
  rowDetails: {
    flexDirection: 'row',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //position: 'absolute',
    opacity: 0.2,
    backgroundColor: 'black',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
