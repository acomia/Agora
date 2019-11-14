import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  Left,
  Right,
  Body,
  Label,
  ListItem,
  Thumbnail,
  Item,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export default class Profile extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.header}>
          <View style={{flex: 1, justifyContent: "center"}}>
            <Thumbnail
              large
              style={{alignSelf: 'center'}}
              source={require('../../assets/images/sample-image-circle.png')}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 2, justifyContent: "center", paddingLeft: 10}}>
            <Label style={styles.labelNickname}>Frederick</Label>
            <Label style={styles.labelUserID}>User ID: 123456</Label>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Full name</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>Frederick Serafino</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Gender</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>Male</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Birth date</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>07/11/1994</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Email</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>sample@email.com</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Intellicare Account No.</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>80-00-00000-00000-00</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Intellicare Card No.</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>11950000092817266</Text>
            </Body>
          </Item>
        </View>
        <View style={{flex: 1}}>
          <Button bordered success block style={{marginHorizontal: 20}}>
            <Text>Edit Profile</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#5fb650',
    paddingHorizontal: 70,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentStyle: {
    paddingVertical: 50,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  headerStyle: {
    height: 150,
    backgroundColor: '#5fb650',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  itemStyle: {
    padding: 20,
  },
  profileInfo: {
    flex: 4,
  },
  itemLabel: {
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  itemInfo: {
    color: '#b2bec3',
  },
  labelNickname: {
    color: '#fff',
    fontWeight: 'bold',
  },
  labelUserID: {
    color: '#fff',
    fontSize: 14,
  },
});
import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Header, Button, Text, Left, Right, Body, Label, Thumbnail, ListItem } from 'native-base'
import ImagePicker from "react-native-image-picker"

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
            isLoading: true
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

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

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
        }
    }
)
