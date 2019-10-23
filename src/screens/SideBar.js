import React from 'react'
import { StyleSheet, View, Dimensions, Image, TouchableNativeFeedback, ImageBackground } from 'react-native'
import { Container, Header, Text, Icon, Left, Right, Body, ListItem } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerActions } from 'react-navigation-drawer';

export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Header span style={{ paddingLeft: 0, paddingRight: 0, }}>
                    <ImageBackground source={require('../../assets/images/drawer-header-background.jpg')} style={styles.backgroundImage}>
                        <Text></Text>
                    </ImageBackground>
                </Header>
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('MembersPage')}>
                    <ListItem icon style={styles.listItemStyle}>
                        <Left>
                            <Icon active name="ios-person" style={styles.listStyle} />
                        </Left>
                        <Body style={styles.listLabel}>
                            <Text style={styles.listStyle}>Member Profiles</Text>
                        </Body>
                    </ListItem>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('IntellimapPage')}>
                    <ListItem icon style={styles.listItemStyle}>
                        <Left>
                            <Icon active name="md-map" />
                        </Left>
                        <Body style={styles.listLabel}>
                            <Text>IntelliMap</Text>
                        </Body>
                    </ListItem>
                </TouchableNativeFeedback>
                {/* <ListItem icon style={styles.listItemStyle}>
                    <Left>
                        <Icon active name="ios-paper" />
                    </Left>
                    <Body style={styles.listLabel}>
                        <Text>Request ERCS1</Text>
                    </Body>
                </ListItem>
                <ListItem icon style={styles.listItemStyle}>
                    <Left>
                        <Icon active name="ios-paper" />
                    </Left>
                    <Body style={styles.listLabel}>
                        <Text>Request ERCS2</Text>
                    </Body>
                </ListItem> */}
                <ListItem icon style={styles.listItemStyle}>
                    <Left style={styles.listLabel}>
                        <Icon active name="ios-search" />
                    </Left>
                    <Body style={styles.listLabel}>
                        <Text>Find Medical Provider</Text>
                    </Body>
                </ListItem>
                {/* <ListItem icon style={styles.listItemStyle}>
                    <Left>
                        <Icon active name="ios-cash" />
                    </Left>
                    <Body style={styles.listLabel}>
                        <Text>Reimbursement</Text>
                    </Body>
                </ListItem> */}
            </Container>

        );
    };
}

const styles = StyleSheet.create(
    {
        listItemStyle: {
            marginTop: 20,
            borderBottomColor: "#2d2d2d",
        },
        listStyle: {
            color: '#2d2d2d',
        },
        listLabel: {
            borderBottomColor: "#fff",
        },
        backgroundImage: {
            flex: 1,
            resizeMode: "stretch",
        },
    }
)