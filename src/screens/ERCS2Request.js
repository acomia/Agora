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
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth()

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [NavigationActions.navigate({ routeName: 'ERCS2SuccessPage' })],
});


// const items = [
//   // this is the parent or 'item'
//   {
//     name: 'Procedures',
//     id: 0,
//     // these are the children or 'sub items'
//     children: [
//       {
//         name: 'Apple',
//         id: 10,
//       },
//       {
//         name: 'Strawberry',
//         id: 17,
//       },
//       {
//         name: 'Pineapple',
//         id: 13,
//       },
//       {
//         name: 'Banana',
//         id: 14,
//       },
//       {
//         name: 'Watermelon',
//         id: 15,
//       },
//       {
//         name: 'Kiwi fruit',
//         id: 16,
//       },
//     ],
//   },
// ];

export default class ERCS2Request extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    global.rcs2Num = '';
    this.state = {
      isLoading: false,
      MembPickerValueHolder: "",
      member: "",
      facility: "",
      illness: "",
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
      newListofItems: []
    };
    this.arrayholder = [];
    this.arrayholderIllness = [];
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  onSelectedItemObjectsChange = (selectedObject) => {


    this.setState({ selectedObject })

    var newList = [];
    for (var i = 0; i < selectedObject.length; i++) {
      newList.push({
        procedure_id: selectedObject[i].procedure_id,
        procedure_rate: selectedObject[i].procedure_rate,
        category_name: selectedObject[i].category_name,
        category_id: selectedObject[i].category_id
      });
    }

    this.setState({ newListofItems: newList })
    console.log('deleted', newList)

  }

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
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs2/procedures', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
      .then((response) => {
        response.json()
          .then((data) => {
            if (data.error_message === null) {
              this.setState({ proceduresData: [{ procedure_name: 'Procedures', procedure_id: 0, children: data.data }] })

            } else {
              alert('Unable to generate the procedures!')
            }
          })
          .catch((error) => {
            alert('Error!' + error)
          })
      })
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
            if (doctorspec.data != null) {
              this.setState({
                RCSdoctorspecialty: doctorspec.data,
              })
              RCSdoctorspecialty = doctorspec.data
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
      if (results.length > 3) {
        return alert("Cannot upload more than 3 file!")
      }
      //Validation for total allow MB
      for (const res of results) {
        //Printing the log realted to the file
        console.log('File Size : ' + res.size);
      }
      // results.map((item) => {
      //   const fileSize = 0
      //   fileSize = fileSize + item.size
      // })
      //Setting the state to show multiple file attributes
      this.setState({ multipleFile: results });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
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
    this.setState({ multipleFile: newFile })
  }

  onConfirmProcedure(item) {

    console.log('test', item)

    var newList = [];
    for (var i = 0; i < item.length; i++) {
      newList.push({
        procedure_id: item[i].procedure_id,
        procedure_rate: item[i].procedure_rate,
        category_name: item[i].category_name,
        category_id: item[i].category_id
      });
    }

    this.setState({ newListofItems: newList })
    console.log('updated', newList)

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { dataSource, dataSourceIllness, proceduresData } = this.state
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
                marginVertical: 5,
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
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose hospital/facility</Text>
            <SearchBar
              round
              lightTheme
              searchIcon={{ size: 18 }}
              containerStyle={{ width: SCREEN_WIDTH, height: 40, backgroundColor: 'transparent', }}
              inputContainerStyle={{ height: 34, bottom: 6, backgroundColor: 'transparent' }}
              inputStyle={{ fontSize: 15 }}
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
              containerStyle={{ width: SCREEN_WIDTH, height: 40, backgroundColor: 'transparent', }}
              inputContainerStyle={{ height: 34, bottom: 6, backgroundColor: 'transparent' }}
              inputStyle={{ fontSize: 15 }}
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
                        <Text style={{ alignSelf: 'flex-start', fontSize: 15 }}>{item.illness}</Text>
                      </TouchableOpacity>
                    </ListItem>
                  </View>
                )}
                keyExtractor={item => item.provider_name}
              /> : null}
          </View>
          <View style={styles.formStyle}>
            <SectionedMultiSelect
              style={styles.formLabel}
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
              onConfirm={() => this.onConfirmProcedure(this.state.selectedObject)}
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

          <View>
            <Card style={{ borderRadius: 10, justifyContent: "center" }}>
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
                      Upload file/s
                  </Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
              <ScrollView style={{ flex: 1 }}>
                {/*Showing the data of selected Multiple files*/}
                {this.state.multipleFile.map((item, key) => (
                  <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.textStyle}>
                      File Name: {item.name ? item.name : ''}
                    </Text>
                    <TouchableOpacity style={{ marginTop: 5, marginRight: 10 }} onPress={() => this.removeFile(key)}>
                      <Icon type="Ionicons" name="md-close" style={{ color: 'red' }} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </Card>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Button
              danger rounded
              style={styles.buttonStyle}
              onPress={() => {
                this.handleSubmit();
              }}>
              <Text>Submit</Text>
            </Button>
          </View>
        </ScrollView>
        {(this.state.isLoading) &&
          <View style={styles.spinnerStyle}>
            <Spinner color={'green'} size={60} type={'Circle'} />
          </View>
        }
      </Container>
    );
  }
  
  handleSubmit = () => {
  
    if ( this.state.newListofItems === null) {
      return alert('Please atleast one(1) procedure');
    }

    if (this.state.multipleFile === null) {
      return alert('Please provide atleast one(1) document');
    }

    if (this.state.DoctorSpeciallty.doctor_code  === null) {
      return alert('Please choose a doctor');
    }

    if (this.state.searchIllness === null || this.state.searchIllness === '') {
      return alert('Please provide complaint');
    }
   
    this._InsertRequest();
  }




  async _InsertRequest() {
    
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);

    let formdata = new FormData();
  
    formdata.append(
      'ercs_details',
      JSON.stringify({
        acctno:  this.state.MembPickerValueHolder,
        ercs1no: 'WITHOUT eRCS1',
        doctor_code: this.state.DoctorSpeciallty.doctor_code,
        hospital_code: this.state.providercode,
        posted_by: 'MOBILE',
      }),
    );

 
  const jsonproc =  this.state.newListofItems
  
  console.log(jsonproc)
  formdata.append(
    'ercs_procedures',
    JSON.stringify(
      jsonproc
    ),
  );
  
  this.state.multipleFile.forEach((item, i) => {
    var num = i+1 ;
    formdata.append("prescription"+num, {
      uri: item.uri,
      type: item.type,
      name: item.name
    });
  });
   
    
    console.log(formdata)

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
      console.log(resp)
      let respJson = await resp.json();
      
      if (respJson.is_success === true) {

        let tmprcs2Num = respJson.data.ercsno 
        
        global.rcs2Num = tmprcs2Num

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
  container: {
    paddingHorizontal: 20
  },
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
    // marginHorizontal: 20,
  },
  formLabel: {
     marginHorizontal: 20,
    color: '#6d6e72',
  },
  formStyle: {
    marginVertical: 10,
  },
  removeButton: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'center'
  },
  buttonStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginVertical: 10,
    marginLeft: 10,
    color: 'black',
    width: '90%'
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
