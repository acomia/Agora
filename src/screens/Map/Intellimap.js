import React, {PureComponent} from 'react';
import {
  View,
  PermissionsAndroid,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
  Linking,
  Animated,
  TouchableNativeFeedback,
} from 'react-native';
import {
  Text,
  ListItem,
  Container,
  Header,
  Item,
  Input,
  InputGroup,
} from 'native-base';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {ClusterMap} from 'react-native-cluster-map';
import Geolocation from 'react-native-geolocation-service';
import getDirections from 'react-native-google-maps-directions';
import _ from 'lodash';
import Spinner from 'react-native-spinkit';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Cluster} from './Cluster';

import FooterComponent from './FooterComponent';
import styles from './IntellimapStyle';

const offices = require('../../../offices.json');
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight();
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LONGITUDE_DELTA = ASPECT_RATIO * 0.015;

export async function request_location_runtime_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'IntelliMap Location Permission',
        message: 'Intellicare Mobile App needs access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
    console.warn(err);
  }
}
export default class Intellimap extends PureComponent {
  constructor(props) {
    super(props);
    global.token = '';
    this.state = {
      coordinates: [],
      originRoute: {latitude: 14.5609413, longitude: 121.0141044},
      destinationRoute: {latitude: 14.5564224, longitude: 121.0178166},
      latitude: 0,
      longitude: 0,
      curLatitude: 0,
      curLongitude: 0,
      hospitals: [],
      clinics: [],
      nearestHospitals: [],
      nearestClinics: [],
      offices: offices,
      markers: [],
      searchData: [],
      imgSrc: require('../../../assets/images/intellicare-icon.png'),
      search: '',
      officeSelected: false,
      clinicPressed: false,
      hospitalPressed: false,
      loading: false,
      searchTextChanged: false,
      detailsHeight: new Animated.Value(90),
      rotateArrow: new Animated.Value(0),
      detailsOpacity: new Animated.Value(0),
      expandDetails: false,
      geographyPoint: '',
      iconExpandName: 'window-minimize',
      currentLocationStatus: false,
    };
    this.arrayholder = [];
    this.mapView = null;
  }
  async componentDidMount() {
    this.setState({
      loading: true,
    });
    await request_location_runtime_permission();

    Geolocation.getCurrentPosition(
      position => {
        const origin = [];
        origin.push({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.setState({
          coordinates: origin,
          curLatitude: position.coords.latitude,
          curLongitude: position.coords.longitude,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          geographyPoint:
            'POINT (' +
            position.coords.longitude.toString() +
            ' ' +
            position.coords.latitude.toString() +
            ')',
        });
        {
          this.getNearestFacilities();
        }
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
    );

    this._retrieveData();
    // Fetching token for map authentication
    fetch('https://intellicare.com.ph/uat/webservice/thousandminds/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        username: 'digitalxform',
        password: 'th2p@ssw0rd',
      }),
    })
      .then(response => {
        response.json().then(data => {
          if (data.code === 200) {
            global.token = data.response.token;
            if (
              this.state.hospitals.length > 0 &&
              this.state.clinics.length > 0
            ) {
              this.setState({loading: false});
              this.arrayholder = this.state.hospitals;
              console.log('Got it!');
            } else {
              {
                this._getMarkersData();
              }
            }
          } else {
            alert('Username not found!');
          }
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }
  getNearestFacilities() {
    //Get nearest Hospitals
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/providers/map/nearest?km=3&hstype=H',
      {
        method: 'GET',
        headers: {
          Geography: this.state.geographyPoint,
        },
      },
    )
      .then(response => {
        response.json().then(nearestHospital => {
          this.setState({
            nearestHospitals: nearestHospital.data,
          });
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });

    //Get nearest Clinics
    fetch(
      'https://intellicare.com.ph/uat/webservice/memberprofile/api/providers/map/nearest?km=1&hstype=C',
      {
        method: 'GET',
        headers: {
          Geography: this.state.geographyPoint,
        },
      },
    )
      .then(response => {
        response.json().then(nearestClinic => {
          this.setState({
            nearestClinics: nearestClinic.data,
          });
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }
  _storeData = async (hospital, clinic) => {
    const hospitalSet = ['hospitalData', JSON.stringify(hospital)];
    const clinicSet = ['clinicData', JSON.stringify(clinic)];
    try {
      await AsyncStorage.multiSet([hospitalSet, clinicSet]);
    } catch (error) {
      alert('Cannot save the data!');
    }
  };
  _retrieveData = async () => {
    try {
      const hData = await AsyncStorage.getItem('hospitalData');
      const cData = await AsyncStorage.getItem('clinicData');
      if (hData !== null && cData !== null) {
        this.setState({
          hospitals: JSON.parse(hData),
          clinics: JSON.parse(cData),
        });
      }
    } catch (error) {
      alert('Cannot retrieve the data!');
    }
  };
  _getMarkersData() {
    // Fetching all accredited hospitals //
    fetch(
      'https://intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=H',
      {
        method: 'GET',
        headers: {
          authToken: global.token,
        },
      },
    )
      .then(response => {
        response.json().then(hospitalData => {
          this.setState({
            hospitals: hospitalData.data,
          });
          this.arrayholder = hospitalData.data;
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
    // Fetching all accredited clinics //
    fetch(
      'https://intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=C',
      {
        method: 'GET',
        headers: {
          authToken: global.token,
        },
      },
    )
      .then(response => {
        response.json().then(clinicData => {
          this.setState({
            clinics: clinicData.data,
            loading: false,
          });
          let hospitalData = this.state.hospitals;
          let clinic_Data = this.state.clinics;
          this._storeData(hospitalData, clinic_Data);
        });
      })
      .catch(error => {
        alert('Error!' + error);
      });
  }
  SearchFilterFunction(text) {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      // const itemData = item.hospital_name ? item.hospital_name.toUpperCase() : ''.toUpperCase()
      const itemData = `${item.hospital_name.toUpperCase()} ${item.city_prov.toUpperCase()} ${item.hospital_code.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      searchData: newData,
      search: text,
      searchTextChanged: true,
    });
  }
  ListViewItemSeparator = () => {
    return <View style={styles.listViewItemSeparatorStyle} />;
  };
  onHospitalButtonPress = hospitals => {
    this.setState({
      searchData: hospitals,
      markers: this.state.nearestHospitals,
      // imgSrc: require('../../../assets/images/location-red.png'),
      destination: '',
      hospitalPressed: true,
      clinicPressed: false,
      officeSelected: false,
      value: '',
    });
    this.arrayholder = hospitals;
  };
  onClinicButtonPress = clinics => {
    this.setState({
      searchData: clinics,
      markers: this.state.nearestClinics,
      // imgSrc: require('../../../assets/images/location-blue.png'),
      destination: '',
      hospitalPressed: false,
      clinicPressed: true,
      officeSelected: false,
      value: '',
    });
    this.arrayholder = clinics;
  };
  onOfficesButtonPress() {
    this.setState({
      markers: offices,
      searchData: [],
      imgSrc: require('../../../assets/images/intellicare-icon.png'),
      destination: '',
      hospitalPressed: false,
      clinicPressed: false,
      officeSelected: true,
    });
    // {
    //   this.renderMarker();
    // }
  }
  handleGetDirections = destination => {
    const {curLatitude, curLongitude, officeSelected} = this.state;
    var desLat = 0;
    var desLong = 0;
    if (officeSelected) {
      desLat = destination.coords.latitude;
      desLong = destination.coords.longitude;
    } else {
      var newDesLat = Number(destination.latitudes);
      var newDesLong = Number(destination.longitudes);
      desLat = newDesLat;
      desLong = newDesLong;
    }
    const data = {
      source: {
        latitude: curLatitude,
        longitude: curLongitude,
      },
      destination: {
        latitude: desLat,
        longitude: desLong,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving',
        },
        {
          key: 'dir_action',
          value: 'navigate',
        },
      ],
    };
    getDirections(data);
  };
  renderHeaderMapButton() {
    const {hospitals, clinics} = this.state;
    return (
      <View
        style={{
          height: 40,
          paddingTop: 5,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{backgroundColor: 'transparent'}}>
          <TouchableOpacity
            disabled={this.state.hospitalPressed}
            style={
              !this.state.hospitalPressed
                ? [styles.buttonStyle, {backgroundColor: '#fff'}]
                : [
                    styles.buttonStyle,
                    {
                      backgroundColor: '#5fb650',
                    },
                  ]
            }
            onPress={() => this.onHospitalButtonPress(hospitals)}>
            <Image
              source={require('../../../assets/images/location-red.png')}
              style={{width: 18, height: 18, alignSelf: 'center'}}
            />
            <Text
              style={
                !this.state.hospitalPressed
                  ? [styles.textStyle]
                  : [
                      styles.textStyle,
                      {
                        color: '#fff',
                      },
                    ]
              }>
              Accredited Hospitals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={this.state.clinicPressed}
            style={
              !this.state.clinicPressed
                ? [styles.buttonStyle, {backgroundColor: '#fff'}]
                : [
                    styles.buttonStyle,
                    {
                      backgroundColor: '#5fb650',
                    },
                  ]
            }
            onPress={() => this.onClinicButtonPress(clinics)}>
            <Image
              source={require('../../../assets/images/location-blue.png')}
              style={{width: 18, height: 18, alignSelf: 'center'}}
            />
            <Text
              style={
                !this.state.clinicPressed
                  ? [styles.textStyle]
                  : [
                      styles.textStyle,
                      {
                        color: '#fff',
                      },
                    ]
              }>
              Accredited Clinics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={this.state.officeSelected}
            style={
              !this.state.officeSelected
                ? [styles.buttonStyle, {backgroundColor: '#fff'}]
                : [
                    styles.buttonStyle,
                    {
                      backgroundColor: '#5fb650',
                    },
                  ]
            }
            onPress={() => this.onOfficesButtonPress()}>
            <Image
              source={require('../../../assets/images/intellicare-icon.png')}
              style={{
                width: 8,
                height: 18,
                alignSelf: 'center',
                marginRight: 5,
              }}
            />
            <Text
              style={
                !this.state.officeSelected
                  ? [styles.textStyle]
                  : [
                      styles.textStyle,
                      {
                        color: '#fff',
                      },
                    ]
              }>
              Intellicare Offices
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
  renderMarker() {
    const {markers, imgSrc} = this.state;
    return (
      <View>
        {markers &&
          markers.map((location, idx) => {
            if (this.state.officeSelected) {
              const {
                coords: {latitude, longitude},
              } = location;
              return (
                <Marker
                  key={idx}
                  coordinate={{latitude, longitude}}
                  title={location.name}
                  onPress={this.onMarkerPress(location)}>
                  <Image source={imgSrc} style={{height: 46, width: 20}} />
                </Marker>
              );
            } else {
              const {latitudes, longitudes, hospital_name} = location;
              var newLatitude = Number(latitudes);
              var newLongitude = Number(longitudes);
              if (
                newLatitude == NaN ||
                newLatitude == 0 ||
                newLatitude == null
              ) {
                newLatitude == 14.5594041;
              }
              if (
                newLongitude == NaN ||
                newLongitude == 0 ||
                newLongitude == null
              ) {
                newLongitude == 121.014414;
              }
              this.state = {
                coordinate: {latitude: newLatitude, longitude: newLongitude},
              };
              return (
                <Marker
                  key={idx}
                  coordinate={this.state.coordinate}
                  title={hospital_name}
                  onPress={this.onMarkerPress(location)}>
                  <Image source={imgSrc} style={{height: 46, width: 20}} />
                </Marker>
              );
            }
          })}
      </View>
    );
  }
  onMarkerPress = location => () => {
    const destination = [];
    destination.push({
      latitude: this.state.officeSelected
        ? location.coords.latitude
        : Number(location.latitudes),
      longitude: this.state.officeSelected
        ? location.coords.longitude
        : Number(location.longitudes),
    });
    console.log(destination);
    this.setState({
      coordinates: [...this.state.coordinates, destination[0]],
      destination: location,
      latitude: this.state.officeSelected
        ? location.coords.latitude
        : Number(location.latitudes),
      longitude: this.state.officeSelected
        ? location.coords.longitude
        : Number(location.longitudes),
    });
  };
  officeMarkerDetails = destination => {
    return (
      <View style={styles.markerDetailsContainer}>
        <Animated.View
          style={{
            backgroundColor: '#fff',
            borderRadius: 6,
            height: this.state.detailsHeight,
            width: '100%',
          }}>
          <View
            style={{
              padding: 0,
              marginTop: 0,
              width: '100%',
              alignItems: 'center',
            }}>
            <Icon
              name={this.state.iconExpandName}
              color="silver"
              size={26}
              onPress={() => this._animateDetails()}
            />
          </View>
          <ListItem>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', marginLeft: 6}}>
                <Text
                  style={{
                    color: '#5FB650',
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginVertical: 6,
                  }}>
                  {destination.name}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'gray',
                    alignSelf: 'flex-start',
                  }}>
                  {destination.phone}
                </Text>
              </View>
            </View>
          </ListItem>
          <Animated.ScrollView style={{opacity: this.state.detailsOpacity}}>
            <ListItem
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                height: 60,
              }}>
              <Icon
                type="MaterialCommunityIcons"
                name="clock-outline"
                color="#5FB650"
                size={22}
              />
              <Text style={{fontSize: 10, color: 'gray', marginLeft: 6}}>
                {destination.ofc_hrs.trim() === '' &&
                destination.ofc_schedule.trim() === ''
                  ? 'N/A'
                  : `${destination.ofc_hrs} ${destination.ofc_schedule}`}
              </Text>
            </ListItem>
            <ListItem
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                height: 60,
              }}>
              <Icon
                type="MaterialCommunityIcons"
                name="map-marker-outline"
                color="#5FB650"
                size={22}
              />
              <Text
                onPress={() => this.handleGetDirections(destination)}
                style={{fontSize: 10, color: 'gray', marginLeft: 6}}>
                {destination.address}
              </Text>
            </ListItem>
          </Animated.ScrollView>
        </Animated.View>
      </View>
    );
  };
  hospclinicMarkerDetails = destination => {
    return (
      <View style={styles.markerDetailsContainer}>
        <Animated.View
          style={{
            backgroundColor: '#fff',
            borderRadius: 6,
            height: this.state.detailsHeight,
            width: '100%',
          }}>
          <View
            style={{
              padding: 0,
              marginTop: 0,
              width: '100%',
              alignItems: 'center',
            }}>
            <Icon
              name={this.state.iconExpandName}
              color="silver"
              size={26}
              onPress={() => this._animateDetails()}
            />
          </View>
          <ListItem>
            <View
              style={{flexDirection: 'row'}}
              onPress={() => this._animateDetails()}>
              <Icon name="hospital-building" color="#5FB650" size={22} />
              <View style={{flexDirection: 'column', marginLeft: 6}}>
                <Text
                  style={{
                    color: this.state.hospitalPressed ? '#e74c3c' : '#5DADE2',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  {destination.hospital_name}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#6d6e72',
                    alignSelf: 'flex-start',
                  }}>
                  {destination.phone}
                </Text>
              </View>
            </View>
          </ListItem>
          <Animated.ScrollView style={{opacity: this.state.detailsOpacity}}>
            <ListItem
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                height: 60,
              }}>
              <Icon
                type="MaterialCommunityIcons"
                name="clock-outline"
                color="#5FB650"
                size={22}
              />
              <Text style={{fontSize: 10, color: '#6d6e72', marginLeft: 6}}>
                {destination.clinic_hrs.trim() === ''
                  ? 'N/A'
                  : destination.clinic_hrs}
              </Text>
            </ListItem>
            <ListItem
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                height: 60,
              }}>
              <Icon
                type="MaterialCommunityIcons"
                name="map-marker-outline"
                color="#5FB650"
                size={22}
              />
              <Text
                onPress={() => this.handleGetDirections(destination)}
                style={{
                  fontSize: 10,
                  color: '#6d6e72',
                  marginLeft: 6,
                }}>{`${destination.street} ${destination.subd_brgy} ${destination.city_prov}`}</Text>
            </ListItem>
          </Animated.ScrollView>
        </Animated.View>
      </View>
    );
  };
  _animateDetails = () => {
    if (this.state.expandDetails === true) {
      Animated.timing(this.state.detailsHeight, {
        toValue: 90,
        duration: 500,
      }).start();
      Animated.timing(this.state.rotateArrow, {
        toValue: 0,
        duration: 600,
      }).start();
      Animated.timing(this.state.detailsOpacity, {
        toValue: 0,
        duration: 500,
      }).start();
      this.setState({expandDetails: false, iconExpandName: 'window-minimize'});
    } else {
      Animated.timing(this.state.detailsHeight, {
        toValue: 220,
        duration: 500,
      }).start();
      Animated.timing(this.state.rotateArrow, {
        toValue: 180,
        duration: 600,
      }).start();
      Animated.timing(this.state.detailsOpacity, {
        toValue: 1,
        duration: 500,
      }).start();
      this.setState({expandDetails: true, iconExpandName: 'chevron-down'});
    }
  };
  makeCall = telNumber => {
    let phoneNumber = telNumber;
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + phoneNumber + '}';
    } else {
      phoneNumber = 'telprompt:${' + phoneNumber + '}';
    }

    Linking.openURL(phoneNumber);
  };
  renderClusterMarker = count => <Cluster count={count} />;
  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
      destination: '',
      latitude: this.state.curLatitude,
      longitude: this.state.curLongitude,
    });
  };

  onReady = result => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: SCREEN_WIDTH / 10,
        bottom: SCREEN_HEIGHT / 10,
        left: SCREEN_WIDTH / 10,
        top: SCREEN_HEIGHT / 10,
      },
    });
  };

  onError = errorMessage => {
    console.log(errorMessage);
  };

  render() {
    const {
      latitude,
      longitude,
      curLatitude,
      curLongitude,
      destination,
      markers,
      searchData,
      imgSrc,
      coordinates,
    } = this.state;
    const {map, spinnerStyle} = styles;
    var imgBox = null;
    if (!_.isEmpty(destination)) {
      if (this.state.officeSelected) {
        imgBox = this.officeMarkerDetails(destination);
      } else {
        imgBox = this.hospclinicMarkerDetails(destination);
      }
    }
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAEr63gs_sYIqF9HFTvqQX4rvdPEcrNQTo';

    return (
      <Container>
        <View style={{flex: 1}}>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={styles.container}>
            <MapView
              showsMyLocationButton
              showsCompass
              ref={c => (this.mapView = c)}
              onPress={this.onMapPress}
              provider={PROVIDER_GOOGLE}
              // renderClusterMarker={this.renderClusterMarker}
              style={map}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.015,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              // camera={{
              //   center: {
              //     latitude: latitude,
              //     longitude: longitude,
              //   },
              //   pitch: 60,
              //   heading: 2,
              //   altitude: 6,
              //   zoom: 14,
              // }}
            >
              {markers &&
                markers.map((marker, key) => (
                  <Marker
                    key={key}
                    tracksViewChanges={false}
                    title={
                      this.state.officeSelected
                        ? marker.name
                        : marker.hospital_name
                    }
                    onPress={this.onMarkerPress(marker)}
                    coordinate={{
                      latitude: this.state.officeSelected
                        ? marker.coords.latitude
                        : Number(marker.latitudes),
                      longitude: this.state.officeSelected
                        ? marker.coords.longitude
                        : Number(marker.longitudes),
                    }}>
                    <Image source={imgSrc} style={{height: 46, width: 20}} />
                  </Marker>
                ))}
              <Marker
                title="YOU ARE HERE!"
                coordinate={{
                  latitude: curLatitude,
                  longitude: curLongitude,
                }}>
                <Icon name="human" size={32} color="#FF5E3A" />
              </Marker>
              <MapViewDirections
                origin={coordinates[0]}
                destination={coordinates[coordinates.length - 1]}
                // waypoints={coordinates.slice(1, -1)}
                mode="DRIVING"
                apikey={GOOGLE_MAPS_APIKEY}
                language="en"
                strokeWidth={5}
                strokeColor="blue"
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${
                      params.destination
                    }"${
                      params.waypoints.length
                        ? ' using waypoints: ' + params.waypoints.join(', ')
                        : ''
                    }`,
                  );
                }}
                onReady={this.onReady}
                onError={errorMessage => {
                  console.log(errorMessage);
                }}
                resetOnChange={false}
              />
            </MapView>
            {imgBox}
          </View>
          {this.renderHeaderMapButton()}
          <FooterComponent />
          {this.state.loading && (
            <View style={spinnerStyle}>
              <Spinner color={'green'} type="ThreeBounce" />
            </View>
          )}
        </View>
      </Container>
    );
  }
}
