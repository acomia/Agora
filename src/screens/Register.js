import React from 'react'
import { StyleSheet, View, Dimensions, Image, StatusBar } from 'react-native'
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Title, Form, Item, Input, Label, Picker, DatePicker } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected2: undefined
        };

        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
    }

    onValueChange2(value: string) {
        this.setState({
            selected2: value
        });
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    render() {
        return (
            <Container>
                <StatusBar translucent backgroundColor="transparent" />
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Create an account</Text>
                    </View>
                    <View style={styles.contentStyle}>
                        <View style={styles.viewForm}>
                            <View style={styles.formInfo}>
                                <Text style={styles.headerText}>Personal Information</Text>
                                <Item floatingLabel style={styles.formStyle}>
                                    <Label>First name</Label>
                                    <Input style={styles.labelStyle} />
                                </Item>
                                <Item floatingLabel style={styles.formStyle}>
                                    <Label>Middle name</Label>
                                    <Input style={styles.labelStyle} />
                                </Item>
                                <Item floatingLabel style={styles.formStyle}>
                                    <Label>Last name</Label>
                                    <Input style={styles.labelStyle} />
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
                                            selectedValue={this.state.selected2}
                                            onValueChange={this.onValueChange2.bind(this)}>
                                            <Picker.Item label="Male" value="male" />
                                            <Picker.Item label="Female" value="female" />
                                        </Picker>
                                    </Item>
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
                            </View>
                        </View>
                        <View style={styles.viewForm}>
                            <View style={styles.formInfo}>
                                <Text style={styles.headerText}>Account Information</Text>
                                <Item floatingLabel style={styles.formStyle}>
                                    <Label>Intellicare Account No.</Label>
                                    <Input style={styles.labelStyle} />
                                </Item>
                                <Item floatingLabel style={styles.formStyle}>
                                    <Label>Intellicare Card No.</Label>
                                    <Input style={styles.labelStyle} />
                                </Item>
                                <Item floatingLabel style={styles.formStyle}>
                                    <Label>Username/Email Address</Label>
                                    <Input style={styles.labelStyle} />
                                </Item>
                                <Item floatingLabel style={styles.formStyle}>
                                    <Label>Password</Label>
                                    <Input style={styles.labelStyle} />
                                </Item>
                                <Item floatingLabel style={styles.formStyle}>
                                    <Label>Confirm Password</Label>
                                    <Input style={styles.labelStyle} />
                                </Item>
                                <Item floatingLabel style={styles.formStyle}>
                                    <Label>Mobile No.</Label>
                                    <Input style={styles.labelStyle} />
                                </Item>
                            </View>
                        </View>
                        <View style={styles.viewButtonSignUp}>
                            <Button block rounded info>
                                <Text>Sign Up</Text>
                            </Button>
                        </View>
                    </View>

                </ScrollView>
            </Container>
        );
    };
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

