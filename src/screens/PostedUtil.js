import React from 'react'
import { StyleSheet, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import { Container, Text, Header, Left, Right, Body, Title, Footer, Content, Item, Label, Icon, Button, List } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
const MEMB_ACCOUNTNO = 'memb_accountno';
const membacctPosted = ''

export default class tabOne extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            PostedutilDataSource: [],
            modalVisible: false,
        }
    }

    async componentDidMount() {
        this.membacctPosted = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
        console.log('sasasas',this.membacctPosted)
        fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/member/utilization/preapproved', {
            method: 'GET',
            headers: {
                'authToken': global.storeToken,
                'paramAcct': this.membacctPosted ,
                // 'paramContract': '7',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then((response) => {
                response.json()
                    .then((responseJson) => {
                        this.setState({
                            isLoading: false,
                            PostedutilDataSource: responseJson.data
                        });
                    })
            })
            .catch((error) => {

                alert('Error!' + error)
            })
    }


    renderItem = ({ item }) => {
        { console.log('testing', item) }
        return (
            <ScrollView>
                <List style={styles.listStyle}>
                    <DataTable Body>
                        <DataTable.Row>
                            <DataTable.Cell>{item.ap_code}</DataTable.Cell>
                            <DataTable.Cell>{item.loa_date}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </List>
            </ScrollView >
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{ height: 0, backgroundColor: 'gray' }}>
            </View>
        )
    }

    render() {

        return (

            <Container>
                <Header style={styles.headerStyle}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('ApprovedUtil')}>
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Posted Utilization</Title>
                    </Body>
                    <Right />
                </Header>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>RCS No.</DataTable.Title>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title numeric>Amount</DataTable.Title>
                    </DataTable.Header>
                </DataTable>
                <FlatList
                    data={this.state.PostedutilDataSource}
                    renderItem={this.renderItem}
                    //   keyExtractor={(item, index) => amount}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                <Footer style={styles.footerStyle}>
                    <Content>
                        <Item style={styles.footeritemStyle}>
                            <Left>
                                <Text style={styles.footeritemLabel}>Total Posted Amount:</Text>
                            </Left>
                            <Body style={styles.footeritemBody}>
                                <Label style={styles.footerlabelTotalAmount}>0.00</Label>
                            </Body>
                        </Item>
                    </Content>
                </Footer>
            </Container>

        );
    }
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