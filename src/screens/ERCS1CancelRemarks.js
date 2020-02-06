import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { Container, Button, Textarea, Icon } from 'native-base'
import { StackActions, NavigationActions } from 'react-navigation';
import Spinner from 'react-native-spinkit';
import AsyncStorage from '@react-native-community/async-storage';

const ACCESS_TOKEN = 'access_token'; 

const resetAction = StackActions.reset({
    index: 0, // <-- currect active route from actions array
    key: null,
    actions: [NavigationActions.navigate({ routeName: 'ERCS1LandingPage' })],
});

export default class ERCSCancelRemarks extends React.Component {
    constructor(props) {
        super(props)
        this.state = { remarks: '', isLoading: false }
    }

    async _cancelRCS() {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        const { navigation } = this.props;
        const { details_acctno, details_rcsno, details_rcsid } = navigation.state.params
        this.setState({ isLoading: true });
        fetch(
            'https://intellicare.com.ph/uat/webservice/memberprofile/api/ercs/cancel',
            {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    acctno: details_acctno,
                    ercsno: details_rcsno,
                    ercs_id: details_rcsid,
                    remarks: this.state.remarks,
                }),
            },
        )
            .then(response => {
                response.json().then(data => {
                    if (data.is_success === true) {
                        this.setState({ isLoading: false });
                        this.props.navigation.dispatch(resetAction);
                    } else {
                        this.setState({ isLoading: false });
                        alert(data.error_message);
                    }
                });
            })
            .catch(error => {
                alert('Error!' + error);
            });
    }

    render() {
        return (
            <Container>
                <View style={{ justifyContent: 'center', padding: 20 }}>
                    {/* <Icon type="MaterialCommunityIcons"
                        name="file-document-box-multiple-outline"
                        color="#c4c4c4"
                        style={{ alignSelf: 'center', fontSize: 50, marginVertical: 20 }} /> */}
                    <Image
                        source={require('../../assets/images/rcs_remark.png')}
                        style={styles.imageStyle}
                        resizeMode="contain"
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6d6e72', marginVertical: 20 }}>Please provide your reason for cancellation</Text>
                    <Textarea
                        rowSpan={6}
                        bordered
                        placeholder="Reason"
                        style={{ marginVertical: 20 }}
                        value={this.state.remarks}
                        onChangeText={(remarks) => this.setState({ remarks })} />
                    <Button block info
                        onPress={() => this._cancelRCS()}
                        style={{ marginVertical: 10 }}>
                        {this.state.isLoading ? (
                            <Spinner color={'#e74c3c'} size={60} type={'ThreeBounce'} />
                        ) : (
                                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Submit</Text>
                            )
                        }
                    </Button>
                    <Button block warning onPress={() => this.props.navigation.goBack()}>
                        <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                            Cancel
                        </Text>
                    </Button>
                </View>
            </Container>
        )
    }
}
export const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#ffff',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    imageStyle: {
        height: height * 0.2,
        width: width * 0.3,
        alignSelf: 'center',
    },
})