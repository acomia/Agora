import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  StatusBar,
  ActivityIndicator,
  Linking,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  Body,
  Item,
  Input,
  Label,
  Picker,
  DatePicker,
  CheckBox,
  Thumbnail,
  ListItem,
  Card,
  CardItem,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import CompressImage from 'react-native-compress-image';
import Modal from 'react-native-modal'
import MaskedInput from 'react-native-masked-input-text'
import NetInfo from "@react-native-community/netinfo";

const { width, height } = Dimensions.get('window');

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'OnBoardingPage' })],
});

export default class Login extends React.Component {
  state = {
    firstname: '',
    middlename: '',
    lastname: '',
    street: '',
    municipal: '',
    province: '',
    gender: 'M',
    bdate: '',
    civil_stat: 'SINGLE',
    membertype: 'P',
    email: '',
    mobile_no: '',
    password: '',
    confirm_password: '',
    intellicare_no: '',
    intellicare_acct: '',
    valid_photo: null,
    intid_photo: null,
    check_agreement1: true,
    check_agreement2: true,
    check_agreement3: true,
    check_opt: true,
    opt_val: 1,
    creatingAcct: false,
    confirm: false,
    visibleModal: false,
    accepted: false
  };

  checkedagree1() {
    if (this.state.check_agreement1 == true) {
      this.setState({ check_agreement1: false })
    }
    else {
      this.setState({ check_agreement1: true })
    }
    this.confirm_enabled();
  }

  checkedagree2() {
    if (this.state.check_agreement2 == true) {
      this.setState({ check_agreement2: false })
    }
    else {
      this.setState({ check_agreement2: true })
    }
    this.confirm_enabled();
  }

  checkedagree3() {
    if (this.state.check_agreement3 == true) {
      this.setState({ check_agreement3: false })
    }
    else {
      this.setState({ check_agreement3: true })
    }
    this.confirm_enabled();
  }

  checkedopt() {
    if (this.state.check_opt == true) {
      this.setState({ check_opt: false })
      this.setState({ opt_val: 0 })
    }
    else {
      this.setState({ check_opt: true })
      this.setState({ opt_val: 1 })
    }
  }

  confirm_enabled() {
    if (this.state.check_agreement1 == true && this.state.check_agreement2 == true && this.state.check_agreement3 == true) {
      this.setState({ confirm: true })
    }
    else {
      this.setState({ confirm: false })
    }
  }
  render() {
    const { valid_photo, intid_photo } = this.state;

    function RenderValidID() {
      if (valid_photo == null)
        return (
          <Thumbnail style={{ width: 58, height: 58, marginHorizontal: 4, borderRadius: 50 }} />
        );
      else {
        return (
          valid_photo && (
            <Thumbnail
              style={{ width: 58, height: 58, marginHorizontal: 4, borderRadius: 50 }}
              source={{ uri: valid_photo.uri }}
            />
          )
        );
      }
    }

    function RenderIntID() {
      if (intid_photo == null)
        return (
          <Thumbnail style={{ width: 57, height: 57, marginHorizontal: 4, borderRadius: 50 }} />
        );
      else {
        return (
          intid_photo && (
            <Thumbnail
              style={{ width: 57, height: 57, marginHorizontal: 4, borderRadius: 50 }}
              source={{ uri: intid_photo.uri }}
            />
          )
        );
      }
    }

    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Create an account
            </Text>
            <Text style={styles.headerSubheader}>
              (For Pricipal Members Only)
            </Text>
          </View>
          <View style={styles.contentStyle}>
            <View style={styles.viewForm}>
              <View style={styles.formInfo}>
                <Text style={styles.headerText}>Personal Information</Text>
                <Text style={styles.reqField}>
                  * Required Fields
                </Text>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>First name *</Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.firstname}
                    onChangeText={firstname => this.setState({ firstname })}
                  />
                </Item>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Middle name *</Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.middlename}
                    onChangeText={middlename => this.setState({ middlename })}
                  />
                </Item>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Last name *</Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.lastname}
                    onChangeText={lastname => this.setState({ lastname })}
                  />
                </Item>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Street</Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.street}
                    onChangeText={street => this.setState({ street })}
                  />
                </Item>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Municipal</Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.municipal}
                    onChangeText={municipal => this.setState({ municipal })}
                  />
                </Item>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Province</Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.province}
                    onChangeText={province => this.setState({ province })}
                  />
                </Item>
                <Item stackedLabel style={styles.formStyle}>
                  <Label>Sex</Label>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Select Gender"
                      placeholderStyle={{ color: '#bdc3c7' }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.gender}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ gender: itemValue })
                      }>
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                    </Picker>
                  </Item>
                </Item>
                <Item
                  stackedLabel
                  style={styles.formStyle}
                  style={{ alignItems: 'flex-start' }}>
                  <Label>Date of birth *</Label>
                  <DatePicker
                    // defaultDate={new Date(2018, 4, 4)} style={{ alignSelf: Left }}
                    // minimumDate={new Date(2018, 1, 1)}
                    // maximumDate={new Date(2018, 12, 31)}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={true}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText="Select date"
                    textStyle={{ color: '#2d2d2d' }}
                    placeHolderTextStyle={{ color: '#bdc3c7' }}
                    onDateChange={bdate => this.setState({ bdate })}
                    disabled={false}
                    defaultDate={this.state.bdate}
                  />
                </Item>
                <Item
                  stackedLabel
                  style={styles.formStyle}
                  style={{ marginTop: 10 }}>
                  <Label>Civil Status</Label>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Select Gender"
                      placeholderStyle={{ color: '#bdc3c7' }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.civil_stat}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ civil_stat: itemValue })
                      }>
                      <Picker.Item label="Single" value="single" />
                      <Picker.Item label="Married" value="married" />
                    </Picker>
                  </Item>
                </Item>
              </View>
            </View>
            <View style={styles.viewForm}>
              <View style={styles.formInfo}>
                <Text style={styles.headerText}>Account Information</Text>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Intellicare Account No. * <Text style={styles.sampleText}>(eg. 00-00-00000-00000-00)</Text> </Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.intellicare_acct}
                    onChangeText={intellicare_acct =>
                      this.setState({ intellicare_acct })
                    }
                  />

                </Item>

                <Item floatingLabel style={styles.formStyle}>
                  <Label>Intellicare Card No. * (eg. 1234567891234516)</Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.intellicare_no}
                    onChangeText={intellicare_no =>
                      this.setState({ intellicare_no })
                    }
                  />
                </Item>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Email Address * <Text style={styles.sampleText}>(eg. sample@email.com) </Text></Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </Item>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Password *</Label>
                  <Input
                    style={styles.labelStyle}
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                  />
                </Item>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Confirm Password</Label>
                  <Input
                    style={styles.labelStyle}
                    secureTextEntry
                    value={this.state.confirm_password}
                    onChangeText={confirm_password =>
                      this.setState({ confirm_password })
                    }
                  />
                </Item>
                <Item floatingLabel style={styles.formStyle}>
                  <Label>Mobile No. *</Label>
                  <Input
                    style={styles.labelStyle}
                    value={this.state.mobile_no}
                    onChangeText={mobile_no => this.setState({ mobile_no })}
                  />
                </Item>
                <TouchableOpacity
                   onPress={() => {
                    this.handleValidIDPhoto();
                  }}>
                <Card style={{ borderRadius: 10 }}>
                  <CardItem style={{ borderRadius: 10, flexDirection: 'row' }}>
                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Button
                        iconLeft
                        transparent
                        // onPress={() => {
                        //   this.handleValidIDPhoto();
                        // }}
                        >
                        {RenderValidID()}
                      </Button>
                      <Icon
                        type="MaterialIcons"
                        name="photo-camera"
                        style={{ color: '#5fb650' }}
                        onPress={() => {
                          this.handleValidIDPhoto();
                        }}
                      />
                      <Text style={{ color: '#5fb650', fontSize: 14 }}>
                        Take Selfie w/ valid ID
                        </Text>
                    </Body>
                  </CardItem>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity
                   onPress={() => {
                    this.handleIntIDPhoto();
                  }}>
                <Card style={{ borderRadius: 10 }}>
                  <CardItem style={{ borderRadius: 10, flexDirection: 'row' }}>
                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Button
                        iconLeft
                        transparent
                        // onPress={() => {
                        //   this.handleIntIDPhoto();
                        // }}
                        >
                        {RenderIntID()}
                      </Button>
                      <Icon
                        type="MaterialIcons"
                        name="photo-camera"
                        style={{ color: '#5fb650' }}
                        onPress={() => {
                          this.handleIntIDPhoto();
                        }}
                      />
                      <Text style={{ color: '#5fb650', fontSize: 14 }}>
                        Take Selfie w/ Intellicare ID
                        </Text>
                    </Body>
                  </CardItem>
                </Card>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.viewButtonSignUp}>
              <Button
                disabled={this.state.confirm}
                block
                success
                onPress={() => {
                  this.setState({ visibleModal: true })
                }}>
                <Text style={{ textAlign: "center" }}>Click Here to Read Terms of Service, Privacy Notice and Privacy Policy</Text>
              </Button>
            </View>
            <View style={{ paddingHorizontal: 15, alignContent: 'center' }}>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <CheckBox color="#5fb650"
                  checked={this.state.check_agreement1}
                  onPress={() => this.checkedagree1()}
                />
                <Body>
                  <Text style={styles.textTermConditions}>
                    I have read the above Terms of Service, Privacy Notice and the Privacy Policy
                  </Text>
                </Body>
              </ListItem>
            </View>
            <View style={{ paddingHorizontal: 15, alignContent: 'center' }}>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <CheckBox color="#5fb650"
                  checked={this.state.check_agreement2}
                  onPress={() => this.checkedagree2()}
                />
                <Body>
                  <Text style={styles.textTermConditions}>
                    I agree to such terms of Service, Privacy Notice and Privacy Policy.
                  </Text>
                </Body>
              </ListItem>
            </View>
            <View style={{ paddingHorizontal: 15, alignContent: 'center' }}>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <CheckBox color="#5fb650"
                  checked={this.state.check_agreement3}
                  onPress={() => this.checkedagree3()}
                />
                <Body>
                  <Text style={styles.textTermConditions}>
                    I hereby warrant that I, as the Principal member under my Intellicare HMO Plan,
                    have secured the written consent of my dependents
                    allowing me to provide and access their information via App.
                  </Text>
                </Body>
              </ListItem>
            </View>
            <View style={{ paddingHorizontal: 15, alignContent: 'center' }}>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <CheckBox color="#5fb650"
                  checked={this.state.check_opt}
                  onPress={() => this.checkedopt()}
                />
                <Body>
                  <Text style={styles.textTermConditions}>
                    <Text style={{ textDecorationLine: 'underline', color: '#000000', fontSize: 16 }}>Optional</Text>  <Text> </Text>
                    I consent to receiving marketing offers in accordance with our Privacy Policy.
                  </Text>
                </Body>
              </ListItem>
            </View>
            <View style={styles.viewButtonSignUp}>
              <Button
                disabled={this.state.confirm}
                block
                rounded
                success
                onPress={() => {
                  this.handleSubmit();
                }}>
                {this.state.creatingAcct ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text>Create an Account</Text>
                  )}
              </Button>
            </View>
          </View>
        </ScrollView>
        <Modal
          isVisible={this.state.visibleModal}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}>
          {this.renderPrivacyContent()}
        </Modal>
      </Container>
    );
  }

  renderPrivacyContent() {
    return (
      <View style={styles.container}>
        <Text style={styles.pnTitle}>Intellicare App Privacy Notice</Text>
        <ScrollView
          style={styles.tcContainer}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              this.setState({ accepted: true })
            }
          }}
        >
          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Hi Intellicare App User,</Text>
          <Text style={styles.pnP}>Intellicare values your privacy and this notice are meant to help you understand how we protect the information you provide. </Text>
          <Text style={styles.pnP}>Our people are working hard to ensure you remain in control of your data. So please take time to read this before you continue signing up.</Text>
          <Text style={{ fontWeight: 'bold' }}>What we collect and why.</Text>
          <Text style={styles.pnP}>We built this App to provide you with the most efficient services we can offer in the market, improve our services and personalize them to your needs to the extent possible.
            This App allows us to provide you information on your HMO coverage, our partner medical institutions and our Company and to interact with you directly.  But to do this we need the following information from your end</Text>
          <Text style={styles.pnNL}>1.	Your name, sex, and age</Text>
          <Text style={styles.pnNL}>2.	Your address</Text>
          <Text style={styles.pnNL}>3.	Your contact number</Text>
          <Text style={styles.pnNL}>4.	Intellicare Account Number</Text>
          <Text style={styles.pnNL}>5.	Intellicare Card Number</Text>
          <Text style={styles.pnNL}>6.	Copy of a Government Issued ID</Text>
          <Text style={styles.pnNL}>7.	Copy of your Intellicare Card ID</Text>
          <Text style={styles.pnP}>This set of information will be used further for other purposes. Specifically, we collect your name, sex, age, address, Intellicare Details, and Identification Cards to verify your identity and membership in the Intellicare Network and to reach out to you in cases of public service announcements. Collecting your contact details like mobile number and email allows us to send you confirmation of registration in this App, as well as updates and materials you may like.
            For example, if there are updates in our services, you will know them with a notification sent via this App.
            Please note, we will only send you marketing materials if you give your specific consent, which you will see later on.</Text>
          <Text style={styles.pnP}>All those we collect from you are treated as private and confidential.</Text>
          <Text style={{ fontWeight: 'bold' }}>Reviewing, Updating, Removing and deleting your information</Text>
          <Text style={styles.pnP}>You can request to update and delete App account information by sending your request to our data protection officer, via dpo@intellicare.net.ph.</Text>
          <Text style={styles.pnP}>Note, however, that deleting your account information will automatically result in the deactivation of your access to this App.</Text>
          <Text style={styles.pnP}>To be clear, your HMO information is treated separately and is subject to the Privacy Policy of Intellicare and the Benefit Plan of your Employer. In other words, deleting App account information does not result in the deletion of your HMO information as the latter is governed by the Benefit Plan provided by your employer. But if you want to withdraw your consent to our use and/or disclosure of your personal data for the delivery of HMO services, just bear in mind that we may no longer be able to serve you nor provide you with the products and services that you require.</Text>
          <Text style={{ fontWeight: 'bold' }}>When Intellicare shares your information</Text>
          <Text style={styles.pnP}>Intellicare will only share your information if:</Text>
          <Text style={styles.pnNL}>1.	You gave your consent;</Text>
          <Text style={styles.pnNL}>2.	The processing of personal information is necessary and is related to the fulfillment of the HMO contract with your Employer,</Text>
          <Text style={styles.pnNL}>3.	The processing is necessary for compliance with a legal obligation to which Intellicare or your Employer is subject,</Text>
          <Text style={styles.pnNL}>4.	The processing is necessary to protect your vitally important interests, including life and health,</Text>
          <Text style={styles.pnNL}>5.	The processing is necessary in order to respond to national emergency, to comply with the requirements of public order and safety, or to fulfill functions of public authority which necessarily includes the processing of personal data for the fulfillment of its mandate; or</Text>
          <Text style={styles.pnNL}>6.	The processing is necessary for the purposes of the legitimate interests pursued by Intellicare or your Employer or by a third party or parties to whom the data are disclosed, except where such interests are overridden by fundamental rights and freedoms of the data subject which require protection under the Philippine Constitution.</Text>
          <Text style={{ fontWeight: 'bold' }}>To whom we may Disclose</Text>
          <Text style={styles.pnP}>Your information may be disclosed subject to the above-stated conditions only and the requirements of the Data Privacy Act to:</Text>
          <Text style={styles.pnNL}>1.	Your Human Resource Department as far as HMO utilization is concerned and your eligibility as a member of the Intellicare Network</Text>
          <Text style={styles.pnNL}>2.	Courts, Law Enforcement Authorities and Regulators but only upon their lawful orders</Text>
          <Text style={styles.pnNL}>3.	Lawyers or any person whenever there is a need to protect the rights of Intellicare and your Employer; provided that the information is absolutely necessary.</Text>
          <Text style={{ fontWeight: 'bold' }}>We build security into our services to protect your information</Text>
          <Text style={styles.pnP}>We strive to build the best security precautions to ensure that the information you provide is protected against unauthorized or unintended access. We can assure you that internationally acceptable standards are in place so you will feel comfortable trusting us with your data.</Text>
          <Text style={{ fontWeight: 'bold' }}>Retention</Text>
          <Text style={styles.pnP}>Your information is retained for the period of time for as long as the purpose for which the personal data was collected continues.</Text>
          <Text style={styles.pnP}>We will destroy the personal data thereafter, unless it is necessary to retain the personal data longer for our satisfaction and compliance of legal, regulatory or accounting requirements, or to protect our interest.</Text>
          <Text style={{ fontWeight: 'bold' }}>Complaints</Text>
          <Text style={styles.pnP}>If you have complaints, our lines are open. Kindly contact our Data Protection Officer via email via dpo@intellicare.net.ph.</Text>
        </ScrollView>
        <TouchableOpacity disabled={!this.state.accepted} onPress={() => this.setState({ visibleModal: false, accepted: false })} style={this.state.accepted ? styles.pnButton : styles.pnButtonDisabled}><Text style={styles.pnButtonLabel}>Accept</Text></TouchableOpacity>
      </View>
    )
  }

  handleSubmit = () => {
    let valid_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    NetInfo.fetch().then(state => {
      if (state.isConnected == false) {
        return alert('Check Internet Connection...');
      }
    });

    if (valid_email.test(this.state.email) === false) {
      return alert("Email address is not valid!");
    }
    else {
      console.log("Email is Correct");
    }
    if (this.state.email === null || this.state.email === '') {
      return alert('Email is Required');
    }

    if (this.state.intid_photo === null) {
      return alert('Intellicare ID Picture Required');
    }

    if (this.state.valid_photo === null) {
      return alert('Valid ID Picture Required');
    }

    if (this.state.password === null || this.state.password === '') {
      return alert('Password Required');
    }

    if (this.state.password.length < 6) {
      return alert('Password too short');
    }

    if (this.state.password !== this.state.confirm_password) {
      return alert('Password does not match');
    }


    //this._InsertRequest();
    this.checkConnectivity();
  };

  handleValidIDPhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchCamera(options, response => {
      if (!response.didCancel) {
        console.log(response);
        let imgtype = response.type;

        CompressImage.createCompressedImage(response.path, '').then((responseimg) => {

          console.log(responseimg);
          var vidphoto = {
            uri: responseimg.uri,
            type: imgtype,
            //name: response.fileName
            name: responseimg.name
          }


          console.log(vidphoto);
          this.setState({ valid_photo: vidphoto });
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
        }).catch((err) => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
        });
      }
    });
  };

  handleIntIDPhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchCamera(options, response => {
      if (!response.didCancel) {
        console.log(response);
        let imgtype = response.type;

        CompressImage.createCompressedImage(response.path, '').then((responseimg) => {

          console.log(responseimg);
          var intphoto = {
            uri: responseimg.uri,
            type: imgtype,
            //name: response.fileName
            name: responseimg.name
          }

          console.log(intphoto);
          this.setState({ intid_photo: intphoto });
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
        }).catch((err) => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
        });
      }

    });
  };

  checkConnectivity() {
    NetInfo.fetch().then(state => {
      // console.log("Connection type2", state.type);
      //console.log("Is connected?2", state.isConnected);
      if (state.isConnected == true) {
        this._InsertRequest();
      } else {
        alert('Check Internet Connection...');
      }
    });
  }

  async _InsertRequest() {
    let formdata = new FormData();

    let nstring = this.setState.intellicare_no
    this.setState.intellicare_no = nstring.replace(/[^0-9]/gi,'')
    
    formdata.append('gov_id', this.state.valid_photo);
    formdata.append('int_id', this.state.intid_photo);

    console.log(formdata)

    formdata.append(
      'member_details',
      JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        lastname: this.state.lastname,
        firstname: this.state.firstname,
        middlename: this.state.middlename,
        birthdate: this.state.bdate,
        street: this.state.street,
        mobileno: this.state.mobile_no,
        city_minicipal: this.state.municipal,
        province: this.state.province,
        membertype: 'P',
        gender: this.state.gender,
        accountno: this.state.intellicare_acct,
        cardno: this.state.intellicare_no,
        civil_status: this.state.civil_stat,
        employeeid: '',
        posted_from: 'mobile',
        read_terms: 1,
        warrant_as_principal: 1,
        consent_receiving: this.state.opt_val
      }),
    );

    this.setState({ creatingAcct: true });

    try {
      let resp = await fetch(
        'https://intellicare.com.ph/uat/webservice/memberprofile/api/registration',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'

          },
          body: formdata,
        },
      );
      let respJson = await resp.json();

      if (respJson.is_success === true) {

        this.SEND_EMAILVERIFICATION()
      }


      else {
        console.log(respJson.error_message);
        if (respJson.error_message === 'Account is invalid.') {
          alert('Invalid Account/Account format');

        }
        else {
          alert(respJson.error_message)

        }
      }


      console.log(respJson);
    }
    catch (error) {
      console.log(error);
    }

    this.setState({ creatingAcct: false });
  }

  SEND_EMAILVERIFICATION() {
    // fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/verification/register/send?postedfrom=mobile&firstname=' + this.state.firstname + '&lastname=' + this.state.lastname, {
    //   method: 'PUT',
    //   headers: {
    //     EmailAddress: this.state.email
    //   }
    // })
    // .then(response => {
    //   response.json()
    //     .then((data) => {
    //       if (data.error_message === 'Successfully generate verification code.') {
    this.props.navigation.navigate('VerifyOTP', {
      routeAddress: 'registration',
      emailAddress: this.state.email,
      f_NAME: this.state.firstname,
      l_NAME: this.state.lastname
    })
    //       } else {
    //         alert('error')
    //       }
    //     })
    // })
    // .catch((error) => {
    //   alert('Error!' + error)
    // })
  }
}

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
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
    paddingVertical: 20,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  title: {
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  viewForm: {
    flex: 1,
    padding: 10,
  },
  formInfo: {
    paddingHorizontal: 10,
  },
  formLabel: {
    color: '#2d2d2d',
  },
  twoColumns: {
    flexDirection: 'row',
  },
  headerText: {
    color: '#5fb650',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewButtonSignUp: {
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  labelStyle: {
    marginBottom: 5,
  },
  formStyle: {
    marginBottom: 20,
  },
  textTermConditions: {
    color: '#000000',
    fontSize: 14,
  },

  //  Privacy Notice Style

  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 20,
    // marginLeft: 10,
    // marginRight: 10,
    padding: 16,
    borderRadius: 6,
    backgroundColor: 'white'
  },
  pnTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#5fb650'
  },
  pnP: {
    fontSize: 12,
    padding: 5
  },
  pnL: {
    padding: 10,
    fontSize: 12
  },
  pnNL: {
    fontSize: 12,
    marginLeft: 10,
    padding: 2
  },
  pnContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * .7,
    borderWidth: 0.5,
  },
  pnButton: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10
  },
  pnButtonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
  },
  pnButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    alignSelf: 'center'
  },
  headerSubheader: {
    fontSize: 12,
    color: '#a5d69c',
  },
  sampleText: {
    fontSize: 12,
    color: '#82817e',
  },
  reqField: {
    fontSize: 12,
    color: '#f54640',
  },
});
