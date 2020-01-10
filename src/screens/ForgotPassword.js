import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { Container, Button, Text, Left, Item, Input, Label, Icon } from 'native-base'
// import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal'

export default class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = { email_add: '', visibleModal: false }
    }

    RESET_PW() {
        fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/verification/forgotpassword/send?postedfrom=mobile', {
            method: 'PUT',
            headers: {
                EmailAddress: this.state.email_add
            },
            // params: {
            //     postedfrom: 'mobile'
            // }
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        if (data.error_message === 'Successfully generate verification code.') {
                            this.props.navigation.navigate('VerifyOTP', {
                                routeAddress: 'forgot_PW',
                                emailAddress: this.state.email_add
                            })
                        } else {
                            this.setState({ visibleModal: true })
                        }
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }

    render() {
        return (
            // <KeyboardAvoidingView
            //     style={styles.topContent}
            //     behavior="padding"
            // >
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../../assets/images/forgot_pw.png')}
                        resizeMode='center' />
                    <Label style={styles.forgotPWText}>Forgot Password?</Label>
                    <Label style={{ textAlign: 'center' }}>We just need your registered email address to send your password reset code</Label>
                </View>
                <View style={styles.bottomContent}>
                    <Item floatingLabel style={styles.formStyle}>
                        <Icon active name='md-mail' />
                        <Label>Email Address</Label>
                        <Input
                            value={this.state.email_add}
                            onChangeText={email_add => this.setState({ email_add })}
                            autoCapitalize={false}
                        />
                    </Item>
                    <Button block rounded info onPress={() => this.RESET_PW()}>
                        <Text>RESET PASSWORD</Text>
                    </Button>
                </View>
                <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.textModalStyle, { color: 'red' }]}>Oops,</Text>
                        <Text style={[styles.textModalStyle, { margin: 5 }]}>unable to reset your password</Text>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../../assets/images/database_error.png')}
                            resizeMode='center' />
                    </View>
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 4 }}>
                        <Button block rounded warning onPress={() => this.setState({ visibleModal: false })}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>O K A Y</Text>
                        </Button>
                    </View>
                </Modal>
            </View>
        );
    };
}

const styles = StyleSheet.create(
    {
        forgotPWText: {
            color: '#5fb650',
            fontSize: 30,
            fontWeight: 'bold'
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
        formStyle: {
            marginVertical: 20,
        },
        container: {
            flex: 1,
            flexDirection: 'column',
        },
        topContent: {
            height: '50%',
            // padding: 20,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        bottomContent: {
            paddingHorizontal: 20
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            flexDirection: 'row'
        },
        bottomModal: {
            justifyContent: 'flex-end',
            margin: 0,
        },
        textModalStyle: {
            color: '#5fb650',
            fontSize: 16,
            fontWeight: 'bold',
        }
    }
)