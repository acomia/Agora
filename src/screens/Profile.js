import React from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Label, ListItem, Thumbnail, Item } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';

export default class Profile extends React.Component {

    render() {
        return (
            <Container>
                <Header span style={styles.headerStyle}>
                    {/* <Left>
                        <Button transparent >
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                    </Left> */}
                    <Body style={{ justifyContent: "center" }}>
                        <Thumbnail large style={{ alignSelf: "center" }} source={require('../../assets/images/sample-image-circle.png')} resizeMode='contain' />
                        <Label style={styles.labelNickname}>Frederick</Label>
                        <Label style={styles.labelUserID}> User ID: 123456</Label>
                    </Body>
                </Header>
                <View style={styles.profileInfo}>
                    <Item style={styles.itemStyle}>
                        <Left>
                            <Label style={styles.itemLabel}>Full name</Label>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.itemInfo} >Frederick Serafino</Text>
                        </Body>
                    </Item>
                    <Item style={styles.itemStyle}>
                        <Left>
                            <Label style={styles.itemLabel}>Gender</Label>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.itemInfo} >Male</Text>
                        </Body>
                    </Item>
                    <Item style={styles.itemStyle}>
                        <Left>
                            <Label style={styles.itemLabel}>Birth date</Label>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.itemInfo} >07/11/1994</Text>
                        </Body>
                    </Item>
                    <Item style={styles.itemStyle}>
                        <Left>
                            <Label style={styles.itemLabel}>Email</Label>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.itemInfo} >sample@email.com</Text>
                        </Body>
                    </Item>
                    <Item style={styles.itemStyle}>
                        <Left>
                            <Label style={styles.itemLabel}>Intellicare Account No.</Label>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.itemInfo}>80-00-00000-00000-00</Text>
                        </Body>
                    </Item>
                    <Item style={styles.itemStyle}>
                        <Left>
                            <Label style={styles.itemLabel}>Intellicare Card No.</Label>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.itemInfo}>11950000092817266</Text>
                        </Body>
                    </Item>
                </View>
                <View style={{ flex: 1 }}>
                    <Button bordered success block style={{ marginHorizontal: 20 }} >
                        <Text>Edit Profile</Text>
                    </Button>
                </View>
            </Container>
        );
    };
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
        },
        profileInfo: {
            flex: 4,
            marginTop: 20,
        },
        itemLabel: {
            color: "#2d2d2d",
            fontWeight: "bold"
        },
        itemInfo: {
            color: "#b2bec3"
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