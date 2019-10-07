import React from 'react'
import { StyleSheet, View, Dimensions, Image, TouchableOpacity, ImageBackground, Linking } from 'react-native'
import { Container, Text, Card, Header, Left, Right, Body, Title, Item, Label, Icon, Button, Content } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';


export default class MembInfo extends React.Component {
    render() {
        return (
            <Container>
                <Header style={styles.headerStyle} >
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Member Information</Title>
                    </Body>
                    <Right />
                </Header>
                <ScrollView>
                    <View style={styles.sectionCard}>
                        <Card style={styles.mainCardStyle}>
                            <View style={{ flex: 1 }}>
                                <ImageBackground source={require('../../assets/images/virtual-card-header.png')} resizeMode='contain' style={styles.intellicareLogo} />
                            </View>
                            <View style={styles.cardInfo}>
                                <Label style={styles.cardName}>SERAFINO, FREDERICK E.</Label>
                                <Label style={styles.cardDetails}>INTELLICARE</Label>
                                <View style={{ flexDirection: "row" }}>
                                    <Label style={styles.titlecardDetails}>Account No: </Label>
                                    <Label style={styles.cardDetails}>80-00-00000-00000-00/1</Label>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Label style={styles.titlecardDetails}>Card No: </Label>
                                    <Label style={styles.cardDetails}>11950000092817266</Label>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Label style={styles.titlecardDetails}>Birthdate (mm/yy): </Label>
                                    <Label style={styles.cardDetails}>01/01</Label>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Label style={styles.titlecardDetails}>Gender: </Label>
                                    <Label style={styles.cardDetails}>MALE</Label>
                                </View>
                                <Label style={styles.cardDetails}>W/ DENTAL COVERAGE</Label>
                            </View>
                        </Card>
                    </View>
                    <View style={styles.sectionMembInfo}>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Text style={styles.itemLabel}>Account Status</Text>
                            </Left>
                            <Body style={styles.itemBody}>
                                <Label style={styles.labelStatus}>ACTIVE</Label>
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Text style={styles.itemLabel}>Member Type</Text>
                            </Left>
                            <Body style={styles.itemBody}>
                                <Label style={styles.itemInfo}>PRINCIPAL</Label>
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Text style={styles.itemLabel}>Room and Board</Text>
                            </Left>
                            <Body style={styles.itemBody}>
                                <Label style={styles.itemInfo}>REGULAR PRIVATE</Label>
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Text style={styles.itemLabel}>Maximum Limit</Text>
                            </Left>
                            <Body style={styles.itemBody}>
                                <Label style={styles.itemInfo}>100,000</Label>
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Text style={styles.itemLabel}>Coverage Period</Text>
                            </Left>
                            <Body style={styles.itemBody}>
                                <Label style={styles.itemInfo}>01/01/2019 TO 01/01/2020</Label>
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Text style={styles.itemLabel}>Civil Status</Text>
                            </Left>
                            <Body style={styles.itemBody}>
                                <Label style={styles.itemInfo}>SINGLE</Label>
                            </Body>
                        </Item>
                        <Item style={styles.itemStyle}>
                            <Left>
                                <Text style={styles.itemLabel}>Relation</Text>
                            </Left>
                            <Body style={styles.itemBody}>
                                <Label style={styles.itemInfo}>PRINCIPAL</Label>
                            </Body>
                        </Item>
                    </View>
                </ScrollView>
            </Container>
        );
    };
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create(
    {
        headerStyle: {
            backgroundColor: "#5fb650",
        },
        headerText: {
            color: "#fff",
            fontSize: 20,
        },
        mainCardStyle: {
            alignSelf: "center",
            flex: 1,
            minHeight: 250,
            borderRadius: 20,
            borderColor: '#f5f5f5',
            shadowColor: '#2d2d2d',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.10,
            shadowRadius: 20,
            elevation: 10,
            color: "#2d2d2d",
            backgroundColor: "#ffffff",
            width: width * 0.90,
            padding: 0
        },
        cardInfo: {
            flex: 2,
            paddingHorizontal: 20,
        },
        mainCardText: {
            marginVertical: 15,
            textAlign: "justify"
        },
        cardName: {
            fontWeight: "bold",
            fontSize: 18
        },
        cardDetails: {
            fontSize: 14,
            textTransform: "uppercase"
        },
        titlecardDetails: {
            fontSize: 14,
        },
        sectionCard: {
            paddingVertical: 20
        },
        intellicareLogo: {
            width: width * 0.90,
            height: height * 0.10,
            borderTopStartRadius: 20,
            overflow: "hidden",
            marginTop: -3
        },
        sectionMembInfo: {
            marginVertical: 10,
        },
        itemStyle: {
            padding: 20,
        },
        itemLabel: {
            color: "#2d2d2d",
            fontWeight: "bold"
        },
        itemInfo: {
            color: "#b2bec3",
            textTransform: "uppercase"
        },
        itemBody: {
            alignItems: 'flex-end'
        },
        labelStatus: {
            color: "green",
            fontWeight: "bold"
        }

    }
)