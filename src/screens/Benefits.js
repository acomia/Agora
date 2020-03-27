import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  TouchableNativeFeedback,
  Modal,
  TouchableHighlight,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Button,
  Text,
  Left,
  Right,
  Body,
  Label,
  Thumbnail,
  ListItem,
  Icon,
  Item,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import Spinner from 'react-native-spinkit';
import { BENEFITS } from '../util/api';

const ACCESS_TOKEN = 'access_token';

export default class Benefits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      benefitsDataSource: [],
      tableHead: ['GENERAL BENEFITS', 'HMO', 'TPA'],
      isLoading: true,
      // h_ip : '',
      // tableIP: ['In - Patient', this.state.h_ip, 'No'],
    };
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    console.log('globaltokenko', global.storeToken)
    fetch(BENEFITS, {
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
            this.setState({
              benefitsDataSource: responseJson.data,
              isLoading: false,
            });
          }
        });
      })
      .catch(error => {
        return Alert.alert('Oops', error);
      });
  }


  render() {
    const { spinnerStyle } = styles;
    const state = this.state;
    return (
      <Container>
        <ScrollView>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Benefits</Text>
          </View>
          <View style={styles.contentStyle}>
            <View style={styles.sectionMembInfo}>
              <Text style={styles.headerText}>
                Your general benefits include:
            </Text>
              <View style={styles.container}>
                <Table borderStyle={{ borderColor: 'transparent', }}>
                  <Row data={state.tableHead} flexArr={[2, 1, 1]} style={styles.head} textStyle={styles.text} />
                </Table>
              </View>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>In-Patient</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_ip ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_ip ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.labelStatus}></Label>
                </Body> */}
              </Item>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>Out-Patient</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_opd ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_opd ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body> */}
              </Item>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>Emergency</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_er ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_er ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body> */}
              </Item>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>Dental</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_dental ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_dental ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body> */}
              </Item>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>Maternity</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_ob ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_ob ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body> */}
              </Item>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>Philhealth</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_ph ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_ph ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body> */}
              </Item>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>APE</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_ape ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_ape ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body> */}
              </Item>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>AD&D</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_db ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_db ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body> */}
              </Item>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>OPD Medicine</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_opmed ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_opmed ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body> */}
              </Item>

              <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>Hospital Allowance</Text>
                </Left>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.h_ha ? 'Yes' : 'No'}</Text>
                  </Left>
                  <Left>
                    <Text style={styles.itemgrid}>{this.state.benefitsDataSource.t_ha ? 'Yes' : 'No'}</Text>
                  </Left>
                </View>
                {/* <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body> */}
              </Item>
              {/* <Item style={styles.itemStyle}>
                <Left>
                  <Text style={styles.itemLabel}>Exclusions</Text>
                </Left>
                <Body style={styles.itemBody}>
                  <Label style={styles.itemInfo}></Label>
                </Body>
              </Item> */}
            </View>
          </View>
        </ScrollView>
        {
          this.state.isLoading && (
            <View style={spinnerStyle}>
              <Spinner color={'#5fb650'} size={60} type={'ThreeBounce'} />
            </View>
          )
        }
      </Container>
    );
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: '#5fb650',
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentStyle: {
    flex: 1,
    paddingVertical: 20,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    shadowColor: '#2d2d2d',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  sectionMembInfo: {
    marginVertical: 10,
  },
  itemStyle: {
    padding: 20,
  },
  itemLabel: {
    color: '#6d6e72',
    fontWeight: 'bold',
    flex: 2,
  },
  itemgrid: {
    color: '#6d6e72',
 
    flex: 1,
  },
  itemInfo: {
    color: '#b2bec3',
    textTransform: 'uppercase',
  },
  itemBody: {
    alignItems: 'flex-end',
  },
  labelStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
  headerText: {
    color: '#5fb650',
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  headerStyle: {
    color: '#6d6e72',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',

  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around' },
  text: { fontSize: 15, color: '#5fb650', },
  row: { flexDirection: 'row', backgroundColor: '#fff' },
});
