import React from 'react';
import { StyleSheet, View, StatusBar, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import {
  Container,
  Text,
  Header,
  Left,
  Right,
  Body,
  Title,
  Footer,
  Content,
  Item,
  Label,
  Icon,
  Button,
  List,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-spinkit'
import moment from 'moment'
import 'intl';
import 'intl/locale-data/jsonp/en';


const MEMB_ACCOUNTNO = 'memb_accountno';
const ACCESS_TOKEN = 'access_token';
const membacctPosted = ''

export default class tabOne extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      PostedutilDataSource: [],
      modalVisible: false,
      totalUtilAmount: 0,
      refreshing: false,
    };
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    let membacctpreapproved = await AsyncStorage.getItem(MEMB_ACCOUNTNO);
    fetch('https://intellicare.com.ph/uat/webservice/memberprofile/api/member/utilization/preapproved', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'AccountNo': membacctpreapproved,
        // 'paramContract': '7',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    },
    )
      .then((response) => {
        response.json()
          .then((responseJson) => {
            if (responseJson.data != null) {
              let totalUtilAmount = 0;
              this.setState({
                isLoading: false,
                PostedutilDataSource: responseJson.data,
                refreshing: false,
              });

              responseJson.data.map(util => {
                console.log(util.amount)
                totalUtilAmount = totalUtilAmount + parseFloat(util.amount)
              })

              this.setState({ totalUtilAmount })

            } else {
              alert('Posted Utilization Empty')
              this.setState({ isLoading: false })
              this.setState({ refreshing: false })
              this.props.navigation.navigate('Membinfo')
            }
          })
      })
      .catch((error) => {
        alert('Error!' + error)
      })
  }


  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
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
        </ScrollView >
      </TouchableOpacity>
    );
  };


  handleRefresh = () => {
    this.setState({
      refreshing: true

    }, () => {
      this.componentDidMount();
    }
    )
  }

  renderSeparator = () => {
    return (
      <View
        style={{ height: 0, backgroundColor: 'gray' }}>
      </View>
    )
  }

  render() {
    const { spinnerStyle, spinnerTextStyle } = styles;
    if (this.state.isLoading) {
      return (
        <View style={spinnerStyle}>
          <Spinner color={'green'} size={50} type={'ChasingDots'} />
          <Text style={spinnerTextStyle}>Fetching data...</Text>
        </View>
      );
    }
    return (
      <Container>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Posted Utilization</Text>
            <Text style={styles.headerSubheader}>
              Billed availments and encoded in Intellicare system.
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
              data={this.state.PostedutilDataSource}
              renderItem={this.renderItem}
              //   keyExtractor={(item, index) => amount}
              ItemSeparatorComponent={this.renderSeparator}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          </View>
        </ScrollView>
        <Footer style={styles.footerStyle}>
          <Content>
            <Item style={styles.footeritemStyle}>
              <Left>
                <Text style={styles.footeritemLabel}>Total Posted Amount:</Text>
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
    color: '#a5d69c',
  },
  contentStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0.2,
    backgroundColor: 'white',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});
