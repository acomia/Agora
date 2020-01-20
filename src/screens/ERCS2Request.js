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
  Picker,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  CardItem,
  Input,
  Title,
  Card,
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
  Item,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { SearchBar } from 'react-native-elements'
import Spinner from 'react-native-spinkit'
import DocumentPicker from 'react-native-document-picker';
import { StackActions, NavigationActions } from 'react-navigation';

const ACCESS_TOKEN = 'access_token';
const MEMB_ACCOUNTNO = 'memb_accountno';

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [NavigationActions.navigate({ routeName: 'ERCS2SuccessPage' })],
});


const items = [
  // this is the parent or 'item'
  {
    name: 'Doctors',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Apple',
        id: 10,
      },
      {
        name: 'Strawberry',
        id: 17,
      },
      {
        name: 'Pineapple',
        id: 13,
      },
      {
        name: 'Banana',
        id: 14,
      },
      {
        name: 'Watermelon',
        id: 15,
      },
      {
        name: 'Kiwi fruit',
        id: 16,
      },
    ],
  },
];

export default class ERCS1Request extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      MembPickerValueHolder: "",
      member: "",
      facility: "",
      illness: "",
      Rcsmemb: [],
      selectedItems: [],
      fileOne: '',
      fileTwo: '',
      fileThree: '',
      search: '',
      searchIllness: '',
      found: 0,
      foundillness: 0,
      dataSource: [],
      dataSourceIllness: [],
      dataSourceIllnessSpec: [],
      providercode: '',
      DoctorSpeciallty: '',
      RCSdoctorspecialty: []
    };
    this.arrayholder = [];
    this.arrayholderIllness = [];
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    console.log(selectedItems)
  };

  async componentDidMount() {
    this._isMounted = true;
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacct = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
    this.setState({
      isLoading: true
    });
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/member/accounts', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'AccountNo': membacct,
      }
    })
      .then((response) => {
        response.json().then((responseJson) => {
          { console.log('RCSconsultype', responseJson.data) }
          this.setState({
            Rcsmemb: responseJson.data
          })

        })
      })
      .catch((error) => {
        alert('Error!' + error)
      })

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
          })
          this.arrayholder = provider.data
        })
      })
      .catch((error) => {
        alert('Error!' + error)
      })


    //GET PROCEDURES

    //GET PROCEDURES

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
          { console.log('illness', illness.data) }
          this.setState({
            dataSourceIllness: illness.data,
            isLoading: false
          })
          this.arrayholderIllness = illness.data
        })
      })
      .catch((error) => {
        alert('Error!' + error)
      })

  }

  async _IllnessSpeciallty() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
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

  async DoctorScpec() {

    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let specname = await this.state.dataSourceIllnessSpec.specialty_name

    console.log(token);
    console.log(this.state.providercode);
    console.log('specname', specname);

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
        found: 1,
        providercode: provider.provider_code
      })
    );
  };

  illnessonpress = location1 => () => {
    //Item sparator view
    // this.state.search = this.location.provider_name;
    return (
      // this.postRCS1(),
      this._IllnessSpeciallty(),

      this.setState({ searchIllness: location1.illness, foundillness: 1 })
    );
  };



  async selectFileOne() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],

      });


      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);

      var tempfileOne = {
        uri: res.uri,
        type: res.type,
        name: res.name
      }
      this.setState({ fileOne: tempfileOne });

    } catch (err) {

      if (DocumentPicker.isCancel(err)) {

        // alert('Canceled from single doc picker');
      } else {

        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  async selectFileTwo() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);

      var tempfileTwo = {
        uri: res.uri,
        type: res.type,
        name: res.name
      }
      this.setState({ fileTwo: tempfileTwo });

    } catch (err) {

      if (DocumentPicker.isCancel(err)) {

        // alert('Canceled from single doc picker');
      } else {

        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  async selectFileThree() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],


      });

      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);

      var tempfilethree = {
        uri: res.uri,
        type: res.type,
        name: res.name
      }
      this.setState({ fileThree: tempfilethree });

    } catch (err) {

      if (DocumentPicker.isCancel(err)) {

        // alert('Canceled from single doc picker');
      } else {

        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { dataSource, dataSourceIllness } = this.state
    return (
      <Container style={{ display: 'flex' }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTitle}>Request for e-RCS 2</Text>
            <Text style={styles.subHeader}>
              Kindly provide all necessary information needed to request for
              Referral Control Sheet 2 (RCS 2).
            </Text>
          </View>
        </View>
        <ScrollView style={styles.container}>

          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose Member</Text>
            <Picker mode="dropdown"
              style={{ width: undefined }}
              placeholder="Select Member"
              iosIcon={<Icon name="arrow-down" />}
              placeholderStyle={{ color: '#bdc3c7' }}
              placeholderIconColor="#007aff"
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                justifyContent: 'center',
              }}
              selectedValue={this.state.MembPickerValueHolder}
              onValueChange={(modeValue, itemIndex) => this.setState({ MembPickerValueHolder: modeValue })}>
              {this.state.Rcsmemb.map((item, key) => (
                <Picker.Item label={item.fullname} value={item.acct} key={key} />)
              )}
            </Picker>
          </View>

          {/* <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose hospital/facility</Text>
            <Input style={styles.formInput} />
          </View> */}
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose hospital/facility</Text>
            <SearchBar
              round
              lightTheme
              searchIcon={{ size: 18 }}
              inputContainerStyle={{ backgroundColor: 'white', height: 34, bottom: 6 }}
              inputStyle={{ fontSize: 12 }}
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={() => this.setState({ searchData: [], destination: '' })}
              placeholder="Search Hospital/Provider..."
              value={this.state.search}
            />
            {dataSource.length > 0 && this.state.searchTextChanged && this.state.search !== ''
              && this.state.found === 0 ?
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                renderItem={({ item }) => (
                  <View style={{ backgroundColor: '#fff', marginLeft: 14 }}>
                    <ListItem>
                      <TouchableOpacity onPress={this.provideronpress(item)}>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{item.provider_name}</Text>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 10 }}>{item.street},
                   {item.subd_brgy}, {item.city}</Text>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 12 }}>Schedule: {item.clinic_hrs}</Text>
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
              inputContainerStyle={{ backgroundColor: 'white', height: 34, bottom: 6 }}
              inputStyle={{ fontSize: 12 }}
              onChangeText={text => this.SearchIllnesFilterFunction(text)}
              onClear={() => this.setState({ searchData1: [], destination1: '' })}
              placeholder="Chief Complaint..."
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
                        <Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{item.illness}</Text>

                        {/* <Text style={{ alignSelf: 'flex-start', fontSize: 12 }}>Schedule: {item.clinic_hrs}</Text> */}
                      </TouchableOpacity>
                    </ListItem>
                  </View>
                )}
                keyExtractor={item => item.provider_name}
              /> : null}
          </View>
          <View style={styles.formStyle}>
            {/* <Text style={styles.formLabel}>Laboratory procedure/s</Text> */}
            <SectionedMultiSelect
              style={styles.formLabel}
              items={items}
              uniqueKey="id"
              subKey="children"
              selectText="Select Procedure"
              searchPlaceholderText="Choose Procedures"
              showDropDowns={false}
              showRemoveAll={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
            />
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
                <Picker.Item label={item.firstname + ' ' + item.lastname} value={item} key={key} />)
              )}
            </Picker>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <Card style={{ borderRadius: 10, justifyContent: "center" }}>

              {/* single file selection */}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.selectFileOne.bind(this)}>
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
                      Upload file/s
                  </Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
              <View>
                <Text style={styles.textStyle}>
                  File Name:{' '}
                  {this.state.fileOne.name ? this.state.fileOne.name : ''}
                </Text>
                <Button
                  success
                  style={styles.removeButton}
                // onPress={() =>
                //   this.props.navigation.navigate('ERCS2LandingPage')
                // }
                >
                  <Title>Remove</Title>
                </Button>
              </View>

              {/* single file selection */}

              {/* single file selection */}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.selectFileTwo.bind(this)}>
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
                      Upload file/s
                  </Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
              <View>
                <Text style={styles.textStyle}>
                  File Name:{' '}
                  {this.state.fileTwo.name ? this.state.fileTwo.name : ''}
                </Text>
                <Button
                  success
                  style={styles.removeButton}
                // onPress={() =>
                //   this.props.navigation.navigate('ERCS2LandingPage')
                // }
                >
                  <Title>Remove</Title>
                </Button>
              </View>

              {/* single file selection */}


              {/* single file selection */}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.selectFileThree.bind(this)}>
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
                      Upload file/s
                  </Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
              <View>
                <Text style={styles.textStyle}>
                  File Name:{' '}
                  {this.state.fileThree.name ? this.state.fileThree.name : ''}
                </Text>
                <Button
                  success
                  style={styles.removeButton}
                // onPress={() =>
                //   this.props.navigation.navigate('ERCS2LandingPage')
                // }
                >
                  <Title>Remove</Title>
                </Button>
              </View>

              {/* single file selection */}


            </Card>
          </View>



          <View style={styles.viewButton}>
            <Button
              success
              style={styles.buttonStyle}
              onPress={() => {
                this._InsertRequest();
              }}>
              <Title>Submit</Title>
            </Button>
          </View>
        </ScrollView>
      </Container>
    );
  }

  async _InsertRequest() {

    let token = await AsyncStorage.getItem(ACCESS_TOKEN);

    let formdata = new FormData();

    formdata.append('prescription1', this.state.fileOne);
    formdata.append('prescription2', this.state.fileTwo);
    formdata.append('prescription3', this.state.fileThree);

    console.log(formdata)

    formdata.append(
      'ercs_procedures',
      JSON.stringify({
        acctno: this.state.email,
        ercs1no: 'WITHOUT eRCS1',
        doctor_code: this.state.DoctorSpeciallty.doctor_code,
        hospital_code: this.state.providercode,
        posted_by: 'MOBILE',
      }),
    );

    try {
      let resp = await fetch(
        'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs2/submit',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          },
          body: formdata,
        },
      );
      let respJson = await resp.json();

      if (respJson.is_success === true) {

        this.props.navigation.dispatch(resetAction);
      }
      else {
        alert(respJson.error_message)
      }

      console.log(respJson);
    }
    catch (error) {
      console.log(error);
    }
  }



}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerStyle: {
    height: 150,
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
  },
  formInput: {
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  formLabel: {
    marginHorizontal: 20,
    color: '#6d6e72',
  },
  formStyle: {
    marginVertical: 10,
  },
  viewButton: {
    margin: 20,
  },
  removeButton: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'center'

  },
  buttonStyle: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    justifyContent: 'center',
  },
});
