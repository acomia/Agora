import React from 'react'
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Label, ListItem, Thumbnail, Item, Title, List, Badge } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';

export default class Members extends React.Component {

    render() {
        return (
            <Container style={{ backgroundColor: "#f5f5f5" }}>
                {/* <Header style={styles.headerStyle}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{ color: "#2d2d2d" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#2d2d2d" }}>Account Profiles</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header> */}
                <ScrollView>
                    <Content>
                        <List style={styles.listStyle}>
                            <ListItem thumbnail style={styles.listItemMember} onPress={() => this.props.navigation.navigate('MemberInfoPage')}>
                                <Left>
                                    <Thumbnail source={require('../../assets/images/sample-image-square.jpg')} />
                                </Left>
                                <Body style={{ borderBottomWidth: 0 }}>
                                    <View style={styles.viewNameBadge}>
                                        <Text style={styles.listFullname}>Frederick Serafino</Text>
                                        <Badge style={styles.badgeStyle}>
                                            <Text style={styles.badgeText}>Principal</Text>
                                        </Badge>
                                    </View>
                                    <Text note style={styles.listAccountNote}>80-00-00000-00000-00/1</Text>
                                    <Text>ACTIVE</Text>
                                </Body>
                            </ListItem>
                            <ListItem thumbnail style={styles.listItemMember}>
                                <Left>
                                    <Thumbnail source={require('../../assets/images/user.png')} />
                                </Left>
                                <Body style={{ borderBottomWidth: 0 }}>
                                    <View style={styles.viewNameBadge}>
                                        <Text style={styles.listFullname}>John Doe</Text>
                                        <Badge style={styles.badgeStyle}>
                                            <Text style={styles.badgeText}>Dependent</Text>
                                        </Badge>
                                    </View>
                                    <Text note style={styles.listAccountNote}>80-00-00000-00000-01/1</Text>
                                    <Text>DISAPPROVED</Text>
                                </Body>
                            </ListItem>
                            <ListItem thumbnail style={styles.listItemMember}>
                                <Left>
                                    <Thumbnail source={require('../../assets/images/user.png')} />
                                </Left>
                                <Body style={{ borderBottomWidth: 0 }}>
                                    <View style={styles.viewNameBadge}>
                                        <Text style={styles.listFullname}>Jane Doe</Text>
                                        <Badge style={styles.badgeStyle}>
                                            <Text style={styles.badgeText}>Dependent</Text>
                                        </Badge>
                                    </View>
                                    <Text note style={styles.listAccountNote}>80-00-00000-00000-02/1</Text>
                                    <Text>DISAPPROVED</Text>
                                </Body>
                            </ListItem>
                        </List>
                    </Content>
                </ScrollView>

            </Container>
        );
    };
}

const styles = StyleSheet.create(
    {
        headerStyle: {
            backgroundColor: "#fff",
            marginBottom: 10,
        },
        badgeStyle: {
            justifyContent: "center",
            borderRadius: 5,
            backgroundColor: "#fff",
            borderColor: "#c4c4c4",
            borderWidth: 1,
        },
        badgeText: {
            color: "#c4c4c4",
            fontStyle: "italic"
        },
        listStyle: {
            backgroundColor: "#fff",
        },
        listItemMember: {
            marginLeft: 0,
            paddingHorizontal: 20,
            borderBottomWidth: 0.50,
            borderBottomColor: "#c4c4c4"
        },
        listFullname: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#5fb650"
        },
        listAccountNote: {
            fontSize: 16,
        },
        viewNameBadge: {
            flexDirection: "row",
            flex: 1
        }

    }
)