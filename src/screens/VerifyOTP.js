import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { Button } from 'native-base'
// import OTPInputView from '@twotalltotems/react-native-otp-input'
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'
import OTPTextView from 'react-native-otp-textinput'
import Spinner from 'react-native-spinkit'

const SCREEN_WIDTH = Dimensions.get('window').width

export default class VerifyOTP extends React.Component {

    constructor() {
        super()
        this.state = { verification_CODE: '', registration_MEMBID: '', visibleModal: null, isLoading: false }
    }

    VALIDATE_FORGOT_PW() {
        this.setState({ isLoading: true })
        var FPW_EMAILADD = this.props.navigation.getParam('emailAddress')
        fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/verification/forgotpassword/validate', {
            method: 'GET',
            headers: {
                EmailAddress: FPW_EMAILADD,
                VerificationCode: this.state.verification_CODE
            }
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        if (data.error_message === 'Verification Code is Valid!') {
                            this.setState({ isLoading: false, verification_CODE: '' })
                            this.props.navigation.navigate('ChangePassword', {
                                OTP_CODE: this.state.verification_CODE,
                                EMAIL_ADD: FPW_EMAILADD
                            })
                        } else {
                            alert('Error validating otp!')
                        }
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    VALIDATE_REGISTRATION() {
        this.setState({ isLoading: true })
        var REG_EMAILADD = this.props.navigation.getParam('emailAddress')
        fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/verification/register/validate', {
            method: 'PUT',
            headers: {
                EmailAddress: REG_EMAILADD,
                VerificationCode: this.state.verification_CODE
            }
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        if (data.error_message === 'Verification Code is Valid!') {
                            this.setState({ visibleModal: 1, isLoading: false, verification_CODE: '' })
                        } else {
                            alert('Error validating otp!')
                            this.setState({ isLoading: false, verification_CODE: '' })
                        }
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    REG_SUCCESS_VAL() {
        this.setState({ visibleModal: null, verification_CODE: '' })
        this.props.navigation.navigate('LoginPage')
    }
    RESEND_OTP() {
        const { navigation } = this.props
        const { routeAddress, emailAddress, f_NAME, l_NAME } = navigation.state.params
        var routeLocation = navigation.getParam('routeAddress')
        // var FPW_EMAILADD = this.props.navigation.getParam('emailAddress')

        if (routeAddress === 'forgot_PW') {
            fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/verification/forgotpassword/send?postedfrom=mobile', {
                method: 'PUT',
                headers: {
                    EmailAddress: emailAddress
                }
            })
                .then(response => {
                    response.json()
                        .then((data) => {
                            if (data.error_message === 'Successfully generate verification code.') {
                                this.setState({ visibleModal: 2 })
                            } else {
                                alert('error')
                            }
                        })
                })
                .catch((error) => {
                    alert('Error!' + error)
                })
        } else {
            fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/verification/register/send?postedfrom=mobile&firstname=' + f_NAME + '&lastname=' + l_NAME, {
                method: 'PUT',
                headers: {
                    EmailAddress: emailAddress
                }
            })
                .then(response => {
                    response.json()
                        .then((data) => {
                            if (data.error_message === 'Successfully generate verification code.') {
                                this.setState({ visibleModal: 2 })
                            } else {
                                alert('error')
                            }
                        })
                })
                .catch((error) => {
                    alert('Error!' + error)
                })
        }

    }
    PROCESS_OTP() {
        const { navigation } = this.props
        var routeLocation = navigation.getParam('routeAddress')
        switch (routeLocation) {
            case 'forgot_PW':
                return this.VALIDATE_FORGOT_PW()
                break
            case 'registration':
                return this.VALIDATE_REGISTRATION()
                break
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <Text style={{ fontSize: 30, color: '#5fb650' }}>Enter Verification Code</Text>
                    <Image
                        style={{ width: 120, height: 120 }}
                        source={require('../../assets/images/email_verification.png')}
                        resizeMode='center' />
                    <Text style={styles.enterOTP}>Enter OTP</Text>
                    <Text style={{ fontSize: 16, color: '#5fb650' }}>We have send OTP on your email</Text>
                </View>
                <View style={styles.bottomContent}>
                    <OTPTextView
                        containerStyle={styles.textInputContainer}
                        handleTextChange={text => this.setState({ verification_CODE: text })}
                        textInputStyle={styles.roundedTextInput}
                        tintColor='#03DAC6'
                        offTintColor='#DCDCDC'
                        inputCount={6}
                    />
                    <TouchableOpacity onPress={() => this.RESEND_OTP()}>
                        <View>
                            <Text style={styles.resendOTP}>Resend OTP</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.PROCESS_OTP()}>
                        <View style={styles.button}>
                            {this.state.isLoading ? <Spinner color={'#5fb650'} size={60} type={'ThreeBounce'} /> :
                                <Text style={styles.verifyText}>V E R I F Y</Text>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal isVisible={this.state.visibleModal === 1}
                    onSwipeComplete={() => this.REG_SUCCESS_VAL()}
                    swipeDirection='up'
                    animationOut='slideOutDown'>
                    <View style={{ justifyContent: 'center' }}>
                        <View style={styles.tyModal}>
                            <Text style={styles.tyTextModal}>Thank you for registering with us.</Text>
                            <Text style={styles.tyTextModal}>Please give us time to verify your identity</Text>
                            <Text style={styles.tyTextModal}>Within 48-hours, we will send a confirmation link to your email so that you can enjoy the services we offer in this App.</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: '#fff', alignSelf: 'center', margin: 10 }}>Swipe up to continue...</Text>
                    </View>
                </Modal>
                <Modal isVisible={this.state.visibleModal === 2} style={styles.bottomModal}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.textModalStyle, { margin: 5 }]}>We have send new OTP on your email</Text>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../../assets/images/email_sent.png')}
                            resizeMode='center' />
                    </View>
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 4 }}>
                        <Button block rounded success onPress={() => this.setState({ visibleModal: null })}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>O K A Y</Text>
                        </Button>
                    </View>
                </Modal>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#5fb650'
    },
    enterOTP: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5fb650',
    },
    resendOTP: {
        color: 'white',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    verifyText: {
        fontWeight: 'bold',
        color: '#5fb650',
        fontSize: 20
    },
    topContent: {
        height: '60%',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        elevation: 2,
    },
    bottomContent: {
        height: '40%',
        backgroundColor: '#5fb650',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: 'white',
        padding: 12,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        width: SCREEN_WIDTH * 0.8
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
    },
    tyTextModal: {
        fontSize: 20,
        color: '#5fb650',
        textAlign: 'center',
        margin: 10
    },
    tyModal: {
        padding: 30,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#5fb650',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    textInputContainer: {
        marginBottom: 20,
    },
    roundedTextInput: {
        borderWidth: 0,
        borderBottomWidth: 2
    },
})