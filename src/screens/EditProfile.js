import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {
  Container,
  Button,
  Text,
  Left,
  Body,
  Label,
  Item,
  Picker,
  Icon,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-spinkit';
import {TextInput, IconButton} from 'react-native-paper';

var {width, height} = Dimensions.get('window');

const apiUpdateProfile = 'http://52.230.122.226:3000/api/v1/updateAccountInfo/';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    const {
      first_name,
      last_name,
      gender,
      email,
      birth_date,
      id,
    } = this.props.navigation.state.params;
    this.state = {
      fname: first_name,
      lname: last_name,
      ugender: gender,
      userId: id,
      date: '2016-05-15',
      isLoading: false,
    };
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Edit Profile</Text>
          </View>
          <View style={styles.contentStyle}>
            <View style={styles.viewForm}>
              <View style={styles.formInfo}>
                <Text style={styles.headerText}>Personal Information</Text>
                <Item style={styles.itemStyle}>
                  <Left>
                    <Label style={styles.itemLabel}>First Name</Label>
                  </Left>
                  <Body style={{flex: 3}}>
                    <Input
                      textAlign="right"
                      inputContainerStyle={{borderBottomColor: '#fff'}}
                      textTransform="capitalize"
                      onChangeText={fname => this.setState({fname})}
                      value={this.state.fname}
                    />
                  </Body>
                </Item>
                <Item style={styles.itemStyle}>
                  <Left>
                    <Label style={styles.itemLabel}>Middle Name</Label>
                  </Left>
                  <Body style={{flex: 2}}>
                    <Input
                      textAlign="right"
                      inputContainerStyle={{borderBottomColor: '#fff'}}
                    />
                  </Body>
                </Item>
                <Item style={styles.itemStyle}>
                  <Left>
                    <Label style={styles.itemLabel}>Last Name</Label>
                  </Left>
                  <Body style={{flex: 3}}>
                    <Input
                      textAlign="right"
                      inputContainerStyle={{borderBottomColor: '#fff'}}
                      textTransform="capitalize"
                      onChangeText={lname => this.setState({lname})}
                      value={this.state.lname}
                    />
                  </Body>
                </Item>
                <Item style={styles.itemStyle}>
                  <Left>
                    <Label style={styles.itemLabel}>Gender</Label>
                  </Left>
                  <Body style={{alignItems: 'flex-end'}}>
                    <Item picker>
                      <Picker
                        selectedValue={this.state.ugender}
                        style={{height: 50, width: 100}}
                        onValueChange={itemValue =>
                          this.setState({ugender: itemValue})
                        }>
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                      </Picker>
                    </Item>
                  </Body>
                </Item>
                <Item style={styles.itemStyle}>
                  <Left>
                    <Label style={styles.itemLabel}>Birth Date</Label>
                  </Left>
                  <Body style={{alignItems: 'flex-end'}}>
                    <DatePicker
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          alignItems: 'flex-end',
                        },
                      }}
                      showIcon={false}
                      locale={'en'}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={true}
                      animationType={'fade'}
                      androidMode={'default'}
                      textStyle={{color: '#2d2d2d', fontSize: 20}}
                      onDateChange={date => {
                        this.setState({date: date});
                      }}
                      disabled={false}
                    />
                  </Body>
                </Item>
              </View>
            </View>
            <View style={styles.viewForm}>
              <View style={styles.formInfo}>
                <Text style={styles.headerText}>Account Information</Text>
                <Item style={styles.itemStyle}>
                  <Left>
                    <Label style={styles.itemLabel}>Email</Label>
                  </Left>
                  <Body style={{flex: 2}}>
                    <Input
                      textAlign="right"
                      inputContainerStyle={{borderBottomColor: '#fff'}}
                    />
                  </Body>
                </Item>
                <Item style={styles.itemStyle}>
                  <Left>
                    <Label style={styles.itemLabel}>Password</Label>
                  </Left>
                  <Body style={{flex: 2}}>
                    <Input
                      textAlign="right"
                      inputContainerStyle={{borderBottomColor: '#fff'}}
                    />
                  </Body>
                </Item>
                <Item style={styles.itemStyle}>
                  <Left>
                    <Label style={styles.itemLabel}>Mobile No.</Label>
                  </Left>
                  <Body style={{flex: 2}}>
                    <Input
                      textAlign="right"
                      inputContainerStyle={{borderBottomColor: '#fff'}}
                    />
                  </Body>
                </Item>
              </View>
            </View>
            <View style={{flex: 1}}>
              <Button
                rounded
                success
                block
                style={{marginHorizontal: 20, marginTop: 20}}
                onPress={() => {
                  let params = {
                    first_name: this.state.fname,
                    last_name: this.state.lname,
                    gender: this.state.ugender,
                  };
                  console.log('params ito', params);
                  updateProfile(params, this.state.userId)
                    .then(result => {
                      this.state.isLoading = false;
                      console.log(result, 'result ito');
                      if (
                        result.message ===
                        'Successfully updated account information.'
                      ) {
                        alert(result.message);
                        this.props.navigation.navigate('ProfilePage');
                      }
                    })
                    .catch(error => {
                      console.log(`error = ${error}`);
                    });
                }}>
                <Text>Save Changes</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

// componentDidUpdate() {
//     const { spinnerStyle, spinnerTextStyle } = styles
//     if (this.state.isLoading) {
//         return (
//             <View style={spinnerStyle}>
//                 <Spinner
//                     color={'green'}
//                     size={50}
//                     type={'Wave'}
//                 />
//                 <Text style={spinnerTextStyle}>Saving...</Text>
//             </View>
//         )
//     }
// }

async function updateProfile(params, uid) {
  console.log(params);
  console.log(uid);
  try {
    let response = await fetch(apiUpdateProfile + uid, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

const styles = StyleSheet.create({
  header: {
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
    flex: 1,
    paddingVertical: 20,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  headerStyle: {
    height: 150,
    backgroundColor: '#5fb650',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  itemStyle: {
    padding: 5,
  },
  itemLabel: {
    color: '#6d6e72',
  },
  itemInfo: {
    color: '#214021',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  labelNickname: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  labelUserID: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14,
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
  headerText: {
    color: '#5fb650',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewForm: {
    flex: 1,
    padding: 10,
  },
  formInfo: {
    paddingHorizontal: 10,
  },
});
