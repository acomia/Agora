import React from 'react';
import { StyleSheet, View, Dimensions, Image, TouchableOpacity, FlatList, RefreshControl, Alert, Modal, style, TouchableHighlight } from 'react-native';
import { Container, Text, Header, Left, Right, Body, Title, Footer, Content, Item, Label, Icon, Button, List } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';
import moment from 'moment'
import 'intl';
import 'intl/locale-data/jsonp/en';


const MEMB_ACCOUNTNO = 'memb_accountno';
const ACCESS_TOKEN = 'access_token';
const membacctUtil = '';


export default class ApprovedUtil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      utilDataSource: [],
      modalVisible: false,
      totalUtilAmount: 0,
      refreshing: false,
    };
  }

  // state = {
  //   modalVisible: false,
  // };

  // openModal = item => {
  //   this.setState({ modalVisible: true });
  //   // this.props.navigation.navigate('ApprovedUtilModal', item);
  //   return (
  //     <View style={StyleSheet.container}>
  //       <Modal
  //         visible={this.state.modalVisible}
  //         animationType={'fade'}
  //         onRequestClose={() => this.closeModal()}>
  //         <View style={styles.modalContainer}>
  //           <View style={styles.innerContainer}>
  //             <Text>RCS No.</Text>
  //             <Text>{item.ap_code}</Text>
  //             <Button
  //               rounded
  //               block
  //               success
  //               style={{ marginTop: 50 }}
  //               onPress={() => this.closeModal()}>
  //               <Text> Okay </Text>
  //             </Button>
  //           </View>
  //         </View>
  //       </Modal>
  //     </View>
  //   );
  // };

  // closeModal() {
  //   this.setState({ modalVisible: false });
  //   this.props.navigation.navigate('ApprovedUtilModal', item);
  // }

  // async _getacct() {
  //     try {
  //         this.membacctUtil = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
  //         // console.log("membacctutil is: " + this.membacctUtil);
  //         // return this.membacctUtil
  //     } catch (error) {
  //         console.log("CANT GET ACCT NO")
  //     }
  // }

  // showAlert = () =>{
  //   Alert.alert(
  //     'Oops!',
  //     'Approved Utilization Empty',
  //     [
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ],
  //     {cancelable: false},
  //   );
  // }

  async componentDidMount() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacctposted = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/member/utilization/preapproved', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'AccountNo': global.storeToken,
        'Content-Type': 'application/json;charset=UTF-8',
        // 'paramContract': '1',
      },
    },
    )
      .then(response => {
        response.json().then(responseJson => {
          if (responseJson.data != null) {
            console.log('teteteteest', responseJson.data )
            let totalUtilAmount = 0;
            this.setState({
              isLoading: false,
              utilDataSource: responseJson.data,
              refreshing: false,
            });

            responseJson.data.map(util => {
              totalUtilAmount = totalUtilAmount + parseFloat(util.amount)
            })

            this.setState({ totalUtilAmount })

          } else {
            this.setState({ isLoading: false })
            this.setState({ refreshing: false })
            // this.showAlert()
            this.props.navigation.navigate('Membinfo')
          }
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
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
    return (
      // <TouchableOpacity>
        <ScrollView>
          <List style={styles.listStyle}>
            <DataTable Body>
              <DataTable.Row>
                <DataTable.Cell style={styles.contentDataTable}>{item.provider_name}</DataTable.Cell>
                <DataTable.Cell style={styles.contentDataTable}>{moment(item.loa_date).format('L')}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.contentDataTable}>{item.amount}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </List>
        </ScrollView>
      // </TouchableOpacity>
    );
  };

  handleRefresh = () => {
    this.setState({
      refreshing: true

    }, () => {
      this.componentDidMount();
    })
  }

  renderSeparator = () => {
    return (
      <View
        style={{ height: 0, backgroundColor: 'gray' }}>
      </View>
    )
  };

  render() {
    const { spinnerStyle } = styles;
    if (this.state.isLoading) {
      return (
        <View style={spinnerStyle}>
          <Spinner color={'#5fb650'} size={50} type={'ThreeBounce'} />
        </View>
      );
    }
    // const NumberFormat = (value) =>
    //   new Intl.NumberFormat('en-IN', {
    //     style: 'currency',
    //     currency: 'PHP',
    //     minimumFractionDigits: 2 
    //   }).format(value);
    //   console.log('amount', NumberFormat(this.state.totalUtilAmount))
    return (
      <Container>
        <Content refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._handleRefresh} />}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Approved Utilization</Text>
            <Text style={styles.headerSubheader}>
              Incurred but not posted. Approved availments through Intellicare's
              Customer Service Department.
            </Text>
          </View>
          <View style={styles.contentStyle}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.headerStyle}>Provider's Name</DataTable.Title>
                <DataTable.Title style={styles.headerStyle}>Date</DataTable.Title>
                <DataTable.Title style={styles.headerStyle}>Amount</DataTable.Title>
              </DataTable.Header>
            </DataTable>
            <FlatList
              contentContainerStyle={{ alignSelf: 'stretch' }}
              data={this.state.utilDataSource}
              renderItem={this.renderItem}
              //   keyExtractor={(item, index) => amount}
              ItemSeparatorComponent={this.renderSeparator}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
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
                <Label style={styles.footerlabelTotalAmount}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(this.state.totalUtilAmount)}</Label>
              </Body>
            </Item>
          </Content>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 100,
    backgroundColor: '#5fb650',
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubheader: {
    fontSize: 12,
    color: "#a5d69c"
  },
  datacell: {
    justifyContent: 'center',
    padding: 15,
    borderBottomWidth: 0,
  },
  contentStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // marginTop: -45,
    backgroundColor: '#fff',
    // borderTopStartRadius: 50,
    // borderTopEndRadius: 50,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  headerStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  contentDataTable: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  footerStyle: {
    backgroundColor: '#fff',
  },
  footerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footeritemStyle: {
    justifyContent: 'center',
    padding: 15,
    borderBottomWidth: 0,
  },
  footeritemLabel: {
    color: '#6d6e72',
    fontWeight: 'bold',
  },
  footeritemInfo: {
    color: '#b2bec3',
    textTransform: 'uppercase',
  },
  footeritemBody: {
    alignItems: 'flex-end',
  },
  footerlabelTotalAmount: {
    color: 'green',
    fontWeight: 'bold',
  },
  listStyle: {
    color: 'green',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
