import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Container, Button, Text, Left, Body, Label, Item, Picker } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-spinkit';

var { width, height } = Dimensions.get('window');

const apiUpdateProfile = 'http://52.230.122.226:3000/api/v1/updateAccountInfo/';

export default class EditProfile extends React.Component {

    constructor(props) {
        super(props)
        const { first_name, last_name, gender, email, birth_date, id } = this.props.navigation.state.params;
        this.state = {
            fname: first_name,
            lname: last_name,
            ugender: gender,
            userId: id,
            date: "2016-05-15",
            isLoading: false,
        }
    }

    render() {

        return (
            <Container>
                <ScrollView>
                    <View style={styles.profileInfo}>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Label style={styles.itemLabel}>First Name</Label>
                            </Left>
                            <Body style={{ alignItems: 'flex-end', flex: 3 }}>
                                <Input style={styles.itemInfo}
                                    onChangeText={(fname) => this.setState({ fname })}
                                    value={this.state.fname}
                                />
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Label style={styles.itemLabel}>Last Name</Label>
                            </Left>
                            <Body style={{ alignItems: 'flex-end', flex: 3 }}>
                                <Input style={styles.itemInfo}
                                    onChangeText={(lname) => this.setState({ lname })}
                                    value={this.state.lname}
                                />
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Label style={styles.itemLabel}>Gender</Label>
                            </Left>

                            <Body style={{ alignItems: 'flex-end', flex: 3 }}>
                                <Item picker>
                                    <Picker
                                        selectedValue={this.state.ugender}
                                        style={{ height: 50, width: 100 }}
                                        onValueChange={(itemValue) =>
                                            this.setState({ ugender: itemValue })
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
                            <Body style={{ alignItems: 'flex-end', flex: 3, fontSize: 18, marginLeft: 10, marginTop: 10 }}>
                                <Text style={styles.itemInfo}></Text>
                                <DatePicker
                                    defaultDate={new Date(2018, 4, 4)} style={{ alignSelf: 'flex-end' }}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={true}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Select date"
                                    textStyle={{ color: "#2d2d2d" }}
                                    placeHolderTextStyle={{ color: "#bdc3c7" }}
                                    disabled={false}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />
                            </Body>
                        </Item>
                    </View>
                    <View>


                    </View>
                    <View style={{ flex: 1 }}>

                        <Button rounded success block style={{ marginHorizontal: 20, marginTop: 20 }}
                            onPress={() => {
                                let params = {
                                    first_name: this.state.fname,
                                    last_name: this.state.lname,
                                    gender: this.state.ugender
                                };
                                console.log('params ito', params);
                                updateProfile(params, this.state.userId).then((result) => {
                                    this.state.isLoading = false;
                                    console.log(result, 'result ito');
                                    if (result.message === "Successfully updated account information.") {
                                        alert(result.message);
                                        this.props.navigation.navigate('ProfilePage');
                                    }
                                }).catch((error) => {
                                    console.log(`error = ${error}`);
                                });
                            }}
                        >
                            <Text>Save</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        );
    };

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

    console.log(params)
    console.log(uid)
    try {
        let response = await fetch(apiUpdateProfile + uid, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    }
}

const styles = StyleSheet.create(
    {
        headerStyle: {
            height: 150,
            backgroundColor: "#5fb650",
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
        },
        itemStyle: {
            padding: 5,
        },
        profileInfo: {
            flex: 4,
            marginTop: 20,
        },
        itemLabel: {
            color: "#000000",

        },
        itemInfo: {
            color: "#214021",
            fontSize: 16
        },
        labelNickname: {
            alignSelf: "center",
            color: "#fff",
            fontWeight: "bold"
        },
        labelUserID: {
            alignSelf: "center",
            color: "#fff",
            fontSize: 14
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
        }
    }
)