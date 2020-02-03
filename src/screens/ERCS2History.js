import React from 'react';
import { StyleSheet, View, StatusBar, Dimensions, FlatList } from 'react-native';
import {
  Container,
  Button,
  Text,
  Right,
  Body,
  ListItem,
  List,
  Badge,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';
import { StackActions, NavigationActions } from 'react-navigation';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5'

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
    super(props);
    global.storeToken = '';
    this.state = {
      isLoading: false,
      dataSource: [],
      membacctnum: '',
    };
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
      membacctnum: membacct,
    });

    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs2/history?acct=' +
      membacct,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          // 'paramContract': '1',
          // 'Content-Type': 'application/json;charset=UTF-8'
        },
        params: {
          acct: membacct,
        },
      },
    )
      .then(response => {
        response.json().then(responseJson => {
          console.log('rcshist', responseJson);
          if (responseJson.data != null) {
            this.setState({
              isLoading: false,
              dataSource: responseJson.data,
            });
          } else {
            if (responseJson.error_message == 'No RCS Transaction Found!') {
              this.setState({ isLoading: false });
            }
          }

          if (responseJson == 'Invalid Access Token') {
            console.log('invalidToken', responseJson);
            alert('Session Expired');
            this.onLogout();
          }
        });
      })
      .catch(error => {
        alert('Unable to connect to server' + error);
      });
  }

  renderItem = ({ item }) => {
    var xstatus = item.status;
    const {
      StatusApproved,
      StatusCancelled,
      StatusPending,
      StatusDisapproved,
    } = styles;
    switch (
    xstatus // Passing the variable to switch condition
    ) {
      case 'A':
        xstatus = 'Approved';
        statusStyle = StatusApproved;
        break;
      case 'D':
        xstatus = 'Disapproved';
        statusStyle = StatusDisapproved;
        break;
      case 'W':
        xstatus = 'Pending';
        statusStyle = StatusPending;
        break;
      case 'C':
        xstatus = 'Cancelled';
        statusStyle = StatusCancelled;
        break;
      default:
        xstatus = 'Pending';
        statusStyle = StatusPending;
        break;
    }
    return (
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View>
          <List>
            <ListItem noIndent>
              <Body>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.ERCSNumber}>{item.ercsno}</Text>
                  <Badge style={[statusStyle]}>
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
                  <Text note>
                    {item.validity_date === ''
                      ? 'N/A'
                      : moment(item.validity_date).format('L')}
                  </Text>
                </View>
              </Body>
              <Right>
                <Text note>
                  {item.ercs_date === ''
                    ? 'N/A'
                    : moment(item.ercs_date).format('L')}
                </Text>
                <Button transparent>
                  <Text
                    style={styles.buttonView}
                    onPress={() =>
                      this.props.navigation.navigate('ERCS2DetailsPage', {
                        rcsnum2: item.ercsno,
                        acctno: this.state.membacctnum,
                        ercsid: item.record_id,
                        approvalcode: item.approval_code,
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
  };

  renderSeparator = () => {
    return <View style={{ height: 0, backgroundColor: 'gray' }}></View>;
  };
  renderSeparator = () => {
    return <View style={{ height: 0, backgroundColor: 'gray' }}></View>;
  };

  render() {
    const { spinnerStyle, spinnerTextStyle } = styles;
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        {this.state.dataSource.length <= 0 &&
          (
            <View style={{ alignContent: 'center', alignItems: 'center', top: 20 }}>
              <Icon name="history" color="#e74c3c" size={40} style={{ marginVertical: 10 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#e74c3c" }}>No transaction history!</Text>
            </View>
          )
        }
        <ScrollView>
          <FlatList
            roundAvatar
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={item => item.ercsno}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </ScrollView>
        {this.state.isLoading && (
          <View style={spinnerStyle}>
            <Spinner color={'#e74c3c'} size={60} type={'ThreeBounce'} />
          </View>
        )}
      </Container>
    );
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  ERCSNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#e74c3c',
    marginLeft: 0,
  },
  iconLabel: {
    color: '#6d6e72',
    fontSize: 20,
    marginLeft: 5,
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
    color: '#ffff',
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
    position: 'absolute',
    backgroundColor: '#ffff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  StatusApproved: {
    borderRadius: 5,
    backgroundColor: '#5fb650',
    padding: 0,
  },
  StatusCancelled: {
    borderRadius: 5,
    backgroundColor: '#FF5733',
    padding: 0,
  },
  StatusPending: {
    borderRadius: 5,
    backgroundColor: '#F4D03F',
    padding: 0,
  },
  StatusDisapproved: {
    borderRadius: 5,
    backgroundColor: '#FF5733',
    padding: 0,
  },
});
