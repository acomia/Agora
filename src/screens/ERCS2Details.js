import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
  TouchableNativeFeedback
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
  Thumbnail,
  Body,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';
import moment from 'moment';

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

export default class ERCS2Details extends React.Component {
  constructor(props) {
    super(props);
    global.storeToken = '';
    this.state = {
      isLoading: false,
      dataSource: [],
      dataDisApprvdProcSource: [],
      dataApprvdProcSource: [],
      dataWaitingProcSource: [],
      dataDocSource: [],
      dataProcSource: [],
      acct_no: '',
      rcsno: '',
      rcsid: '',
      apprvl_code: '',
      membname: '',
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
    const { rcsnum2, acctno, ercsid } = navigation.state.params;
    let memb_name = await AsyncStorage.getItem(MEMB_NAME);
    this.setState({
      isLoading: true,
      acct_no: acctno,
      rcsno: rcsnum2,
      rcsid: ercsid,
      membname: memb_name,
    });
    global.storeToken = await AsyncStorage.getItem(ACCESS_TOKEN);

    //Get RCS details
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs2/history/details?ercs=' +
      rcsnum2,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + global.storeToken,
        },
      },
    )
      .then(response => {
        response.json().then(responseJson => {
          if (responseJson.data !== null) {
            this.setState({
              dataSource: responseJson.data,
              apprvl_code: responseJson.data.approval_code,
            });
          } else {
            alert('No RCS Transaction found!');
          }
          if (responseJson === 'Invalid Access Token') {
            console.log('invalidToken', responseJson);
            alert('Session Expired');
            this.onLogout();
            this.props.navigation.navigate('Dashboard');
          }
        });
      })
      .catch(error => {
        alert('Unable to connect to server' + error);
        this.props.navigation.goBack();
      });
    //Get all procedures data
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs2/history/procedures?ercs=' +
      rcsnum2,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + global.storeToken,
        },
      },
    )
      .then(response => {
        response.json().then(responseJson => {
          if (responseJson.data !== null) {
            let disapprovedProc = responseJson.data.filter(data => {
              return data.status === 'D';
            });
            let approvedProc = responseJson.data.filter(data => {
              return data.status === 'A';
            });
            let waitingProc = responseJson.data.filter(data => {
              return data.status === 'W';
            });
            this.setState({
              dataDisApprvdProcSource: disapprovedProc,
              dataApprvdProcSource: approvedProc,
              dataWaitingProcSource: waitingProc,
              dataProcSource: responseJson.data
            });
          } else {
            alert('No RCS Procedures found!');
          }
          if (responseJson === 'Invalid Access Token') {
            console.log('invalidToken', responseJson);
            alert('Session Expired');
            this.onLogout();
            this.props.navigation.navigate('Dashboard');
          }
        });
      })
      .catch(error => {
        alert('Unable to connect to server' + error);
        this.props.navigation.goBack();
      });
    //Get all the uploaded documents
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs2/history/documents?ercs=' +
      rcsnum2,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + global.storeToken,
        },
      },
    )
      .then(response => {
        response.json().then(responseJson => {
          if (responseJson.data !== null) {
            this.setState({
              isLoading: false,
              dataDocSource: responseJson.data,
            });
          } else {
            this.setState({ isLoading: false });
          }
          if (responseJson === 'Invalid Access Token') {
            console.log('invalidToken', responseJson);
            alert('Session Expired');
            this.onLogout();
            this.props.navigation.navigate('Dashboard');
          }
        });
      })
      .catch(error => {
        alert('Unable to connect to server' + error);
        this.props.navigation.goBack();
      });
  }
  async _sendemail() {
    <ActivityIndicator size="small" color="white" />;
    const { navigation } = this.props;
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let email = await AsyncStorage.getItem(MEMB_EMAIL);
    let mid = await AsyncStorage.getItem(MEMBER_ID);
    // let rcsno = navigation.getParam('rcsnum2', '');
    let acctNum = this.state.dataSource.acctno;
    //let acctNum = navigation.getParam('acctno', '');
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs2/sendtoemail?no=' +
      this.state.rcsno,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          EmailAddress: email,
          AccountNo: acctNum,
          AccountID: mid,
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
      .then(response => {
        response.json().then(data => {
          if (data.is_success === true) {
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

  // _getImage = async item => {
  //   //console.log('itemimage', item)
  //   let resp = await fetch(
  //     'https://intellicare.com.ph/uat/webservice/memberprofile/api/member/filepathtoimage',
  //     {
  //       method: 'GET',
  //       headers: {
  //         Authorization: 'Bearer ' + global.storeToken,
  //         ImagePath: item.file_path,
  //       },
  //     },
  //   );
  //   let respBlob = await resp.blob();
  //   let reader = new FileReader();
  //   reader.readAsDataURL(respBlob);

  //   reader.onload = () => {
  //     this.setState({ img_uri: reader.result });
  //     console.log('imagedone', this.state.img_uri)
  //   };

  //   // <TouchableOpacity>

  //   // </TouchableOpacity>

  // };

  // renderItem = ({ item }) => {
  //   return (
  //     // <TouchableOpacity>
  //     this._getImage(item),
  //     <List style={styles.listStyle}>
  //       <View style={{ flex: 1, flexDirection: 'row' }}>
  //         <Text
  //           style={{
  //             color: '#c4c4c4',
  //             textAlign: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           {item.file_name}
  //         </Text>
  //         <Thumbnail large style={{ alignSelf: "center" }} source={{ uri: this.state.img_uri }} resizeMode='contain' />
  //       </View>
  //     </List>
  //     // </TouchableOpacity>
  //   );
  // };

  render() {
    const {
      StatusApproved,
      StatusCancelled,
      StatusOthers,
      StatusPending,
      StatusDisapproved,
    } = styles;
    const NewData = this.state.dataProcSource.filter((item) => {
      return item.status === 'D'
    })
    console.log('test112', this.state.dataSource.status)
    var xstatus = this.state.dataSource.status;
    var statusStyle = '';
    var statRemarks = '';
    switch (
    xstatus // Passing the variable to switch condition
    ) {
      case 'A':
        xstatus = 'Approved';
        statusStyle = StatusApproved;
        break;
      case 'D':
        xstatus = 'Disapproved';
        statRemarks = 'Request has been disapproved';
        statusStyle = StatusCancelled; //same color as pending
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
    return (
      <Container>
        {console.log('sasasa', xstatus)}
        <ScrollView backgroundColor="#f5f5f5">
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
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
                  name="check-circle"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>
                  {xstatus === 'Cancelled'
                    ? 'N/A'
                    : xstatus === 'Pending'
                      ? 'Waiting for approval'
                      : this.state.dataSource.approval_code}
                </Text>
              </View>
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
                  {'Dr. ' + this.state.dataSource.doctor}
                </Text>
              </View>
            </View>

            {xstatus === 'Approved' || xstatus === 'Pending' ? null : (
              <View>
                <View style={styles.divider} />
                <View style={{ flexDirection: 'row' }}>
                  <Left style={{ marginLeft: 10 }}>
                    <Text note>{statRemarks}</Text>
                  </Left>
                  <Right style={{ alignSelf: 'flex-end' }}>
                    <Button
                      light
                      style={{ margin: 10, elevation: 0, shadowOpacity: 0 }}
                      onPress={() => {
                        xstatus === 'Cancelled'
                          ? this.props.navigation.navigate(
                            'ERCS2CancelDetailsPage',
                            {
                              cancelledby: this.state.membname,
                              cancelled_dt: new Date(),
                              cancel_remark: this.state.dataSource
                                .cancelled_remarks,
                            },
                          )
                          : this.props.navigation.navigate(
                            'ERCS2DisapprovedDetailsPage',
                            {
                              status: this.state.dataSource.status,
                              appvdby: this.state.dataSource.approve_by,
                              appvddate: this.state.dataSource.approve_date,
                              remarks: this.state.dataSource.remarks,
                            },
                          );
                      }}>
                      <Text style={styles.buttonChangeDetails}>
                        Check Details
                      </Text>
                    </Button>
                  </Right>
                </View>
              </View>
            )}
          </View>
          {xstatus === 'Cancelled' ||
            xstatus === 'Pending' ||
            xstatus === 'Disapproved' ? null : (
              <View style={styles.viewOtherDetails}>
                <Text style={styles.cardTitle}>DIAGNOSIS</Text>
                <Text style={[styles.textRcsDetails, { marginLeft: 16 }]}>
                  {this.state.dataSource.diagnosis}
                </Text>
              </View>
            )}
          {xstatus === 'Cancelled' ||
            xstatus === 'Approved' ||
            xstatus === 'Disapproved' ? null : (
              <View style={styles.viewOtherDetails}>
                <Text style={styles.cardTitle}>WAITING FOR APPROVAL</Text>
                <View>
                  <FlatList
                    roundAvatar
                    style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                    data={this.state.dataWaitingProcSource}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: 10,
                          margin: 2,
                        }}>
                        <Text style={styles.procedureListTextStyle}>
                          {item.procedure_name}
                        </Text>
                        {/* {item.status === 'W' ? (
                        <Text style={styles.procedureListTextStyle}>
                          {item.procedure_name}
                        </Text>
                      ) : null} */}
                      </View>
                    )}
                    keyExtractor={item => item.procedure_id}
                  />
                </View>
              </View>
            )}
          {xstatus === 'Cancelled' ||
            xstatus === 'Pending' ||
            xstatus === 'Disapproved' ? null : (
              <View style={styles.viewOtherDetails}>
                <Text style={styles.cardTitle}>APPROVED PROCEDURES</Text>
                <View>
                  <FlatList
                    roundAvatar
                    style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                    data={this.state.dataApprvdProcSource}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: 10,
                          margin: 2,
                        }}>
                        <Text style={styles.procedureListTextStyle}>
                          {item.procedure_name}
                        </Text>
                        {/* {item.status === 'A' ? (
                        <Text style={styles.procedureListTextStyle}>
                          {item.procedure_name}
                        </Text>
                      ) : null} */}
                      </View>
                    )}
                    keyExtractor={item => item.procedure_id}
                  />
                </View>
              </View>
            )}
          {NewData.length <= 0 ? null : (
            <View style={styles.viewOtherDetails}>
              <Text style={styles.cardTitle}>DISAPPROVED PROCEDURES</Text>
              <View>
                <FlatList
                  roundAvatar
                  data={this.state.dataDisApprvdProcSource}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 10,
                        margin: 2,
                      }}>
                      <Text style={styles.procedureListTextStyle}>
                        {item.procedure_name}
                      </Text>
                      {/* {item.status === 'D' ? (
                        <Text style={styles.procedureListTextStyle}>
                          {item.procedure_name}
                        </Text>
                      ) : null} */}
                    </View>
                  )}
                  keyExtractor={item => item.procedure_id}
                />
              </View>
              <View style={styles.divider} />
              <View>
                <Left />
                <Right style={{ alignSelf: 'flex-end' }}>
                  <Button
                    light
                    // disabled={xstatus = 'Approved' && NewData.length > 0 ? false : true}
                    style={{ margin: 10, elevation: 0, shadowOpacity: 0 }}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'ERCS2DisapprovedProcedurePage',
                        {
                          procstatus: this.state.dataSource.status,
                          procappvdby: this.state.dataSource.approve_by,
                          procappvddate: this.state.dataSource.approve_date,
                          procremarks: this.state.dataSource.remarks,
                          procdata: this.state.dataDisApprvdProcSource,
                        },
                      )
                    }>
                    <Text style={styles.buttonChangeDetails}>
                      Check Details
                    </Text>
                  </Button>
                </Right>
              </View>
            </View>
          )}
          {xstatus === 'Cancelled' ||
            xstatus === 'Pending' ||
            this.state.dataSource.remarks === '' ||
            xstatus === 'Disapproved' ? null : (
              <View style={styles.viewOtherDetails}>
                <Text style={styles.cardTitle}>ADDITIONAL REMARKS</Text>
                <View>
                  <Text style={{ color: '#6d6e72', fontSize: 12, marginLeft: 16 }}>
                    {this.state.dataSource.remarks}
                  </Text>
                </View>
              </View>
            )}
          <View style={styles.viewOtherDetails}>
            <Text style={styles.cardTitle}>UPLOADED REQUIREMENTS</Text>
            <FlatList
              contentContainerStyle={{ alignSelf: 'stretch' }}
              data={this.state.dataDocSource}
              renderItem={({ item }) => (
                <View>
                  <Text
                    style={{
                      color: '#c4c4c4',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}>
                    {item.file_name}
                  </Text>
                </View>
              )}
              keyExtractor={item => item.record_id}

            />
            <View>
              <List style={styles.listStyle}>
                <Thumbnail large style={{ alignSelf: "center" }} source={{ uri: this.state.img_uri }} resizeMode='contain' />
              </List>
            </View>
          </View>
          <View style={styles.viewButton}>
            <Button
              disabled={this.state.dataSource.status === 'A' ? false : true}
              block
              rounded
              iconLeft
              style={
                this.state.dataSource.status === 'A'
                  ? [styles.buttonSend, { backgroundColor: '#5DADE2' }]
                  : styles.buttonSend
              }
              onPress={() => this._sendemail()}>
              <Icon type="FontAwesome" name="send-o" />
              <Text>Send to e-mail</Text>
            </Button>
            <Button
              disabled={this.state.dataSource.status === 'A' ? false : true}
              block
              rounded
              iconLeft
              style={this.state.dataSource.status === 'A' ? styles.buttonCancel : null}
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
            <Text style={[styles.textModalStyle, { color: 'red' }]}>
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
                  this.props.navigation.navigate('ERCSCancelRemarks', {
                    details_acctno: this.state.acct_no,
                    details_rcsno: this.state.rcsno,
                    details_rcsid: this.state.rcsid,
                    details_apprvlcode: this.state.apprvl_code,
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
              <Text style={{ fontWeight: 'bold' }}>Cancel</Text>
            </Button>
          </View>
        </Modal>
        {this.state.isLoading && (
          <View style={styles.spinnerStyle}>
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
    backgroundColor: 'red',
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
  thumbnailStyle: {
    marginLeft: 20,
    marginVertical: 3,
    borderRadius: 4,
  },
});
