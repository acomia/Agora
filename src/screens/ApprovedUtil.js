import React from 'react'
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { Container, Text, Header, Left, Right, Body, Title, Footer, Content, Item, Label, Icon, Button } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';

export default class ApprovedUtil extends React.Component {
    render() {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('MembersPage')}>
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Approved Utilization</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <ScrollView>
                        <View>
                            <Text style={{ alignSelf: "center", justifyContent: "center" }}>Data table goes here...</Text>
                        </View>
                    </ScrollView>
                </Content>
                <Footer style={styles.footerStyle}>
                    <Content>
                        <Item style={styles.footeritemStyle}>
                            <Left>
                                <Text style={styles.footeritemLabel}>Total Approved Amount:</Text>
                            </Left>
                            <Body style={styles.footeritemBody}>
                                <Label style={styles.footerlabelTotalAmount}>0.00</Label>
                            </Body>
                        </Item>
                    </Content>
                </Footer>
            </Container>
        );
    };
}

const styles = StyleSheet.create(
    {
        headerStyle: {
            backgroundColor: "#5fb650",
        },
        headerText: {
            color: "#fff",
            fontSize: 20,
        },
        contentDataTable: {
            justifyContent: "center",
            alignContent: "center"
        },
        footerStyle: {
            backgroundColor: "#fff"
        },
        footerContent: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        footeritemStyle: {
            padding: 20,
        },
        footeritemLabel: {
            color: "#2d2d2d",
            fontWeight: "bold",
        },
        footeritemInfo: {
            color: "#b2bec3",
            textTransform: "uppercase"
        },
        footeritemBody: {
            alignItems: 'flex-end',
        },
        footerlabelTotalAmount: {
            color: "green",
            fontWeight: "bold",
        }
    }
)