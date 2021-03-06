import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {
  Container,
  Text,
  Card,
  Left,
  Body,
  Item,
  Label,
  Icon,
  Button,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import Spinner from 'react-native-spinkit';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import PHCard from './Cards/PHCard';
import HKCard from './Cards/HKCard';
import SGCard from './Cards/SGCard';
import MYCard from './Cards/MYCard';
import IDCard from './Cards/IDCard';

import {GOOGLE_MAPS_APIKEY} from '../util/api';

export async function request_location_runtime_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Intellicare Agora App needs access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class MembInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentCountry: null,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    await request_location_runtime_permission();
    // Geocoder.init(GOOGLE_MAPS_APIKEY);
    // Geocoder.from(1.3034745, 103.8325404)
    //   .then(json => {
    //     json.results[0].address_components.forEach(city => {
    //       if (city.types.indexOf('country') !== -1) {
    //         this.setState({
    //           currentCountry: city.long_name,
    //           loading: false,
    //         });
    //       }
    //     });
    //     console.log(this.state);
    //   })
    //   .catch(error => console.warn(error));
    this.getCurrectCountryLocation();
  }
  async getCurrectCountryLocation() {
    Geocoder.init(GOOGLE_MAPS_APIKEY);
    Geolocation.getCurrentPosition(
      position => {
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            json.results[0].address_components.forEach(city => {
              if (city.types.indexOf('country') !== -1) {
                this.setState({
                  currentCountry: city.long_name,
                  loading: false,
                });
              }
            });
            console.log(this.state);
          })
          .catch(error => console.warn(error));
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
    );
  }
  render() {
    const {
      fullname,
      acct,
      cardno,
      birth_date,
      gender,
      status,
      member_type,
      card_printed_date,
      employee_id,
      room_and_board,
      maximum_limit,
      coverage_period,
      company,
      civil_status,
      relation,
      intellicare,
    } = this.props.navigation.state.params;
    var membstat = civil_status; // Assigned a value to the variable text
    switch (
      membstat // Passing the variable to switch condition
    ) {
      case 'A':
        membstat = 'ANNULLED';
        break;
      case 'M':
        membstat = 'MARRIED';
        break;
      case 'P':
        membstat = 'SINGLE PARENT';
        break;
      case 'S':
        membstat = 'SINGLE';
        break;
      case 'W':
        membstat = 'WIDOWED';
        break;
      case 'X':
        membstat = 'SEPARATED';
        break;
      case 'C':
        membstat = 'DOMESTIC PARTNER/COMMON LAW SPOUSE';
        break;
      default:
        membstat = '';
        break;
    }
    const {spinnerStyle} = styles;
    if (this.state.loading) {
      return (
        <View style={spinnerStyle}>
          <Spinner color={'#5fb650'} size={50} type={'ThreeBounce'} />
        </View>
      );
    }
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Member Information</Text>
          </View>
          <View style={styles.contentStyle}>
            <View style={styles.sectionCard}>
              {/* {this.state.currentCountry === 'Philippines' ? ( */}
              <PHCard
                fullname={fullname}
                acct={acct}
                cardno={cardno}
                bday={birth_date}
                gender={gender}
                company={company}
                intellicare={intellicare}
              />
              {/* ) : null} */}

              {/* {this.state.currentCountry === 'Hong Kong' ? ( */}
              <HKCard
                fullname={fullname}
                acct={acct}
                cardno={cardno}
                bday={birth_date}
                gender={gender}
                company={company}
                intellicare={intellicare}
              />
              {/* ) : null} */}

              {/* {this.state.currentCountry === 'Singapore' ? ( */}
              <SGCard
                fullname={fullname}
                acct={acct}
                cardno={cardno}
                bday={birth_date}
                gender={gender}
                company={company}
                intellicare={intellicare}
              />
              {/* ) : null} */}

              {/* {this.state.currentCountry === 'Malaysia' ? ( */}
              <MYCard
                fullname={fullname}
                acct={acct}
                cardno={cardno}
                bday={birth_date}
                gender={gender}
                company={company}
                intellicare={intellicare}
              />
              {/* ) : null} */}

              {/* {this.state.currentCountry === 'Indonesia' ? ( */}
              <IDCard
                fullname={fullname}
                acct={acct}
                cardno={cardno}
                bday={birth_date}
                gender={gender}
                company={company}
                intellicare={intellicare}
              />
              {/* ) : null} */}
            </View>
            <View style={styles.viewButtonBenefits}>
              <Button
                success
                rounded
                iconRight
                onPress={() => this.props.navigation.navigate('BenefitsPage')}>
                <Text>View your Benefits</Text>
                <Icon type="Ionicons" name="ios-arrow-dropright-circle" />
              </Button>
            </View>
          </View>
          <View style={styles.sectionMembInfo}>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Account Status</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.labelStatus}>{status}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Employee ID</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{employee_id}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Member Type</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{member_type}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Civil Status</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{membstat}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Relation</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{relation}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Room and Board</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{room_and_board}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Maximum Limit</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{maximum_limit}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabelCoverage}>Coverage Period</Text>
              </Left>
              <Body style={styles.itemBodyCoverage}>
                <Label style={styles.itemInfo}>{coverage_period}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Card Printed Date</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>
                  {moment(card_printed_date).format('L')}
                </Label>
              </Body>
            </Item>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

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
  contentStyle: {
    marginTop: -50,
    backgroundColor: 'transparent',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
  },
  headerStyle: {
    backgroundColor: '#5fb650',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
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
    alignItems: 'flex-start',
  },
  itemInfo: {
    color: '#b2bec3',
    textTransform: 'uppercase',
  },
  itemBody: {
    alignItems: 'flex-end',
  },
  itemLabelCoverage: {
    color: '#6d6e72',
    fontWeight: 'bold',
    alignItems: 'flex-start',
    flex: 1,
  },
  itemBodyCoverage: {
    alignItems: 'flex-end',
    flex: 2,
  },
  labelStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
  viewButtonBenefits: {
    padding: 20,
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
  linearGradient: {
    height: 100,
    position: 'relative',
  },
});
