import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Button,
  Text,
  Left,
  Right,
  ListItem,
  List,
  Icon,
  Container,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';
import moment from 'moment';

import { RCS1_HISTORY_DETAILS, RCS1_SENDTOMAIL } from '../util/api';

const ACCESS_TOKEN = 'access_token';
const MEMBER_ID = 'member_id';
const MEMB_ACCOUNTNO = 'memb_accountno';
const MEMB_NAME = 'memb_name';
const MEMB_EMAIL = 'memb_email';

export default class ERCS1Details extends React.Component {
  constructor(props) {
    super(props);
    global.storeToken = '';
    this.state = {
      isLoading: false,
      dataSource: [],
      dataProcSource: [],
      dataDocSource: [],
      acct_no: '',
      rcsid: '',
      rcsnum: '',
      visibleModal: false,
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
    const { navigation } = this.props;
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    const { rcsnum1, acctno, ercsid } = navigation.state.params;
    this.setState({
      isLoading: true,
      acct_no: acctno,
      rcsnum: rcsnum1,
      rcsid: ercsid,
    });
    // let rcsnum1 = navigation.getParam('rcsnum1', '');

    fetch(RCS1_HISTORY_DETAILS + rcsnum1, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        ercs: rcsnum1,
      },
    })
      .then(response => {
        response.json().then(responseJson => {
          if (responseJson.data != null) {
            this.setState({
              isLoading: false,
              dataSource: responseJson.data,
            });
          } else {
            this.setState({ isLoading: false });
            alert('No RCS Transaction found!');
            this.props.navigation.navigate('ERCS1HistoryPage');
            //}
          }

          if (responseJson == 'Invalid Access Token') {
            alert('Session Expired');
            this.onLogout();
            this.props.navigation.navigate('Dashboard');
          }
        });
      })
      .catch(error => {
        alert('Unable to connect to server' + error);
      });
  }

  async _sendemail() {
    <ActivityIndicator size="small" color="white" />;
    const { navigation } = this.props;
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let email = await AsyncStorage.getItem(MEMB_EMAIL);
    let mid = await AsyncStorage.getItem(MEMBER_ID);
    let rcsnum1 = navigation.getParam('rcsnum1', '');
    let acctNum = this.state.dataSource.acctno;
    //let acctNum = navigation.getParam('acctno', '');
    this.setState({ isLoading: true });
    fetch(RCS1_SENDTOMAIL + rcsnum1, {
      method: 'GET',
      params: {
        no: rcsnum1,
      },
      headers: {
        Authorization: 'Bearer ' + token,
        EmailAddress: email,
        AccountNo: acctNum,
        AccountID: mid,
        //'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        response.json().then(data => {
          if (data.is_success === true) {
            this.setState({ isLoading: false });
            alert('RCS sent to Email Successfully');
          } else {
            alert(data.error_message);
          }
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }

  render() {
    const {
      StatusApproved,
      StatusCancelled,
      StatusOthers,
      StatusPending,
    } = styles;
    var xstatus = this.state.dataSource.status;
    var statusStyle = '';
    var statRemarks = '';
    var xconsulttype = this.state.dataSource.type_of_consult_code;
    var enddate = moment(this.state.dataSource.validity_date).format('L')
    switch (
    xstatus // Passing the variable to switch condition
    ) {
      case 'A':
        xstatus = 'Approved';
        statusStyle = StatusApproved;
        break;
      case 'W':
        xstatus = 'Pending';
        statusStyle = StatusPending;
        break;
      case 'C':
        xstatus = 'Cancelled';
        statRemarks = 'Cancelled by you';
        statusStyle = StatusCancelled;
        break;
      default:
        xstatus = 'Pending';
        statusStyle = StatusPending;
        break;
    }

    switch (xconsulttype) {
      case 'I':
        xconsulttype = 'Initial';
        break;
      case 'F':
        xconsulttype = 'FOLLOW-UP';
        break;
      case 'C':
        xconsulttype = 'CARDIOPULMONARY (CP) CLEARANCE';
        break;
    }
    return (
      <Container>
        <ScrollView backgroundColor="#f5f5f5">
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          <View style={styles.viewRcsDetails}>
            <List>
              <ListItem noIndent style={{ borderBottomWidth: 0 }}>
                <Left style={{ flex: 2 }}>
                  <Text style={styles.ERCSNumber}>
                    {this.state.dataSource.ercsno}
                  </Text>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={[statusStyle]}>{xstatus}</Text>
                </Right>
              </ListItem>
            </List>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="smile"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>
                  {this.state.dataSource.patient}
                </Text>
              </View>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="clipboard"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>{xconsulttype}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="calendar"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>
                  {moment(this.state.dataSource.ercs_date).format('L')}
                </Text>
              </View>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="clock"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>
                  {xstatus === 'Cancelled'
                    ? 'N/A'
                    : xstatus === 'Pending'
                      ? 'Waiting for approval'
                      : xstatus === 'Disapproved'
                        ? 'N/A'
                        : moment(this.state.dataSource.validity_date).format('L')}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="map-pin"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>
                  {this.state.dataSource.hospital}
                </Text>
              </View>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="user"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>
                  DR. {this.state.dataSource.doctor}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.viewOtherDetails}>
            <Text style={styles.cardTitle}>CHIEF COMPLAINT</Text>
            <Text note style={styles.textComplaint}>
              {this.state.dataSource.illness}
            </Text>
          </View>
          {xstatus === 'Approved' || xstatus === 'Pending' ? null : (
            <View style={styles.viewOtherDetails}>
              <View style={{ flexDirection: 'row' }}>
                <Left style={{ marginLeft: 10 }}>
                  <Text note>Cancelled by you</Text>
                </Left>
                <Right style={{ alignSelf: 'flex-end' }}>
                  <Button
                    light
                    style={{ margin: 10, elevation: 0, shadowOpacity: 0 }}
                    onPress={() =>
                      this.props.navigation.navigate('ERCS1CancelDetailsPage', {
                        cancelDate: this.state.dataSource.cancelled_date,
                        cancelRemarks: this.state.dataSource.cancelled_remarks,
                      })
                    }>
                    <Text style={styles.buttonChangeDetails}>
                      Check Details
                    </Text>
                  </Button>
                </Right>
              </View>
            </View>
          )}
          <View style={styles.viewButton}>
            <Button
              disabled={((enddate >= moment().format('L')) && xstatus === 'Approved') ? false : true}
              block
              rounded
              iconLeft
              style={((enddate >= moment().format('L')) &&
                xstatus === 'Approved')
                ? [styles.buttonSend, { backgroundColor: '#5DADE2' }]
                : styles.buttonSend
              }
              onPress={() => this._sendemail()}>
              <Icon type="FontAwesome" name="send-o" />
              <Text>Send to e-mail</Text>
            </Button>
            <Button
              disabled={((enddate >= moment().format('L')) && xstatus === 'Approved') ? false : true}
              block
              rounded
              iconLeft
              style={((enddate >= moment().format('L')) && xstatus === 'Approved') ? styles.buttonCancel : null}
              onPress={() => {
                this.setState({ visibleModal: true });
              }}>
              <Icon type="MaterialCommunityIcons" name="cancel" />
              <Text>Cancel this Request</Text>
            </Button>
          </View>
        </ScrollView>
        <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <Text style={[styles.textModalStyle, { color: 'green' }]}>
              Are you sure you want to cancel your request?
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              padding: 10,
            }}>
            <Button
              block
              // rounded
              info
              style={{ flex: 1, margin: 5 }}
              onPress={() => {
                this.setState({ visibleModal: false }),
                  this.props.navigation.navigate('ERCS1CancelRemarks', {
                    details_acctno: this.state.acct_no,
                    details_rcsno: this.state.rcsnum,
                    details_rcsid: this.state.rcsid,
                  });
              }}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>OKAY</Text>
            </Button>
            <Button
              block
              //rounded
              warning
              style={{ flex: 1, margin: 5 }}
              onPress={() => this.setState({ visibleModal: false })}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Cancel</Text>
            </Button>
          </View>
        </Modal>
        {this.state.isLoading && (
          <View style={styles.spinnerStyle}>
            <Spinner color={'#5fb650'} size={60} type={'ThreeBounce'} />
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
    color: '#5fb650',
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
  cardTitle: {
    fontWeight: 'bold',
    color: '#2d3436',
    padding: 10,
    fontSize: 12,
  },
  buttonSend: {
    marginBottom: 20,
  },
  buttonCancel: {
    backgroundColor: '#e74c3c',
  },
  viewButton: {
    margin: 20,
  },
  rowRcsDetails: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconRcsDetails: {
    fontSize: 16,
    padding: 5,
    color: '#6d6e72',
  },
  textRcsDetails: {
    color: '#6d6e72',
    fontSize: 14,
    marginTop: 4,
    marginRight: 20,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  viewRcsDetails: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingBottom: 5,
    paddingLeft: 0,
  },
  viewOtherDetails: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingBottom: 5,
  },
  StatusApproved: {
    color: '#5fb650',
    fontWeight: 'bold',
  },
  StatusCancelled: {
    color: 'red',
    fontWeight: 'bold',
  },
  StatusPending: {
    color: '#F4D03F',
    fontWeight: 'bold',
  },
  StatusDisapproved: {
    color: '#c4c4c4',
    fontWeight: 'bold',
  },
  divider: {
    marginTop: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '#c4c4c4',
  },
  buttonChangeDetails: {
    textTransform: 'capitalize',
    color: '#2d3436',
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
  modalContent: {
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  textModalStyle: {
    color: '#5fb650',
    fontSize: 16,
    fontWeight: 'bold',
  },
  procedureListTextStyle: {
    color: '#6d6e72',
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: '#c4c4c4',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    fontSize: 12,
    flexDirection: 'row',
  },
  textComplaint: {
    marginHorizontal: 20,
  },
  StatusApproved: {
    color: '#5fb650',
    fontWeight: 'bold',
  },
  StatusCancelled: {
    color: 'red',
    fontWeight: 'bold',
  },
  StatusPending: {
    color: '#F4D03F',
    fontWeight: 'bold',
  },
  StatusDisapproved: {
    color: '#c4c4c4',
    fontWeight: 'bold',
  },
});
