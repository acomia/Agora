import React from 'react'
import { StyleSheet, View, Dimensions, Image, StatusBar } from 'react-native'
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Title, Form, Item, Input, Label, Picker, DatePicker } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import {StackActions, NavigationActions} from 'react-navigation'


const resetAction = StackActions.reset({
    index: 1, // <-- currect active route from actions array
    key: null,
    actions: [
      NavigationActions.navigate({ routeName: 'OnBoarding' }),
    ],
  });

export default class Login extends React.Component {

    state = {
        firstname: '',
        middlename: '',
        lastname: '',
        gender: 'male',
        bdate: '',
        civil_stat: 'single',
        email: '',
        mobile_no: '',
        username: '',
        password: '',
        confirm_password: '',
        intellicare_no: '',
        intellicare_acct:''
    }

    render() {
        return (
            <Container>
                <StatusBar translucent backgroundColor="transparent" />
                <ScrollView>
                    <View style={styles.viewForm}>
                        <Text style={styles.headerText}>Personal Information</Text>
                        <View style={styles.formInfo}>
                            <Item floatingLabel style={styles.formStyle}>
                                <Label>First name</Label>
                                <Input style={styles.labelStyle} 
                                 value={this.state.firstname}
                                 onChangeText={firstname => this.setState({firstname})}
                                />
                            </Item>
                            <Item floatingLabel style={styles.formStyle}>
                                <Label>Middle name</Label>
                                <Input style={styles.labelStyle} 
                                 value={this.state.middlename}
                                 onChangeText={middlename => this.setState({middlename})}
                                />
                            </Item>
                            <Item floatingLabel style={styles.formStyle}>
                                <Label>Last name</Label>
                                <Input style={styles.labelStyle} 
                                 value={this.state.lastname}
                                 onChangeText={lastname => this.setState({lastname})}
                                />
                            </Item>
                            <Item stackedLabel style={styles.formStyle}>
                                <Label>Gender</Label>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select Gender"
                                        placeholderStyle={{ color: "#bdc3c7" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ gender: itemValue })}
                                        >
                                        <Picker.Item label="Male" value="male" />
                                        <Picker.Item label="Female" value="female" />
                                    </Picker>
                                </Item>
                            </Item>
                            <Item stackedLabel style={styles.formStyle} style={{ alignItems: "flex-start" }}>
                                <Label>Date of birth</Label>
                                <DatePicker
                                    // defaultDate={new Date(2018, 4, 4)} style={{ alignSelf: Left }}
                                    // minimumDate={new Date(2018, 1, 1)}
                                    // maximumDate={new Date(2018, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={true}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Select date"
                                    textStyle={{ color: "#2d2d2d" }}
                                    placeHolderTextStyle={{ color: "#bdc3c7" }}
                                    onDateChange={bdate => this.setState({ bdate })}
                                    disabled={false}
                                />
                            </Item>
                            <Item stackedLabel style={styles.formStyle} style={{ marginTop: 10 }}>
                                <Label>Civil Status</Label>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select Gender"
                                        placeholderStyle={{ color: "#bdc3c7" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.civil_stat}
                                        onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ civil_stat: itemValue })}
                                        >
                                        <Picker.Item label="Single" value="single" />
                                        <Picker.Item label="Married" value="married" />
                                    </Picker>
                                </Item>
                                <Item stackedLabel style={styles.formStyle} style={{ alignItems: "flex-start" }}>
                                    <Label>Date of birth</Label>
                                    <DatePicker
                                        defaultDate={new Date(2018, 4, 4)} style={{ alignSelf: Left }}
                                        minimumDate={new Date(2018, 1, 1)}
                                        maximumDate={new Date(2018, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={true}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Select date"
                                        textStyle={{ color: "#2d2d2d" }}
                                        placeHolderTextStyle={{ color: "#bdc3c7" }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                    />
                                </Item>
                                <Item stackedLabel style={styles.formStyle} style={{ marginTop: 10 }}>
                                    <Label>Civil Status</Label>
                                    <Item picker>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            style={{ width: undefined }}
                                            placeholder="Select Gender"
                                            placeholderStyle={{ color: "#bdc3c7" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.selected2}
                                            onValueChange={this.onValueChange2.bind(this)}>
                                            <Picker.Item label="Single" value="single" />
                                            <Picker.Item label="Married" value="married" />
                                        </Picker>
                                    </Item>
                                </Item>
                            </Item>
                        </View>
                    </View>
                    <View style={styles.viewForm}>
                        <Text style={styles.headerText}>Account Information</Text>
                        <View style={styles.formInfo}>
                        <Item floatingLabel style={styles.formStyle}>
                                <Label>Intellicare Account No.</Label>
                                <Input style={styles.labelStyle} 
                                value={this.state.intellicare_acct}
                                onChangeText={intellicare_acct => this.setState({intellicare_acct})}/>
                            </Item>
                            <Item floatingLabel style={styles.formStyle}>
                                <Label>Intellicare Card No.</Label>
                                <Input style={styles.labelStyle} 
                                  value={this.state.intellicare_no}
                                  onChangeText={intellicare_no => this.setState({intellicare_no})}
                                />
                            </Item>
                            <Item floatingLabel style={styles.formStyle}>
                                <Label>Username/Email Address</Label>
                                <Input style={styles.labelStyle} 
                                value={this.state.email}
                                onChangeText={email => this.setState({email})}
                                />
                            </Item>
                            <Item floatingLabel style={styles.formStyle}>
                                <Label>Password</Label>
                                <Input style={styles.labelStyle}
                                secureTextEntry 
                                value={this.state.password}
                                onChangeText={password => this.setState({password})}
                                />
                            </Item>
                            <Item floatingLabel style={styles.formStyle}>
                                <Label>Confirm Password</Label>
                                <Input style={styles.labelStyle} 
                                secureTextEntry
                                value={this.state.confirm_password}
                                onChangeText={confirm_password => this.setState({confirm_password})}
                                />
                            </Item>
                            <Item floatingLabel style={styles.formStyle}>
                                <Label>Mobile No.</Label>
                                <Input style={styles.labelStyle} 
                                value={this.state.mobile_no}
                                onChangeText={mobile_no => this.setState({mobile_no})}
                                />
                            </Item>
                        </View>
                    </View>
                    <View style={styles.viewButtonSignUp}>
                        <Button block rounded info
                        onPress={() => { this.handleSubmit() }}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        );
    };


handleSubmit = () => {
    if (this.state.firstname === null || this.state.firstname === '')   {
        return alert("Firstname Required");
    } 

    if (this.state.lastname === null || this.state.lastname === '')   {
        return alert("Lastname Required");
    } 

    if (this.state.civil_stat === null || this.state.civil_stat === '')   {
        return alert("Civil Status Required");
    } 

    if (this.state.gender === null || this.state.gender === '')   {
        return alert("Gender is Required");
    } 

    if (this.state.email === null || this.state.email === '')   {
        return alert("Email is Required");
    } 

    if (this.state.password === null || this.state.password === '')   {
        return alert("Password Required");
    } 

    if (this.state.password.length < 6)  {
        return alert("Password too short");
     }

    if (this.state.password !== this.state.confirm_password)  {
       return alert("Password does not match");
    } 
    
    this._InsertRequest()
}

_InsertRequest() {
    fetch('http://52.230.122.226:3000/api/v1/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                
                first_name: this.state.firstname,
                middlename: this.state.middlename,
                last_name: this.state.lastname,
                gender: this.state.gender,
                birth_date : this.state.bdate,
                civil_status: this.state.civil_stat,
                email: this.state.email,
                mobile_number: this.state.mobile_no,
                password: this.state.password,
                intellicare_id: this.state.intellicare_no,
                account_no: this.state.intellicare_acct
            })
        })
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.message === 'Successfully registered user.' ) 
                    {
                        alert("Successfully Registered!")
                        this.props.navigation.dispatch(resetAction);
                    } 
                    // else if (data.errors.message.email === 'Must be a valid email' ) 
                    // {
                    //     return  alert("Invalid Email.")
                    // } 
                      
                            console.log(data.errors);   
                        //     let deptcount = Object.keys(data.errors).length;
                        //     for (let i = 0; i < deptcount; i++) {
                        //       let deptlist = data.errors[i];
                        //       console.log(deptcount)
                        //       console.log(data)
                        //         console.log(deptlist);
                  
                })
        })
        .catch((error) => {
            alert("ERROR: " + error)
        })

    }

}
 


const styles = StyleSheet.create(
    {
        headerBackground: {
            backgroundColor: '#fff',
        },
        header: {
            flex: 1,
            height: 100,
            backgroundColor: "#5fb650",
            paddingHorizontal: 30,
        },
        headerTitle: {
            fontSize: 30,
            fontWeight: "bold",
            color: "#fff"
        },
        contentStyle: {
            paddingVertical: 50,
            marginTop: -45,
            backgroundColor: "#fff",
            borderTopStartRadius: 50,
            borderTopEndRadius: 50,
            justifyContent: "center",
            shadowColor: '#2d2d2d',
            shadowOffset: { width: 1, height: 5 },
            shadowOpacity: 0.10,
            shadowRadius: 20,
            elevation: 5,
            borderWidth: 0,
        },
        title: {
            color: "#2d2d2d",
            fontWeight: "bold"
        },
        viewForm: {
            flex: 1,
            padding: 10,
        },
        formInfo: {
            paddingHorizontal: 10,
        },
        formLabel: {
            color: "#2d2d2d"
        },
        twoColumns: {
            flexDirection: "row"
        },
        headerText: {
            color: "#5fb650",
            marginVertical: 20,
            fontSize: 24,
            fontWeight: "bold",
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
        }
    }
)

