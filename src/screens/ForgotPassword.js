import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
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
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <Image
                        style={{ width: 100, height: 100, margin: 30 }}
                        source={require('../../assets/images/forgot_pw.png')}
                        resizeMode='center' />
                    <Label style={styles.forgotPWText}>Forgot Password?</Label>
                    <Label style={{ textAlign: 'center', margin: 30 }}>We just need your registered email address to send your password reset code</Label>
                    <Item floatingLabel style={styles.formStyle}>
                        <Icon active name='md-mail' />
                        <Input
                            value={this.state.email_add}
                            onChangeText={email_add => this.setState({ email_add })}
                            autoCapitalize={false}
                            placeholder="Email Address"
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
                    <View style={{ backgroundColor: 'white' }}>
                        <TouchableOpacity onPress={() => this.setState({ visibleModal: false })}>
                            <View style={styles.buttonModal}>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>O K A Y</Text>
                            </View>
                        </TouchableOpacity>
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
        goIcon: {
            margin: 10,
            color: "#2ecc71"
        },
        formStyle: {
            marginVertical: 20,
        },
        viewForm: {
            flex: 1,
            padding: 10,
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        viewButtonSignUp: {
            marginTop: 30,
            marginBottom: 20,
            marginHorizontal: 20,
        },
        container: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
        },
        topContent: {
            flex: 3,
            padding: 20,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        bottomContent: {
            flex: 2,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        buttonModal: {
            backgroundColor: '#5fb650',
            padding: 12,
            margin: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 16,
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
            fontSize: 18,
            fontWeight: 'bold',
        }
    }
)