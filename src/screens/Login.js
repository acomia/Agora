import React from 'react'
import { StyleSheet, View, Dimensions, Image, ImageBackground, StatusBar } from 'react-native'
import { Container, Button, Text, Form, Item, Input, Label, Header, Left, Body, Right, Icon, Title } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';



export default class Login extends React.Component {
    constructor() {
        super();
        global.loginToken = ''
    }
    state = {
        username: "",
        password: ""
    }
    render() {
        return (
            <Container>
                <StatusBar translucent backgroundColor="transparent" />
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Sign in</Text>
                    </View>
                    <View style={styles.contentStyle}>
                        <View style={styles.companyLogo}>
                            <Image source={require('../../assets/images/intellicarelogo.png')} style={styles.imageStyle} resizeMode='contain' />
                            <Label style={styles.fullertonLabel}>A Member of Fullerton Health</Label>
                        </View>
                        <View style={styles.loginForm}>
                            <Form>
                                <Item floatingLabel>
                                    <Label >Username</Label>
                                    <Input
                                        style={styles.labelStyle}
                                        onChangeText={(username) => this.setState({ username })} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Password</Label>
                                    <Input
                                        secureTextEntry
                                        style={styles.labelStyle}
                                        onChangeText={(password) => this.setState({ password })} />
                                </Item>
                            </Form>
                            <Text style={styles.ForgotPasswordLink} onPress={() => this.props.navigation.navigate('ForgotPasswordPage')}>
                                Forgot Password?
                            </Text>
                            <Button rounded block success style={{ marginTop: 50 }} onPress={() => this.props.navigation.navigate('Dashboard')}>
                                <Text>Login</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    };
    _getRequest() {
        fetch('http:192.168.1.104:3005/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',

            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        alert(JSON.stringify(data.key))
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }

    _postRequest() {
        fetch('http:192.168.9.104:3005/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        alert(JSON.stringify(data.message))
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }

    _postUser() {
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
            // "username":"digitalxform",
            // "password":"th2p@ssw0rd"

        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (data.message === 'Success!') {
                            global.loginToken = data.response.token
                            this.props.navigation.navigate('DashboardPage')
                        } else {
                            alert('Username not found!')
                        }
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }

}


export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create(
    {
        containerStyle: {
            flex: 1,

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
        loginForm: {
            padding: 10,
            paddingHorizontal: 30,
        },
        companyLogo: {
            padding: 20,
            justifyContent: "center"
        },
        imageStyle: {
            height: height * 0.10,
            width: width * 0.50,
            alignSelf: "center",
        },
        fullertonLabel: {
            color: '#273c75',
            fontWeight: "bold",
            fontSize: 12,
            alignSelf: "center"
        },
        labelStyle: {
            marginBottom: 5,
        },
        footerText: {
            textAlign: "center",
            fontSize: 12,
        },
        buttonBack: {
            color: "#2d2d2d",
            width: 30,
            height: 30
        },
        ForgotPasswordLink: {
            color: '#3498db',
            fontSize: 12,
            alignSelf: "flex-end",
            marginTop: 10
        }
    }
)