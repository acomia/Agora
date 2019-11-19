import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Header, Button, Text, Left, Right, Body, Label, Thumbnail, ListItem } from 'native-base'
import ImagePicker from "react-native-image-picker"
import Spinner from 'react-native-spinkit';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

const ACCESS_TOKEN = 'access_token';
const MEMBER_ID = 'member_id';

export default class Profile extends React.Component {

    state = { dataSource: [] }

    constructor(props) {
        super(props)
        this.state = {
            photo: null,
            dataSource: [],
            isLoading: true,
        }
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response });
            }
        });
    };

    async componentDidMount() {

        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        let userID = await AsyncStorage.getItem(MEMBER_ID);
        const response = await fetch('http://52.230.122.226:3000/api/v1/getUserInfo/' + userID, {
            method: 'GET',
            headers: {
                'authorization': 'token ' + token,
            }
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                alert('Error!' + error)
            })
        const json = await response.json();
        this.setState({
            isLoading: false,
            dataSource: [json],
        });
    }
    onUser = (item) => {
        this.props.navigation.navigate('EditProfilePage', item)
    }

    renderItem = ({ item }) => {

        const { photo } = this.state;

        return (
            <Container>
                <Header span style={styles.headerStyle}>
                    <Body style={{ justifyContent: "center" }}>
                        {photo && (
                            <Thumbnail large style={{ alignSelf: "center" }} source={{ uri: photo.uri }} resizeMode='contain' />
                        )}
                        <Label style={styles.labelNickname}>{item.first_name} {item.last_name}</Label>
                    </Body>
                </Header>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ListItem >
                        <Left><Label>Fullname</Label></Left>
                        <Right style={{ flex: 1 }}>
                            <Text>{item.first_name} {item.last_name}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left><Label>Gender</Label></Left>
                        <Right style={{ flex: 1 }}>
                            <Text >{item.gender}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left><Label>Birth Date</Label></Left>
                        <Right style={{ flex: 1 }}>
                            <Text>{item.birth_date}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left style={{ flex: 1 }}><Label>Email</Label></Left>
                        <Right style={{ flex: 3 }}>
                            <Text>{item.email}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left><Label>Account No.</Label></Left>
                        <Right style={{ flex: 1 }}>
                            <Text>{item.account_no}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left><Label>Card No.</Label></Left>
                        <Right style={{ flex: 1 }}>
                            <Text>{item.card_no}</Text>
                        </Right>
                    </ListItem>

                    <View style={{ bottom: 10 }}>
                        <Button rounded success block style={{ marginHorizontal: 20, marginTop: 20 }} onPress={() => this.onUser(item)}>
                            <Text>Edit Profile</Text>
                        </Button>
                        <Button rounded success block style={{ marginHorizontal: 20, marginTop: 20 }} onPress={this.handleChoosePhoto} >
                            <Text>Choose Photo</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        );
    };
    render() {
        { console.log('member', this.state) }

        const { spinnerStyle, spinnerTextStyle } = styles
        if (this.state.isLoading) {
            return (
                <View style={spinnerStyle}>
                    <Spinner
                        color={'green'}
                        size={50}
                        type={'ChasingDots'}
                    />
                    <Text style={spinnerTextStyle}>Loading...</Text>
                </View>
            )
        }

        return (
            <View style={StyleSheet.container}>
                <FlatList
                    roundAvatar
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                />
            </View>
        );
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
            padding: 20,
            borderWidth: 1,
            borderColor: "green"
        },
        profileInfo: {
            flex: 4,
            marginTop: 20,
        },
        itemLabel: {
            color: "#2d2d2d",
            borderWidth: 2,
            borderColor: "blue"
        },
        itemInfo: {
            color: "#b2bec3",
            fontSize: 16,
            borderWidth: 2
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