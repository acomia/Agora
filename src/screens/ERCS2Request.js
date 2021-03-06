import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Picker,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Container,
  CardItem,
  Card,
  Button,
  Text,
  Body,
  ListItem,
  Icon,
  Thumbnail,
  Textarea,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { SearchBar } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import DocumentPicker from 'react-native-document-picker';
import { StackActions, NavigationActions } from 'react-navigation';
import Modal from 'react-native-modal';
import { MEMBERS, RCS_PROVIDERS, RCS2_PROCEDURES_LIST, RCS_SPECIALTIES, RCS2_DOCTOR_BY_SPECS, RCS2_SUBMIT, RCS2_SENDTOMAIL } from '../util/api.js'; 

const ACCESS_TOKEN = 'access_token';
const MEMB_ACCOUNTNO = 'memb_accountno';
const MEMB_EMAIL = 'memb_email';
const MEMBER_ID = 'member_id';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();

const ExpiredSession = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'OnBoardingPage' })],
});

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [NavigationActions.navigate({ routeName: 'ERCS2SuccessPage' })],
});

const Rcs2AutoApproved = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [NavigationActions.navigate({ routeName: 'ERCS2AutoApproved' })],
});


export default class ERCS2Request extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    global.rcs2Num = '';
    this.state = {
      isLoading: false,
      MembPickerValueHolder: '',
      member: '',
      facility: '',
      illness: '',
      diagnosis: '',
      Rcsmemb: [],
      selectedItems: [],
      selectedObject: [],
      multipleFile: [],
      search: '',
      searchIllness: '',
      found: 0,
      foundillness: 0,
      dataSource: [],
      dataSourceIllness: [],
      dataSourceIllnessSpec: [],
      providercode: '',
      DoctorSpeciallty: '',
      RCSdoctorspecialty: [],
      proceduresData: [],
      newListofItems: [],
      confirmSpec: true,
      membbenefit: '',
      visibleModal: null,
    };
    this.arrayholder = [];
    this.arrayholderIllness = [];
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  onSelectedItemObjectsChange = selectedObject => {
    this.setState({ selectedObject });

    var newList = [];
    for (var i = 0; i < selectedObject.length; i++) {
      newList.push({
        procedure_id: selectedObject[i].procedure_id,
        procedure_rate: selectedObject[i].procedure_rate,
        category_name: selectedObject[i].category_name,
        category_id: selectedObject[i].category_id,
      });
    }
    this.setState({ newListofItems: newList });
  };

  onSelectedItemObjectsChange = selectedObject => {
    this.setState({ selectedObject });

    var newList = [];
    for (var i = 0; i < selectedObject.length; i++) {
      newList.push({
        procedure_id: selectedObject[i].procedure_id,
        procedure_rate: selectedObject[i].procedure_rate,
        category_name: selectedObject[i].category_name,
        category_id: selectedObject[i].category_id,
      });
    }
    this.setState({ newListofItems: newList });
  };

  ShowAlert = () => {
    Alert.alert(
      'Oops!',
      'The Member does not have OPD Benefits.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  onLogout() {
    this.setState({
      isLoading: false,
    });
    this.deleteToken();
  }

  async deleteToken() {
    try {
      console.log('test')
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await AsyncStorage.removeItem(MEMBER_ID);
      await AsyncStorage.removeItem(MEMB_ACCOUNTNO);
      await AsyncStorage.removeItem(MEMB_EMAIL);
      this.props.navigation.dispatch(ExpiredSession);
    } catch {
      console.log('Something went wrong');
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
    this.setState({
      isLoading: true,
    });
    fetch(
      MEMBERS,
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
          console.log('test', responseJson)
          if (responseJson == 'Invalid Access Token') {
            this.onLogout();
            return Alert.alert('Oops', 'Session Expired')
          }
          else {
            this.setState({
              Rcsmemb: responseJson.data,
            });
            fetch(
              RCS_PROVIDERS,
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
                  this.setState({
                    dataSource: provider.data,
                  });
                  this.arrayholder = provider.data;
                });
              })
              .catch(error => {
                alert('Error!' + error);
              });

            //GET PROCEDURES
            fetch(
              RCS2_PROCEDURES_LIST,
              {
                method: 'GET',
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              },
            ).then(response => {
              response
                .json()
                .then(data => {
                  if (data.error_message === null) {
                    this.setState({
                      isLoading: false,
                      proceduresData: [
                        {
                          procedure_name: 'Procedures',
                          procedure_id: 0,
                          children: data.data,
                        },
                      ],
                    });
                  } else {
                    return Alert.alert('Oops','Unable to generate the procedures!');
                  }
                })
                .catch(error => {
                  return Alert.alert('Oops', + error);
                });
            });

          }
        });
      })
      .catch(error => {
        return Alert.alert('Oops', + error);
      });
    //GET PROCEDURES

    // fetch(
    //   'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/illness?gender=',
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: 'Bearer ' + token,
    //     },
    //     params: {
    //       gender: '',
    //     },
    //   },
    // )
    //   .then(response => {
    //     response.json().then(illness => {
    //       this.setState({
    //         dataSourceIllness: illness.data,
    //         isLoading: false,
    //       });
    //       this.arrayholderIllness = illness.data;
    //     });
    //   })
    //   .catch(error => {
    //     alert('Error!' + error);
    //   });
  }

  async _IllnessSpeciallty() {
    this.setState({ isLoading: true });
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    fetch(
      RCS_SPECIALTIES,
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
          console.log('illness', illnessSpec);
          this.setState({
            dataSourceIllnessSpec: illnessSpec.data[0],
          });
          // dataSourceIllnessSpec = illnessSpec.data[0];

          // this.DoctorScpec = this.DoctorScpec.bind(this);
          this.DoctorScpec();
        });
      })
      .catch(error => {
        return Alert.alert('Oops', + error);
      });
  }

  async DoctorScpec() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let specname = await this.state.dataSourceIllnessSpec.specialty_name;
    try {
      fetch(
        RCS2_DOCTOR_BY_SPECS,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            Hospital: this.state.providercode,
            // 'Specialty': specname
          },
          params: {
            name: '',
          },
        },
      )
        .then(response => {
          response.json().then(doctorspec => {
            if (doctorspec.data !== null) {
              this.setState({
                RCSdoctorspecialty: doctorspec.data,
                isLoading: false,
                confirmSpec: false,
              });
              // RCSdoctorspecialty = doctorspec.data;
            } else {
              this.setState({
                RCSdoctorspecialty: [],
                isLoading: false,
              });
              return Alert.alert('Oops','No Doctors Found!');
            }
          });
        })
        .catch(error => {
          return Alert.alert('Oops', + error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.provider_name
        ? item.provider_name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
      searchTextChanged: true,
      providercode: '',
      found: 0,
    });
  }

  SearchIllnesFilterFunction(text) {
    const newDataillness = this.arrayholderIllness.filter(function (item) {
      const itemDataillness = item.illness
        ? item.illness.toUpperCase()
        : ''.toUpperCase();
      const textDataillness = text.toUpperCase();
      return itemDataillness.indexOf(textDataillness) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSourceIllness: newDataillness,
      searchIllness: text,
      searchTextChanged: true,
      foundillness: 0,
    });
  }

  updateMembPicked = MembPicked => {
    console.log('Memb', MembPicked);
    this.setState({
      membbenefit: MembPicked.op_benefit,
      visibleModal: null,
      MembPickerValueHolder: MembPicked.fullname,
      MembPickerValueHolderAcct: MembPicked.acct,
      docspec: '',
      searchIllness: '',
      search: '',
      confirm: true,
    });
    console.log('opben', MembPicked.op_benefit);
    if (MembPicked.op_benefit === false) {
      this.ShowAlert();
    }
    this._renderMembersModal();
  };

  _renderMembersModal = () => {
    return (
      <View style={styles.modalContainerStyleMember}>
        <View style={{ backgroundColor: 'white', alignItems: 'flex-end' }}>
          <Button
            rounded
            transparent
            onPress={() => {
              this.setState({ visibleModal: false });
            }}>
            <Icon type="Ionicons" name="md-close" style={{ color: '#c4c4c4' }} />
          </Button>
        </View>
        <ScrollView>
          {this.state.Rcsmemb.map((item, key) => (
            <ListItem key={key}>
              <TouchableOpacity onPress={() => this.updateMembPicked(item)}>
                <View>
                  <Text
                    style={{
                      color: '#e74c3c',
                      fontSize: 14,
                      fontWeight: 'bold',
                      alignSelf: 'flex-start',
                    }}>
                    {item.fullname}
                  </Text>
                </View>
              </TouchableOpacity>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    );
  };

  provideronpress = provider => () => {
    //Item sparator view
    this.setState({
      search: provider.provider_name,
      found: 1,
      providercode: provider.provider_code,
      isLoading: true,
    });
    return this.DoctorScpec();
  };

  illnessonpress = location1 => () => {
    //Item sparator view
    return (
      this._IllnessSpeciallty(),
      this.setState({ searchIllness: location1.illness, foundillness: 1 })
    );
  };

  async selectMultipleFile() {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      //Validation for more than 3 file was selected
      if (results.length > 5) {
        return Alert.alert('Oops','Cannot upload more than 5 file!');
      }
      //Validation for total allow MB
      for (const res of results) {
        //Printing the log realted to the file
        console.log('File Size : ' + res.size);
      }

      var found = results.find(function (result) {
        return result.size > 4000000;
      });

      //console.log('yey', found);

      if (found === undefined) {
        console.log(results);
        this.setState({ multipleFile: results });
      } else {
        return Alert.alert('Oops','Cannot upload file(s) larger than 4 MB');
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        return Alert.alert('Oops','Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  removeFile(item) {
    const newFile = this.state.multipleFile;
    newFile.splice(item, 1);
    this.setState({ multipleFile: newFile });
  }

  onConfirmProcedure(item) {
    console.log('test', item);

    var newList = [];
    for (var i = 0; i < item.length; i++) {
      newList.push({
        procedure_id: item[i].procedure_id,
        procedure_rate: item[i].procedure_rate,
        category_name: item[i].category_name,
        category_id: item[i].category_id,
      });
    }
    this.setState({ newListofItems: newList });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { dataSource, dataSourceIllness, proceduresData } = this.state;
    const { memberPickedStyle } = styles;
    return (
      <Container>
        <ScrollView>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <View>
            <View style={styles.headerStyle}>
              <Text style={styles.subHeader}>
                Kindly provide all necessary information needed to request for
                Referral Control Sheet 2 (RCS 2).
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.container}>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
              {/* <Text style={styles.formLabel}>Choose member</Text> */}
              <Button
                iconRight
                onPress={() => {
                  this.setState({ visibleModal: 1 });
                }}
                style={{
                  marginVertical: 10,
                  backgroundColor: '#e74c3c',
                  elevation: 0,
                  shadowOpacity: 0,
                }}>
                <Text style={{ textTransform: 'capitalize', color: '#fff' }}>
                  Choose member
                </Text>
                <Icon
                  type="Ionicons"
                  name="md-arrow-dropdown"
                  style={{ color: '#2d2d2d', fontSize: 18 }}
                />
              </Button>
              <Text style={memberPickedStyle}>
                {this.state.membbenefit === true
                  ? this.state.MembPickerValueHolder
                  : ''}
              </Text>
            </View>
            <View style={styles.formStyle}>
              <Text style={styles.formLabel}>Choose hospital/facility</Text>
              <SearchBar
                round
                lightTheme
                searchIcon={{ size: 18, color: '#cacaca' }}
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
                inputStyle={{ justifyContent: 'center', fontSize: 14 }}
                onChangeText={text => this.SearchFilterFunction(text)}
                onClear={() => this.setState({ searchData: [], destination: '', confirmSpec: true, DoctorSpeciallty: '' })}
                placeholderTextColor="#cacaca"
                placeholder="Hospital/provider's name..."
                value={this.state.search}
              />
              {dataSource.length > 0 &&
                this.state.searchTextChanged &&
                this.state.search !== '' &&
                this.state.found === 0 ? (
                  <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => (
                      <View style={{ backgroundColor: '#fff' }}>
                        <ListItem>
                          <TouchableOpacity onPress={this.provideronpress(item)}>
                            <Text
                              style={{
                                alignSelf: 'flex-start',
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#e74c3c',
                              }}>
                              {item.provider_name}
                            </Text>
                            <Text
                              style={{
                                alignSelf: 'flex-start',
                                fontSize: 10,
                                color: '#c4c4c4',
                              }}>
                              {item.street},{item.subd_brgy}, {item.city}
                            </Text>
                            <Text
                              style={{
                                alignSelf: 'flex-start',
                                fontSize: 12,
                                color: '#c4c4c4',
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
            <View style={styles.formStyle}>
              <SectionedMultiSelect
                backgroundColor="#f5f5f5"
                color="#c4c4c4"
                items={proceduresData}
                uniqueKey="procedure_id"
                subKey="children"
                displayKey="procedure_name"
                selectText="Select Procedure"
                searchPlaceholderText="Choose Procedures"
                showDropDowns={false}
                showRemoveAll={true}
                readOnlyHeadings={true}
                onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
                onConfirm={() =>
                  this.onConfirmProcedure(this.state.selectedObject)
                }
              />
            </View>
            <View style={styles.formStyle}>
              <Text style={styles.formLabel}>Diagnosis</Text>
              <Textarea
                rowSpan={3}
                bordered
                placeholder=""
                autoCapitalize={'characters'}
                value={this.state.diagnosis}
                onChangeText={diagnosis => this.setState({ diagnosis })}
              />
            </View>
            <View style={styles.formStyle}>
              <Text style={styles.formLabel}>Requesting physician</Text>
              <Button
                disabled={this.state.confirmSpec}
                iconRight
                onPress={() => {
                  this.setState({ visibleModal: 2 });
                }}
                style={{
                  marginVertical: 10,
                  backgroundColor: this.state.confirmSpec
                    ? '#f5f5f5'
                    : '#e74c3c',
                  elevation: 0,
                  shadowOpacity: 0,
                }}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: this.state.confirmSpec ? '#cacaca' : '#fff',
                  }}>
                  Choose Doctor
                </Text>
                <Icon
                  type="Ionicons"
                  name="md-arrow-dropdown"
                  style={{ color: '#2d2d2d', fontSize: 18 }}
                />
              </Button>
              <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                <Text
                  style={{
                    alignSelf: 'flex-start',
                    color: '#e74c3c',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  {this.state.DoctorSpeciallty === ''
                    ? ''
                    : 'DR. ' +
                    this.state.DoctorSpeciallty.firstname +
                    ' ' +
                    this.state.DoctorSpeciallty.lastname}
                </Text>
                <Text style={styles.doctorSpecialtyTextStyle}>
                  {this.state.DoctorSpeciallty === ''
                    ? ''
                    : 'Phone no: ' + this.state.DoctorSpeciallty.phone}
                </Text>
                <Text style={styles.doctorSpecialtyTextStyle}>
                  {this.state.DoctorSpeciallty === ''
                    ? ''
                    : 'Room No: ' + this.state.DoctorSpeciallty.room}
                </Text>
                <Text style={styles.doctorSpecialtyTextStyle}>
                  {this.state.DoctorSpeciallty === ''
                    ? ''
                    : 'Schedule: ' + this.state.DoctorSpeciallty.schedule}
                </Text>
              </View>
              <Modal
                isVisible={this.state.visibleModal === 2}
                animationInTiming={700}
                animationOutTiming={700}>
                <View style={styles.modalContainerStyle}>
                  <View
                    style={{ backgroundColor: 'white', alignItems: 'flex-end' }}>
                    <Button
                      rounded
                      transparent
                      onPress={() => {
                        this.setState({ visibleModal: null });
                      }}>
                      <Icon
                        type="Ionicons"
                        name="md-close"
                        style={{ color: '#2d2d2d' }}
                      />
                    </Button>
                  </View>
                  <ScrollView>
                    {this.state.RCSdoctorspecialty.map((item, key) => (
                      <ListItem key={key}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              DoctorSpeciallty: item,
                              visibleModal: false,
                            });
                          }}>
                          <View>
                            <Text
                              style={{
                                color: '#2d2d2d',
                                fontSize: 14,
                                color: '#e74c3c',
                                fontWeight: 'bold',
                                alignSelf: 'flex-start',
                              }}>
                              DR. {item.firstname + ' ' + item.lastname}
                            </Text>
                            <Text style={styles.doctorSpecialtyModalTextStyle}>
                              {item.major_specialty}
                            </Text>
                            <Text style={styles.doctorSpecialtyModalTextStyle}>
                              Room No: {item.room}
                            </Text>
                            <Text style={styles.doctorSpecialtyModalTextStyle}>
                              Schedule: {item.schedule}
                            </Text>
                            <Text style={styles.doctorSpecialtyModalTextStyle}>
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
            <View style={styles.formStyle}>
              <Card style={{ borderRadius: 10, justifyContent: 'center' }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this.selectMultipleFile.bind(this)}>
                  <CardItem style={{ borderRadius: 10 }}>
                    <Body style={{ alignContent: 'center' }}>
                      <Icon
                        type="Ionicons"
                        name="md-attach"
                        style={{ color: '#2d2d2d', alignSelf: 'center' }}
                      />
                      <Text
                        style={{
                          color: '#2d2d2d',
                          fontSize: 14,
                          alignSelf: 'center',
                        }}>
                        Upload file/s (not larger than 4MB each)
                      </Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
                <ScrollView style={{ flex: 1 }}>
                  {/*Showing the data of selected Multiple files*/}
                  {this.state.multipleFile.map((item, key) => (
                    <View
                      key={key}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      {/* <Text style={styles.textStyle}>
                        File Name: {item.name ? item.name : ''}
                      </Text> */}
                      <Thumbnail
                        square
                        source={{ uri: item.uri }}
                        style={styles.thumbnailStyle}
                      />
                      <TouchableOpacity
                        style={{ marginTop: 16, marginRight: 20 }}
                        onPress={() => this.removeFile(key)}>
                        <Icon
                          type="Ionicons"
                          name="md-close"
                          style={{ color: 'red' }}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </Card>
              <Modal
                isVisible={this.state.visibleModal === 1}
                animationInTiming={700}
                animationOutTiming={700}>
                {this._renderMembersModal()}
              </Modal>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Button
                danger
                rounded
                style={styles.buttonStyle}
                onPress={() => {
                  this.handleSubmit();
                }}>
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
        {this.state.isLoading && (
          <View style={styles.spinnerStyle}>
            <Spinner color={'#e74c3c'} size={60} type={'ThreeBounce'} />
          </View>
        )}
      </Container>
    );
  }

  handleSubmit = () => {
    console.log('dadad',this.state.newListofItems)
    if (this.state.newListofItems === null || this.state.newListofItems.length === 0 ) {
      return Alert.alert('Oops!','Please atleast one(1) procedure');
    }

    if (this.state.multipleFile === null) {
      return Alert.alert('Oops!','Please provide atleast one(1) document');
    }

    if (this.state.DoctorSpeciallty.doctor_code === null) {
      return Alert.alert('Oops!','Please choose a doctor');
    }

    // if (this.state.searchIllness === null || this.state.searchIllness === '') {
    //   return alert('Please provide complaint');
    // }
    this.setState({ isLoading: true });
    this._InsertRequest();
  };

  async _InsertRequest() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);

    let formdata = new FormData();

    formdata.append(
      'ercs_details',
      JSON.stringify({
        acctno: this.state.MembPickerValueHolderAcct,
        ercs1no: 'WITHOUT eRCS1',
        doctor_code: this.state.DoctorSpeciallty.doctor_code,
        hospital_code: this.state.providercode,
        posted_by: 'MOBILE',
        diagnosis: this.state.diagnosis,
      }),
    );

    const jsonproc = this.state.newListofItems;

    formdata.append('ercs_procedures', JSON.stringify(jsonproc));

    this.state.multipleFile.forEach((item, i) => {
      var num = i + 1;
      formdata.append('prescription' + num, {
        uri: item.uri,
        type: item.type,
        name: item.name,
      });
    });

    try {
      let resp = await fetch(
        RCS2_SUBMIT,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          },
          body: formdata,
        },
      );
      let respJson = await resp.json();
      // console.log('boy',this.state.MembPickerValueHolderAcct)

      if (respJson == 'Invalid Access Token') {
        this.onLogout();
        return Alert.alert('Oops','Session Expired')
      }
      else {

        if (respJson.is_success === true) {
          let tmprcs2Num = respJson.data.ercsno;
          let tmprcs2tag = respJson.data.approved

          global.rcs2tag = tmprcs2tag;
          global.rcs2Num = tmprcs2Num;
          global.acctNum = this.state.MembPickerValueHolderAcct;
          let mid = await AsyncStorage.getItem(MEMBER_ID);
          let email = await AsyncStorage.getItem(MEMB_EMAIL);
          if (global.rcs2tag === true) {
            fetch(
              RCS2_SENDTOMAIL +
              global.rcs2Num,
              {
                method: 'GET',
                headers: {
                  Authorization: 'Bearer ' + token,
                  EmailAddress: email,
                  AccountNo: global.acctNum,
                  AccountID: mid,
                  //'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
              .then(response => {
                console.log('data',response)
                response.json().then(data => {
                  console.log('data1',data)
                  if (data.is_success === true) {
                    this.setState({ isLoading: false });
                    this.props.navigation.dispatch(Rcs2AutoApproved);
                  } else {
                    alert(data.error_message);
                  }
                });
              })

          }
          else {
            this.setState({ isLoading: false });
            this.props.navigation.dispatch(resetAction);
          }

        } else {
          alert(respJson.error_message);
          this.setState({ isLoading: false });
        }
      }
    } catch (error) {
      return Alert.alert('Oops',error);
    }
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headerStyle: {
    height: 90,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#e74c3c',
  },
  subHeader: {
    color: '#6d6e72',
    fontSize: 14,
  },
  formInput: {
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    // marginHorizontal: 20,
  },
  formLabel: {
    marginBottom: 5,
    color: '#6d6e72',
  },
  formStyle: {
    marginTop: 20,
    marginBottom: 10,
  },
  removeButton: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
  },
  thumbnailStyle: {
    marginLeft: 20,
    marginVertical: 3,
    borderRadius: 4,
  },
  spinnerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#ffff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  modalContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    // marginLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  modalContainerStyleMember: {
    flexDirection: 'column',
    alignContent: 'flex-start',
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  doctorSpecialtyModalTextStyle: {
    color: '#cacaca',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  doctorSpecialtyTextStyle: {
    color: '#cacaca',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
  },
  memberPickedStyle: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});
