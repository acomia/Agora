import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  TouchableNativeFeedback,
  TouchableHighlight,
  Alert,
  Dimensions,
  Picker,
  FlatList,
  TouchableOpacity,
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
  Icon,
  Item,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';
import {SearchBar} from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';

const ACCESS_TOKEN = 'access_token';
const MEMB_ACCOUNTNO = 'memb_accountno';
const MEMB_EMAIL = 'memb_email';
const MEMBER_ID = 'member_id';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'ERCS1SuccessPage'})],
});

export default class ERCS1Request extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    global.rcsNum = '';
    global.acctNum = '';
    this.state = {
      PickerValueHolder: 'I',
      MembPickerValueHolder: '',
      DoctorSpeciallty: '',
      RCSconsultype: [],
      Rcsmemb: [],
      RCSdoctorspecialty: [],
      sched: '',
      isLoading: true,
      searchTextChanged: false,
      search: '',
      searchIllness: '',
      found: 0,
      foundillness: 0,
      dataSource: [],
      dataSourceIllness: [],
      dataSourceIllnessSpec: [],
      providercode: '',
      docphone: '',
      rcsNo: '',
      acctno: '',
      visibleModal: false,
      docspec: '',
      confirm: true,
    };
    this.arrayholder = [];
    this.arrayholderIllness = [];
  }

  async componentDidMount() {
    this._isMounted = true;
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);

    // getting the principal and dependent of the acct
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/member/accounts',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          AccountNo: membacct,
        },
      },
    )
      .then(response => {
        response.json().then(responseJson => {
          {
            console.log('member', responseJson.data);
          }
          this.setState({
            Rcsmemb: responseJson.data,
          });
          Rcsmemb = responseJson.data;
          this.state.acctno = this.state.Rcsmemb[0].acct;
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
    // available consultype
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/consulttype',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(response => {
        response.json().then(consulttype => {
          this.setState({
            RCSconsultype: consulttype.data,
          });
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
    // gathering a hospital
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/providers/find?name=&location=',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          AccountNo: membacct,
        },
        params: {
          name: '',
          location: '',
        },
      },
    )
      .then(response => {
        response.json().then(provider => {
          console.log('providerko', provider);
          this.setState({
            dataSource: provider.data,
            isLoading: false,
          });
          this.arrayholder = provider.data;
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
    // gathering the illness
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/illness?gender=',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          gender: '',
        },
      },
    )
      .then(response => {
        response.json().then(illness => {
          this.setState({
            dataSourceIllness: illness.data,
          });
          dataSourceIllnessSpec = illness.data;
          this.arrayholderIllness = illness.data;
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async _IllnessSpeciallty() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    // gathering the illness specialty
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/specialty',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          illness: this.state.searchIllness,
        },
      },
    )
      .then(response => {
        response.json().then(illnessSpec => {
          this.setState({
            dataSourceIllnessSpec: illnessSpec.data[0],
          });
          dataSourceIllnessSpec = illnessSpec.data[0];
          this.DoctorScpec = this.DoctorScpec.bind(this);
          this.DoctorScpec();
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }

  async DoctorScpec() {
    this.setState({
      isLoading: true,
    });
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let specname = await this.state.dataSourceIllnessSpec.specialty_name;
    // gathering of the doctors base on the location and illness specialty
    try {
      fetch(
        'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/doctors?name=',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            HospitalCode: this.state.providercode,
            Specialty: specname,
          },
          params: {
            name: '',
          },
        },
      )
        .then(response => {
          response.json().then(doctorspec => {
            if (doctorspec.data != null) {
              this.setState({
                isLoading: false,
                RCSdoctorspecialty: doctorspec.data,
              });
              RCSdoctorspecialty = doctorspec.data;
            } else {
              this.setState({
                RCSdoctorspecialty: [],
              });
              alert('No Doctors Found!');
            }
          });
        })
        .catch(error => {
          alert('Error!' + error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  _onPressButton() {
    return (
      <View>
        <ScrollView></ScrollView>
      </View>
    );
  }

  async _postUser() {
    this.setState({
      isLoading: true,
    });
    if (this.state.search === null || this.state.search === '') {
      return alert('Hospital/Facility is Required');
    }
    if (this.state.email === null || this.state.email === '') {
      return alert('Email is Required');
    }
    if (this.state.acctno === null || this.state.acctno === '') {
      return alert('Account Number  is Required');
    }
    if (this.state.searchIllness === null || this.state.searchIllness === '') {
      return alert('Chief Complaint  is Required');
    }

    let email = await AsyncStorage.getItem(MEMB_EMAIL);
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let mid = await AsyncStorage.getItem(MEMBER_ID);
    let specname = await this.state.searchIllness;
    //let specname = await this.state.dataSourceIllnessSpec.specialty_name
    // submit to save record
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/submit',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          acctno: this.state.acctno,
          illness: specname,
          doctor_name:
            this.state.docspec.firstname + ' ' + this.state.docspec.lastname,
          doctor_code: this.state.docspec.doctor_code,
          doctor_phone: this.state.docspec.phone,
          hospital_name: this.state.search,
          hospital_code: this.state.providercode,
          hospital_schedule: this.state.sched,
          consult_type: this.state.PickerValueHolder,
        }),
      },
    )
      .then(response => {
        response.json().then(data => {
          let rcs = data.data.ercsno;
          // send to email
          if (data.is_success === true) {
            fetch(
              'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/sendtoemail?no=' +
                rcs,
              {
                method: 'GET',
                params: {
                  no: rcs,
                },
                headers: {
                  Authorization: 'Bearer ' + token,
                  EmailAddress: email,
                  AccountNo: this.state.acctno,
                  AccountID: mid,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
              .then(response => {
                response.json().then(data => {
                  if (data.is_success === true) {

                    global.rcsNum = rcs;
                    global.acctNum = this.state.acctno;
                    global.mid = mid;
                    this.setState({
                      isLoading: false,
                    });
                    this.props.navigation.dispatch(resetAction);

                  } else {
                    alert(data.error_message);
                  }
                });
              })
              .catch(error => {
                alert('Error!' + error);
              });
          } else {
            alert('error in saving', data.error_message);
          }
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.provider_name
        ? item.provider_name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
      searchTextChanged: true,
      providercode: '',
      found: 0,
    });
  }

  SearchIllnesFilterFunction(text) {
    const newDataillness = this.arrayholderIllness.filter(function(item) {
      const itemDataillness = item.illness
        ? item.illness.toUpperCase()
        : ''.toUpperCase();
      const textDataillness = text.toUpperCase();
      return itemDataillness.indexOf(textDataillness) > -1;
    });
    this.setState({
      dataSourceIllness: newDataillness,
      searchIllness: text,
      searchTextChanged: true,
      foundillness: 0,
    });
  }
  provideronpress = provider => () => {
    //Item sparator view
    return this.setState({
      search: provider.provider_name,
      sched: provider.clinic_hrs,
      found: 1,
      providercode: provider.provider_code,
    });
  };

  buttonEnable = () => {
    this.setState({
      confirm: false,
    });
  };
  illnessonpress = location1 => () => {
    //Item sparator view

    return (
      this._IllnessSpeciallty(),
      this.buttonEnable(),
      this.setState({searchIllness: location1.illness, foundillness: 1})
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    const {spinnerStyle, spinnerTextStyle} = styles;
    const {dataSource, dataSourceIllness} = this.state;
    return (
      <Container>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.headerStyle}>
          <Text style={styles.subHeader}>
            Kindly provide all necessary information to create your e-Referral
            Control Sheet 1 (e-RCS1) which you can use for your Consultation.
          </Text>
        </View>
        <View style={styles.divider} />
        <ScrollView style={styles.container}>
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Text style={styles.formLabel}>Choose member</Text>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              defaultValue={this.state.MembPickerValueHolder.acct}
              selectedValue={this.state.MembPickerValueHolder}
              onValueChange={(modeValue, itemIndex) => {
                this.setState({MembPickerValueHolder: modeValue});
                console.log('pciker', modeValue);
                this.setState({
                  acctno: modeValue,
                });
              }}>
              {this.state.Rcsmemb.map((item, key) => (
                <Picker.Item
                  label={item.fullname}
                  value={item.acct}
                  key={key}
                />
              ))}
            </Picker>
          </View>
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Text style={styles.formLabel}>Type of consultation</Text>
            <Picker
              mode="dropdown"
              style={{width: undefined}}
              iosIcon={<Icon name="arrow-down" color="#2d2d2d" />}
              itemStyle={{fontSize: 14}}
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(modeValue, itemIndex) =>
                this.setState({PickerValueHolder: modeValue})
              }>
              {this.state.RCSconsultype.map((item, key) => (
                <Picker.Item
                  label={item.description}
                  value={item.code}
                  key={key}
                />
              ))}
            </Picker>
          </View>
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Text style={styles.formLabel}>Choose hospital/facility</Text>
            <SearchBar
              lightTheme
              round
              searchIcon={{size: 18, color: '#cacaca'}}
              containerStyle={{
                height: 45,
                marginVertical: 10,
                backgroundColor: '#f5f5f5',
                borderBottomColor: '#f5f5f5',
                borderTopColor: '#f5f5f5',
                justifyContent: 'center',
              }}
              inputContainerStyle={{
                justifyContent: 'center',
                height: 45,
                backgroundColor: 'transparent',
              }}
              inputStyle={{justifyContent: 'center', fontSize: 14}}
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={() =>
                this.setState({
                  searchData: [],
                  destination: '',
                  searchIllness: '',
                })
              }
              placeholderTextColor="#cacaca"
              placeholder="Hospital/provider's name..."
              value={this.state.search}
            />
            {dataSource.length > 0 &&
            this.state.searchTextChanged &&
            this.state.search !== '' &&
            this.state.found === 0 ? (
              <FlatList
                style={{borderBottomWidth: 0}}
                data={this.state.dataSource}
                renderItem={({item}) => (
                  <View style={{backgroundColor: '#ffffff'}}>
                    <ListItem>
                      <TouchableOpacity onPress={this.provideronpress(item)}>
                        <Text
                          style={{
                            alignSelf: 'flex-start',
                            fontSize: 14,
                            color: '#5fb650',
                            fontWeight: 'bold',
                          }}>
                          {item.provider_name}
                        </Text>
                        <Text
                          style={{
                            alignSelf: 'flex-start',
                            fontSize: 12,
                            color: '#cacaca',
                          }}>
                          {item.street},{item.subd_brgy}, {item.city}
                        </Text>
                        <Text
                          style={{
                            alignSelf: 'flex-start',
                            fontSize: 12,
                            color: '#cacaca',
                          }}>
                          Schedule: {item.clinic_hrs}
                        </Text>
                      </TouchableOpacity>
                    </ListItem>
                  </View>
                )}
                keyExtractor={item => item.provider_name}
              />
            ) : null}
          </View>
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Text style={styles.formLabel}>Chief complaint</Text>
            <SearchBar
              round
              lightTheme
              searchIcon={{size: 18, color: '#cacaca'}}
              containerStyle={{
                width: SCREEN_WIDTH,
                height: 45,
                marginVertical: 10,
                backgroundColor: '#f5f5f5',
                borderBottomColor: '#f5f5f5',
                borderTopColor: '#f5f5f5',
                justifyContent: 'center',
              }}
              inputContainerStyle={{
                justifyContent: 'center',
                height: 45,
                backgroundColor: 'transparent',
              }}
              inputStyle={{justifyContent: 'center', fontSize: 14}}
              onChangeText={text => this.SearchIllnesFilterFunction(text)}
              onClear={() => this.setState({searchData1: [], destination1: ''})}
              placeholderTextColor="#cacaca"
              placeholder="Search Illness..."
              value={this.state.searchIllness}
            />
            {dataSourceIllness.length > 0 &&
            this.state.searchTextChanged &&
            this.state.searchIllness !== '' &&
            this.state.foundillness === 0 ? (
              <FlatList
                data={this.state.dataSourceIllness}
                renderItem={({item}) => (
                  <View style={{backgroundColor: '#fff'}}>
                    <ListItem>
                      <TouchableOpacity onPress={this.illnessonpress(item)}>
                        <Text style={{alignSelf: 'flex-start', fontSize: 15}}>
                          {item.illness}
                        </Text>

                        {/* <Text style={{ alignSelf: 'flex-start', fontSize: 12 }}>Schedule: {item.clinic_hrs}</Text> */}
                      </TouchableOpacity>
                    </ListItem>
                  </View>
                )}
                keyExtractor={item => item.illness}
              />
            ) : null}
          </View>
          <View style={{marginVertical: 20}}>
            <Text style={styles.formLabel}>Attending Physician</Text>
            <Button
              iconRight
              disabled={this.state.confirm}
              onPress={() => {
                this.setState({visibleModal: true});
              }}
              style={{
                marginVertical: 10,
                backgroundColor: '#f5f5f5',
                elevation: 0,
                shadowOpacity: 0,
              }}>
              <Text style={{textTransform: 'capitalize', color: '#cacaca'}}>
                Choose Doctor
              </Text>
              <Icon
                type="Ionicons"
                name="md-arrow-dropdown"
                style={{color: '#2d2d2d', fontSize: 18}}
              />
            </Button>
            <View
              style={{
                marginVertical: 10,
                paddingLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#5fb650',
                  fontWeight: 'bold',
                  alignSelf: 'flex-start',
                }}>
                {this.state.docspec === ''
                  ? ''
                  : 'DR. ' +
                    this.state.docspec.firstname +
                    ' ' +
                    this.state.docspec.lastname}
              </Text>
              <Text
                style={{
                  color: '#cacaca',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                }}>
                {this.state.docspec === ''
                  ? ''
                  : 'Room No: ' + this.state.docspec.room}
              </Text>
              <Text
                style={{
                  color: '#cacaca',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                }}>
                {this.state.docspec === ''
                  ? ''
                  : 'Schedule: ' + this.state.docspec.schedule}
              </Text>
              <Text
                style={{
                  color: '#cacaca',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                }}>
                {this.state.docspec === ''
                  ? ''
                  : 'Phone No: ' + this.state.docspec.phone}
              </Text>
            </View>
            <Modal
              isVisible={this.state.visibleModal}
              animationInTiming={1000}
              animationOutTiming={1000}
              style={{height: '50%'}}>
              <View style={styles.modalContainerStyle}>
                <View
                  style={{backgroundColor: 'white', alignItems: 'flex-end'}}>
                  <Button
                    rounded
                    transparent
                    onPress={() => {
                      this.setState({visibleModal: false});
                    }}>
                    <Icon
                      type="Ionicons"
                      name="md-close"
                      style={{color: '#c4c4c4'}}
                    />
                  </Button>
                </View>
                <ScrollView>
                  {this.state.RCSdoctorspecialty.map((item, key) => (
                    <ListItem key={key}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({docspec: item, visibleModal: false});
                        }}>
                        <View>
                          <Text
                            style={{
                              color: '#5fb650',
                              fontSize: 14,
                              fontWeight: 'bold',
                              alignSelf: 'flex-start',
                            }}>
                            DR.
                            {item.firstname + ' ' + item.lastname}
                          </Text>
                          <Text
                            style={{
                              color: '#c4c4c4',
                              fontSize: 12,
                              alignSelf: 'flex-start',
                            }}>
                            {item.major_specialty}
                          </Text>
                          <Text
                            style={{
                              color: '#c4c4c4',
                              fontSize: 12,
                              alignSelf: 'flex-start',
                            }}>
                            Room {item.room}
                          </Text>
                          <Text
                            style={{
                              color: '#c4c4c4',
                              fontSize: 12,
                              alignSelf: 'flex-start',
                            }}>
                            Schedule: {item.schedule}
                          </Text>
                          <Text
                            style={{
                              color: '#c4c4c4',
                              fontSize: 12,
                              alignSelf: 'flex-start',
                            }}>
                            Phone No: {item.phone}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </ListItem>
                  ))}
                </ScrollView>
              </View>
            </Modal>
          </View>
          <View style={{bottom: 10}}>
            <Button
              rounded
              success
              style={styles.buttonStyle}
              onPress={() => this._postUser()}>
              <Title>Submit</Title>
            </Button>
          </View>
        </ScrollView>
        {this.state.isLoading && (
          <View style={spinnerStyle}>
            <Spinner color={'#5fb650'} size={60} type={'ThreeBounce'} />
          </View>
        )}
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 10,
  },
  headerStyle: {
    height: 90,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#5fb650',
  },
  subHeader: {
    color: '#cacaca',
    fontSize: 14,
  },
  formInput: {
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  formLabel: {
    marginHorizontal: 5,
    color: '#2d3436',
    fontWeight: 'bold',
    fontSize: 12,
  },
  formStyle: {
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: '#5fb650',
    color: '#fff',
    justifyContent: 'center',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  textStyle: {
    padding: 10,
  },
  modalContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
  },
});
