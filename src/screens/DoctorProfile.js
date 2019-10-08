import React from 'react'
import { StyleSheet, View, Dimensions, Image, ImageBackground } from 'react-native'
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Label, ListItem, Thumbnail, Item, Accordion } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';

const dataArray = [
    { title: "Asian Hospital and Medical Center", content: "Room 101, MWF 9:00AM-12:00PM, (02) 902-3400 loc. 1001" },
    { title: "Makati Medical Center", content: "Room 101, MWF 9:00AM-12:00PM, (02) 902-3400 loc. 1001" },
    { title: "St. Luke's Medical Center - Global City", content: "Room 101, MWF 9:00AM-12:00PM, (02) 902-3400 loc. 1001" },
];


export default class DoctorProfile extends React.Component {

    render() {
        return (
            <Container>
                <Header span style={styles.headerStyle}>
                    <ImageBackground source={require('../../assets/images/intellicareheader.jpg')} style={styles.backgroundImage}>
                        <View style={styles.headerUser}>
                            <Thumbnail large source={require('../../assets/images/doctor-avatar.png')} resizeMode='contain' style={styles.avatarStyle} />
                            <Label style={styles.labelNickname}>Dr. Juan Dela Cruz</Label>
                        </View>
                        <View style={styles.headerDetails}>
                            <Label style={styles.labelHeaderDetails}>IM-Gastroenterologist</Label>
                            <Text style={styles.labelHeaderDetails}> | </Text>
                            <Text style={styles.labelHeaderDetails}>PRC No: </Text>
                            <Label style={styles.labelHeaderDetails}>123456</Label>
                        </View>
                    </ImageBackground>
                </Header>
                <ScrollView>
                    <View style={styles.doctorDescription}>
                        <ListItem icon>
                            <Left>
                                <Thumbnail small style={{ alignSelf: "center" }} source={require('../../assets/images/avatar.png')} resizeMode='contain' />
                            </Left>
                            <Body style={{ borderBottomWidth: 0 }}>
                                <Text style={styles.contentHeader}>Description</Text>
                            </Body>
                            <Right />
                        </ListItem>
                        <View style={styles.description}>
                            <Label style={styles.labelDescription}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Label>
                        </View>
                    </View>
                    <View style={styles.hospitalAccreditation}>
                        <ListItem icon>
                            <Left>
                                <Thumbnail small style={{ alignSelf: "center" }} source={require('../../assets/images/id-card.png')} resizeMode='contain' />
                            </Left>
                            <Body style={{ borderBottomWidth: 0 }}>
                                <Text style={styles.contentHeader}>Hospital Accreditation</Text>
                            </Body>
                            <Right />
                        </ListItem>
                        <View style={styles.accordion}>
                            <Accordion
                                dataArray={dataArray}
                                style={{ borderWidth: 0 }}
                                headerStyle={{ backgroundColor: "#fff", fontSize: 14, color: "#2d2d2d", padding: 10 }}
                                contentStyle={{ backgroundColor: "transparent", fontSize: 14, color: "#2d2d2d", paddingHorizontal: 20 }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    };
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create(
    {
        backgroundImage: {
            flex: 1,
            resizeMode: "stretch",
            justifyContent: "center"
        },
        headerStyle: {
            height: 200,
            backgroundColor: "#5fb650",
            paddingLeft: 0, paddingRight: 0,
        },
        headerUser: {
            alignItems: "center"
        },
        headerDetails: {
            flexDirection: "row",
            alignSelf: "center"
        },
        labelNickname: {
            alignSelf: "center",
            color: "#fff",
            fontWeight: "bold"
        },
        labelHeaderDetails: {
            alignSelf: "center",
            color: "#fff",
            fontSize: 14
        },
        doctorDescription: {
            marginTop: 30,
        },
        hospitalAccreditation: {
            marginTop: 30,
        },
        contentHeader: {
            color: "#5fb650"
        },
        description: {
            marginTop: 10,
            paddingHorizontal: 35,
            color: "#2d2d2d",
        },
        labelDescription: {
            textAlign: "justify",
            fontSize: 14,
        },
        accordion: {
            paddingHorizontal: 20,
        },
        avatarStyle: {
            marginBottom: 5
        }
    }
)