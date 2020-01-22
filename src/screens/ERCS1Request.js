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
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

import { SearchBar } from 'react-native-elements'
import SearchableDropdown from 'react-native-searchable-dropdown';
import Spinner from 'react-native-spinkit'


const ACCESS_TOKEN = 'access_token';
const MEMB_ACCOUNTNO = 'memb_accountno';
const MEMB_EMAIL = 'memb_email';
const MEMBER_ID = 'member_id';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth()
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight()
const STATUSBAR_HEIGHT = require('react-native-extra-dimensions-android').getStatusBarHeight()

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  //key: 'DashboardPage',
  // params: {
  //   rcsNo: this.state.rcsNo,
  //   acctNo: this.state.MembPickerValueHolder},

  actions: [NavigationActions.navigate({ routeName: 'ERCS1SuccessPage' })],
});
// const resetAction = NavigationActions.navigate({
//   routeName: 'ERCS1SuccessPage',
//   params: { rcsNo:  global.rcsNum },
//   key: 'DashboardPage',
//   //action: NavigationActions.navigate({ routeName: 'ERCS1SuccessPage' }),
// });

export default class ERCS1Request extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props)
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
    };
    this.arrayholder = [];
    this.arrayholderIllness = [];
  }

  async componentDidMount() {
    this._isMounted = true;
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);

    // this.setState({
    //   isLoading: true
    // });
    // getting the principal and dependent of the acct
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/member/accounts', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'AccountNo': membacct,
      }
    })
      .then((response) => {
        response.json().then((responseJson) => {
          { console.log('member', responseJson.data) }
          this.setState({
            Rcsmemb: responseJson.data
          })
          Rcsmemb = responseJson.data
          this.state.acctno = this.state.Rcsmemb[0].acct
          console.log('rcsmembacctno1', this.state.Rcsmemb[0])
          console.log('rcsmembacctno', this.state.acctno)
          // this.arrayholder = responseJson.data
        })
      })
      .catch((error) => {
        alert('Error!' + error)
      })
    // available consultype 
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/consulttype', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
      .then((response) => {
        response.json().then((consulttype) => {
          { console.log('RCSconsultype', consulttype.data) }
          this.setState({
            RCSconsultype: consulttype.data,

          })

        })
      })
      .catch((error) => {
        alert('Error!' + error)
      })
    // gathering a hospital  
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/providers/find?name=&location=', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'AccountNo': membacct,
      },
      params: {
        'name': '',
        'location': '',
      },
    })
      .then((response) => {
        response.json().then((provider) => {
          console.log('providerko', provider)
          this.setState({
            dataSource: provider.data,
            isLoading: false,
          })
          this.arrayholder = provider.data
        })
      })
      .catch((error) => {
        alert('Error!' + error)
      })
    // gathering the illness 
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/illness?gender=', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      params: {
        'gender': '',
      },
    })
      .then((response) => {
        response.json().then((illness) => {
          this.setState({
            dataSourceIllness: illness.data,

          })
          dataSourceIllnessSpec = illness.data
          this.arrayholderIllness = illness.data
        })
      })
      .catch((error) => {
        alert('Error!' + error)
      })
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  async _IllnessSpeciallty() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    // gathering the illness specialty
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/specialty', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'illness': this.state.searchIllness
      }
    })
      .then((response) => {
        response.json().then((illnessSpec) => {
          console.log('illness', illnessSpec)
          console.log('basicillness', this.state.searchIllness)
          this.setState({
            dataSourceIllnessSpec: illnessSpec.data[0],
          });
          dataSourceIllnessSpec = illnessSpec.data[0]

          console.log('illness2', dataSourceIllnessSpec)

          this.DoctorScpec = this.DoctorScpec.bind(this)
          this.DoctorScpec();
        })
      })
      .catch((error) => {
        alert('Error!' + error)
      })
  }

  // DoctorScpec(){
  //   return(
  //   console.log('illness2',dataSourceIllnessSpec)
  //   );
  // }

  async DoctorScpec() {

    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let specname = await this.state.dataSourceIllnessSpec.specialty_name
    console.log(token);
    console.log(this.state.providercode);
    console.log('specname', specname);
    // gathering of the doctors base on the location and illness specialty
    try {
      fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/doctors?name=', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'HospitalCode': this.state.providercode,
          'Specialty': specname
        },
        params: {
          'name': '',
        },
      })
        .then((response) => {
          console.log('hero', this.state.dataSourceIllnessSpec)
          console.log('hero22', response)
          response.json().then((doctorspec) => {
            console.log('hero23', doctorspec)
            if (doctorspec.data != null) {
              this.setState({
                RCSdoctorspecialty: doctorspec.data,
              })
              RCSdoctorspecialty = doctorspec.data
              console.log('value', RCSdoctorspecialty)
            }
            else {
              this.setState({
                RCSdoctorspecialty: []
              })
              alert("No Doctors Found!")
            }

          })
        })
        .catch((error) => {
          alert('Error!' + error)
        })
    }
    catch (error) {
      console.log(error);
    }
  }


  async _postUser() {
    // this.setState({
    //   isLoading: true,
    // });
    console.log('acctno', this.state.acctno)
    console.log('acctnumberko', this.state.acctno)
    console.log('doctors name2', this.state.DoctorSpeciallty.firstname + '' + this.state.DoctorSpeciallty.lastname);
    console.log('doctors code', this.state.DoctorSpeciallty.doctor_code);
    console.log('doc phone', this.state.DoctorSpeciallty.phone);
    console.log('illness', dataSourceIllnessSpec);
    console.log('hospitalname', this.state.search)
    console.log('hospitalcode', this.state.providercode)
    console.log('clinichrs', this.state.sched)
    console.log('consultype', this.state.PickerValueHolder)

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
    let specname = await this.state.dataSourceIllnessSpec.specialty_name
    // submit to save record
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/submit', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        acctno: this.state.acctno,
        illness: specname,
        doctor_name: this.state.DoctorSpeciallty.firstname + ' ' + this.state.DoctorSpeciallty.lastname,
        doctor_code: this.state.DoctorSpeciallty.doctor_code,
        doctor_phone: this.state.DoctorSpeciallty.phone,
        hospital_name: this.state.search,
        hospital_code: this.state.providercode,
        hospital_schedule: this.state.sched,
        consult_type: this.state.PickerValueHolder
      }),
    })
      .then(response => {
        console.log('email', email)
        console.log('acctno', this.state.acctno)
        console.log('membid', mid)
        response.json().then(data => {
          console.log('ercsno', data)
          // this.setState({ rcsNo: data.data.ercsno });
          // rcsNo = data.data.ercsno;

          let rcs = data.data.ercsno
          console.log('rcsno', this.state.rcsNo);
          // send to email
          if (data.is_success === true) {
            fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs1/sendtoemail?no=' + rcs, {
              method: 'GET',
              params: {
                'no': rcs,
              },
              headers: {
                'Authorization': 'Bearer ' + token,
                'EmailAddress': email,
                'AccountNo': this.state.acctno,
                'AccountID': mid,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
              .then(response => {
                response.json().then(data => {
                  console.log('final', data)
                  if (data.is_success === true) {
                    global.rcsNum = rcs;
                    global.acctNum = this.state.acctno;
                    global.mid = mid
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
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.provider_name ? item.provider_name.toUpperCase() : ''.toUpperCase();
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
      found: 0
    });
  }

  SearchIllnesFilterFunction(text) {
    const newDataillness = this.arrayholderIllness.filter(function (item) {
      const itemDataillness = item.illness ? item.illness.toUpperCase() : ''.toUpperCase();
      const textDataillness = text.toUpperCase();
      return itemDataillness.indexOf(textDataillness) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSourceIllness: newDataillness,
      searchIllness: text,
      searchTextChanged: true,
      foundillness: 0
    });
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  provideronpress = provider => () => {
    //Item sparator view
    console.log('search', provider);
    // this.state.search = this.location.provider_name;

    console.log('found', this.state.found);
    console.log('search2', provider.provider_name);

    return (
      this.setState({
        search: provider.provider_name,
        sched: provider.clinic_hrs,
        found: 1,
        providercode: provider.provider_code
      })
    );
  };

  illnessonpress = location1 => () => {
    //Item sparator view
    // this.state.search = this.location.provider_name;
    return (
      this.postRCS1(),
      this._IllnessSpeciallty(),

      this.setState({ searchIllness: location1.illness, foundillness: 1 })
    );
  };

  postRCS1() {
    //Item sparator view
    // this.state.search = this.location.provider_name;
    return (
      console.log('Providercode', this.state.providercode)
    );
  };


  render() {
    // const { RCSprovider } = this.state;
    const { navigate } = this.props.navigation;
    const { spinnerStyle, spinnerTextStyle } = styles

    if (this.state.isLoading) {
      return (
        <View style={spinnerStyle}>
          <Spinner
            color={'green'}
            size={50}
            type={'ChasingDots'}
          />
          <Text style={spinnerTextStyle}>Fetching Provider data...</Text>
        </View>
      )
    }
    // { console.log('membko', this.state.RCSconsultype) }
    // { console.log('providerko', this.state.RCSprovider) }
    const { dataSource, dataSourceIllness } = this.state
    return (
      <Container>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={styles.headerStyle}>
          <Text style={styles.headerTitle}>
            Create your e-RCS1
          </Text>
          <Text style={styles.subHeader}>
            Kindly provide all necessary information to create your e-Referral
            Control Sheet 1 (e-RCS1) which you can use for your Consultation.
          </Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose member</Text>
            <Picker mode="dropdown"
              style={{ width: undefined }}
              iosIcon={<Icon name="arrow-down" />}
              placeholderStyle={{ color: '#bdc3c7' }}
              defaultValue={this.state.MembPickerValueHolder.acct}
              placeholderIconColor="#007aff"
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                justifyContent: 'center',
              }}
              // selectedValue={this.state.MembPickerValueHolder}
              // onValueChange={(modeValue, itemIndex) => {
              //   this.setState({ MembPickerValueHolder: modeValue })
              //     ; console.log('acctnumberko', modeValue);
              //     this.setState({
              //       MembPickerValueHolder: acctno
              //     })
              // }}>
              // {this.state.Rcsmemb.map((item, key) => (
              //   <Picker.Item label={item.fullname} value={item.acct} key={key} />)
              // )}
              selectedValue={this.state.MembPickerValueHolder}
              onValueChange={(modeValue, itemIndex) => {
                this.setState({ MembPickerValueHolder: modeValue })
                  ; console.log('pciker', modeValue)
                  this.setState
                  ({
                    acctno : modeValue
                  })
              }}>
              {this.state.Rcsmemb.map((item, key) => (
                <Picker.Item label={item.fullname} value={item.acct} key={key} />)
              )}
            </Picker>
          </View>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Type of consultation</Text>
            <Picker mode="dropdown"
              style={{ width: undefined }}
              iosIcon={<Icon name="arrow-down" />}
              placeholderStyle={{ color: '#bdc3c7' }}
              placeholderIconColor="#007aff"
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                justifyContent: 'center',
              }}
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(modeValue, itemIndex) => this.setState({ PickerValueHolder: modeValue })}>
              {this.state.RCSconsultype.map((item, key) => (
                <Picker.Item label={item.description} value={item.code} key={key} />)
              )}
            </Picker>
          </View>
          <View style={styles.formStyle}>

            <Text style={styles.formLabel}>Choose hospital/facility</Text>
            <SearchBar
              round
              lightTheme
              searchIcon={{ size: 15 }}
              containerStyle={{ width: SCREEN_WIDTH, height: 40, backgroundColor: 'transparent', }}
              inputContainerStyle={{ height: 34, bottom: 6, backgroundColor: 'transparent' }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={() => this.setState({ searchData: [], destination: '', searchIllness: '' })}
              placeholder="Search Hospital/Provider..."
              value={this.state.search}
            />
            {dataSource.length > 0 && this.state.searchTextChanged && this.state.search !== ''
              && this.state.found === 0 ?
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                renderItem={({ item }) => (
                  <View style={{ backgroundColor: '#ffffff', marginLeft: 14 }}>
                    <ListItem>
                      <TouchableOpacity onPress={this.provideronpress(item)}>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 20 }}>{item.provider_name}</Text>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 10 }}>{item.street},
                               {item.subd_brgy}, {item.city}</Text>
                        {/* <Text style={{ alignSelf: 'flex-start', fontSize: 12 }}>Schedule: {item.clinic_hrs}</Text> */}
                      </TouchableOpacity>
                    </ListItem>
                  </View>
                )}
                keyExtractor={item => item.provider_name}
              /> : null}

          </View>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Chief complaint</Text>
            <SearchBar
              round
              lightTheme
              searchIcon={{ size: 18 }}
              containerStyle={{ width: SCREEN_WIDTH, height: 40, backgroundColor: 'transparent', }}
              inputContainerStyle={{ height: 34, bottom: 6, backgroundColor: 'transparent' }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={text => this.SearchIllnesFilterFunction(text)}
              onClear={() => this.setState({ searchData1: [], destination1: '' })}
              placeholder="Search Illness..."
              value={this.state.searchIllness}
            />
            {dataSourceIllness.length > 0 && this.state.searchTextChanged && this.state.searchIllness !== ''
              && this.state.foundillness === 0 ?
              <FlatList
                data={this.state.dataSourceIllness}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                renderItem={({ item }) => (
                  <View style={{ backgroundColor: '#fff', marginLeft: 14 }}>
                    <ListItem>
                      <TouchableOpacity onPress={this.illnessonpress(item)}>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 20 }}>{item.illness}</Text>

                        {/* <Text style={{ alignSelf: 'flex-start', fontSize: 12 }}>Schedule: {item.clinic_hrs}</Text> */}
                      </TouchableOpacity>
                    </ListItem>
                  </View>
                )}
                keyExtractor={item => item.provider_name}
              /> : null}
          </View>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose doctor</Text>
            <Picker mode="dropdown"
              style={{ width: undefined }}
              iosIcon={<Icon name="arrow-down" />}
              placeholderStyle={{ color: '#bdc3c7' }}
              placeholderIconColor="#007aff"
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                justifyContent: 'center',
              }}
              selectedValue={this.state.DoctorSpeciallty}
              onValueChange={(modeValue, itemIndex) => {
                this.setState({ DoctorSpeciallty: modeValue })
                  ; console.log('pciker', modeValue)
              }}>
              {this.state.RCSdoctorspecialty.map((item, key) => (
                <Picker.Item style={{ width: 500, height: 300 }} label={item.firstname + ' ' + item.lastname + '\n' + item.room + '\n' + item.major_specialty} value={item} key={key} />)
              )}
            </Picker>
          </View>
          <View style={styles.viewButton}>
            {/* <Button success style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('ERCS1SuccessPage')}> */}
            <Button success style={styles.buttonStyle} onPress={() => this._postUser()}>
              <Title>Submit</Title>
            </Button>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  headerStyle: {
    height: 105,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#5fb650'
  },
  subHeader: {
    color: "#cacaca"
  },
  formInput: {
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  formLabel: {
    marginHorizontal: 20,
    color: '#6d6e72',
  },
  formStyle: {
    marginVertical: 1,
  },
  viewButton: {
    margin: 20
  },
  buttonStyle: {
    backgroundColor: "#5fb650",
    color: "#fff",
    justifyContent: "center"
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
  textStyle: {
    padding: 10,
  },
});
