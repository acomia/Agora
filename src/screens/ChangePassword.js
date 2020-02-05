import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { Container, Button, Text, Left, Item, Input, Label, Icon } from 'native-base'
import Spinner from 'react-native-spinkit'
import Modal from 'react-native-modal'

export default class ChangePassword extends React.Component {

    constructor() {
        super();
        this.state = { new_PW: '', confirm_PW: '', isLoading: false }
    }

    CHANGE_PW() {

        if (this.state.new_PW !== this.state.confirm_PW) {
            return alert('Password does not match!')
        }
        this.setState({ isLoading: true })
        const { OTP_CODE, EMAIL_ADD } = this.props.navigation.state.params
        // var ver_CODE = this.props.navigation.getParam('OTP_CODE')
        // var email_ADD = this.props.navigation.getParam('EMAIL_ADD')
        fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/member/forgotpassword/changepassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                verification_code: OTP_CODE,
                email_address: EMAIL_ADD,
                new_password: this.state.new_PW
            })
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        if (data.error_message === 'Successfully updated.') {
                            this.setState({ isLoading: false })
                            this.props.navigation.navigate('LoginPage')
                        } else {
                            this.setState({ visibleModal: true, isLoading: false })
                        }
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }

    render() {
        return (
            // <KeyboardAvoidingView style={styles.topContent} behavior="padding">
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <Image
                        style={{ width: 100, height: 100, margin: 30 }}
                        source={require('../../assets/images/forgot_pw.png')}
                        resizeMode='center' />
                    <Label style={styles.chagePasswordText}>Change Password</Label>
                    <Label style={{ textAlign: 'center', margin: 30 }}>Please enter your new password</Label>
                </View>
                <View style={styles.bottomContent}>
                    <Item floatingLabel>
                        <Icon name='md-lock' />
                        <Label>New password</Label>
                        <Input
                            value={this.state.new_PW}
                            onChangeText={new_PW => this.setState({ new_PW })}
                            secureTextEntry
                        />
                    </Item>
                    <Item floatingLabel style={styles.formStyle}>
                        <Icon name='md-lock' />
                        <Label>Confirm new password</Label>
                        <Input
                            value={this.state.confirm_PW}
                            onChangeText={confirm_PW => this.setState({ confirm_PW })}
                            secureTextEntry
                        />
                    </Item>
                    <Button block rounded info onPress={() => this.CHANGE_PW()}>
                        {this.state.isLoading ? <Spinner color={'#fff'} size={60} type={'ThreeBounce'} /> :
                            <Text style={{ fontSize: 18 }}>S U B M I T</Text>
                        }
                    </Button>
                </View>
                <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.textModalStyle, { color: 'red' }]}>Oops! </Text>
                        <Text style={[styles.textModalStyle, { margin: 5 }]}>unable to reset your password</Text>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../../assets/images/database_error.png')}
                            resizeMode='center' />
                    </View>
                    <View style={{ backgroundColor: 'white' }}>
                        <TouchableOpacity onPress={() => this.setState({ visibleModal: false })}>
                            <View style={styles.buttonModal}>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>O K A Y</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    chagePasswordText: {
        color: '#5fb650',
        fontSize: 30,
        fontWeight: 'bold'
    },
    formStyle: {
        marginVertical: 20
    },
    topContent: {
        height: '50%',
        // padding: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomContent: {
        height: '50%',
        paddingHorizontal: 20,
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
        fontSize: 20,
        fontWeight: 'bold',
    }
})