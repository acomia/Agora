import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Button, Text, Left, Body, Label, Item, Picker } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';

const apiUpdateProfile = 'http://52.230.122.226:3000/api/v1/updateAccountInfo/';

export default class EditProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            gender: '',
            id: '',
        }
    }

    render() {
        const { first_name, last_name, gender, email, birth_date, id } = this.props.navigation.state.params;

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
                                    onChangeText={(first_name) => { this.setState({ first_name: first_name }) }}>
                                    {first_name}
                                </Input>
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Label style={styles.itemLabel}>Last Name</Label>
                            </Left>
                            <Body style={{ alignItems: 'flex-end', flex: 3 }}>
                                <Input style={styles.itemInfo}
                                    autoCapitalize
                                    onChangeText={last_name => this.setState({ last_name })}
                                >{last_name}
                                </Input>
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Label style={styles.itemLabel}>Gender</Label>
                            </Left>

                            <Body style={{ alignItems: 'flex-end', flex: 3 }}>
                                <Item picker>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        style={{ height: 50, width: 100 }}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })
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
                            <Body style={{ alignItems: 'flex-end', flex: 3 }}>
                                <Text style={styles.itemInfo}>{birth_date}</Text>
                            </Body>
                        </Item>
                    </View>
                    <View>
                    </View>
                    <View style={{ flex: 1 }}>

                        <Button rounded success block style={{ marginHorizontal: 20, marginTop: 20 }}
                            onPress={() => {
                                let params = {
                                    first_name: this.state.first_name,
                                    last_name: this.state.last_name,
                                    gender: this.state.gender
                                };
                                updateProfile(params, id).then((result) => {
                                    console.log(result, 'result ito');
                                    if (result.message === "Successfully updated account information.") {
                                        alert(result.message);
                                        this.props.navigation.navigate('DashboardPage');
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

async function updateProfile(params, id) {

    try {
        let response = await fetch(apiUpdateProfile + id, {
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
        }
    }
)