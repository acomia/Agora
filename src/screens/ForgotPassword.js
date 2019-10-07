import React from 'react'
import { StyleSheet, View, Dimensions, Image, ImageBackground } from 'react-native'
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Title, Form, Item, Input, Label, DatePicker } from 'native-base'


export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);

    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    render() {
        return (
            <Container>
                <View style={styles.viewForm}>
                    <Label style={styles.labelPassword}>Provide the following:</Label>
                    <View style={styles.formPassword}>
                        
                        <Item floatingLabel style={styles.formStyle}>
                            <Label>Username</Label>
                            <Input style={styles.labelStyle} />
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
                        <Item floatingLabel style={styles.formStyle}>
                            <Label>Email Address</Label>
                            <Input style={styles.labelStyle} />
                        </Item>
                    </View>
                </View>
            </Container>
        );
    };
}

const styles = StyleSheet.create(
    {
        formPassword: {
            paddingHorizontal: 10,
        },
        inputPassword: {
            marginHorizontal: 10,
        },
        labelPassword: {
            fontSize: 25,
            fontWeight: "bold",
            margin: 10,
            color: "#5fb650"
        },
        goIcon: {
            margin: 10,
            color: "#2ecc71"
        },
        labelStyle: {
            marginBottom: 5,
        },
        formStyle: {
            marginBottom: 20,
        },
        viewForm: {
            flex: 1,
            padding: 10,
        },

    }
)