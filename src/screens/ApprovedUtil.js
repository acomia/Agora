import React from 'react'
import { StyleSheet, View, Dimensions, Image, TouchableOpacity, FlatList, Modal, style, TouchableHighlight } from 'react-native'
import { Container, Text, Header, Left, Right, Body, Title, Footer, Content, Item, Label, Icon, Button, List } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
const MEMB_ACCOUNTNO = 'memb_accountno';
const membacctUtil = ''

export default class ApprovedUtil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            utilDataSource: [],
            modalVisible: false,
        }
    }

    state = {
        modalVisible: false,
    };

    openModal = (item) => {
        this.setState({ modalVisible: true });
        // this.props.navigation.navigate('ApprovedUtilModal', item);
        return (

            <View style={StyleSheet.container}>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}>
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <Text>RCS No.</Text>
                            <Text>{item.ap_code}</Text>
                            <Button rounded block success style={{ marginTop: 50 }} onPress={() => this.closeModal()}>
                                <Text > Okay </Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>

        )
    }

    closeModal() {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate('ApprovedUtilModal', item);
    }

    // async _getacct() {
    //     try {
    //         this.membacctUtil = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
    //         // console.log("membacctutil is: " + this.membacctUtil);
    //         // return this.membacctUtil
    //     } catch (error) {
    //         console.log("CANT GET ACCT NO")
    //     }
    // }

    async componentDidMount() {
        // this._getacct()

        this.membacctUtil = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
        console.log("membacct is: " + this.membacctUtil);


        console.log('test102', global.storeToken)
        console.log('test101', this.membacctUtil)
        fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/member/utilization/postedutil', {
            method: 'GET',
            headers: {
                'authToken': global.storeToken,
                'paramAcct': this.membacctUtil,
                'Content-Type': 'application/json;charset=UTF-8'
                // 'paramContract': '1',

            }
        })
            .then((response) => {
                response.json()
                    .then((responseJson) => {
                        console.log('posted', responseJson)
                        console.log('test103', this.membacctUtil)
                        this.setState({
                            isLoading: false,
                            utilDataSource: responseJson.data
                        });
                    })
            })
            .catch((error) => {

                alert('Error!' + error)
            })
    }

    //   render(){
    //     // const { utilDataSource } = this.state
    //     return (
    //         <Container>
    //             <Header style={styles.headerStyle}>
    //                 <Left>
    //                     <Button transparent onPress={() => this.props.navigation.navigate('MembersPage')}>
    //                         <Icon name="arrow-back" style={{ color: "#fff" }} />
    //                     </Button>
    //                 </Left>
    //                 <Body>
    //                     <Title>Approved Utilization</Title>
    //                 </Body>
    //                 <Right />
    //             </Header>
    //             <DataTable>
    //                 <DataTable.Header>
    //                     <DataTable.Title>RCS No.</DataTable.Title>
    //                     <DataTable.Title>Date</DataTable.Title>
    //                     <DataTable.Title numeric>Amount</DataTable.Title>
    //                 </DataTable.Header>
    //             </DataTable>
    //              </Container>
    //             )
    //             }

    renderItem = ({ item }) => {
        { console.log('testing', item) }
        return (
            <TouchableOpacity
                onPress={() => this.openModal(item)}
            >
                <ScrollView>
                    <List style={styles.listStyle}>
                        <DataTable Body>
                            <DataTable.Row>
                                <DataTable.Cell>{item.loa}</DataTable.Cell>
                                <DataTable.Cell>{item.loa_date}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    </List>
                </ScrollView >
            </TouchableOpacity>

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
        //  const { data } = this.state
        // { console.log('member', this.state) }
        // const totalAmount = utilDataSource.reduce((AmountTotal, total) => AmountTotal + total.amount, 0);

        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('MembInfo')}>
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Approved Utilization</Title>
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
                    data={this.state.utilDataSource}
                    renderItem={this.renderItem}
                    //   keyExtractor={(item, index) => amount}
                    ItemSeparatorComponent={this.renderSeparator}
                />
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
        },
        listStyle: {
            color: "green",
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
        },
        innerContainer: {
            alignItems: 'center',
        }
    }
)