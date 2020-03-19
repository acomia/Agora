import React from 'react';
import {View, Text, PermissionsAndroid, Image, Animated} from 'react-native';
import {Button, Container, InputGroup, Input} from 'native-base';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
//Local components
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import ExploreComponent from './ExploreComponent';
import FooterComponent from './FooterComponent';
import SpinnerComponent from './SpinnerComponent';
//Util components
import {GOOGLE_MAPS_APIKEY} from '../../util/googlemapapikey';
import {
  MAPLOGIN_TOKEN,
  ACCREDITED_HOSPITALS,
  ACCREDITED_CLINICS,
  NEARBY_HOSPITALS,
  NEARBY_CLINICS,
} from '../../util/api';
//styles property
import styles from './MapStyle';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight();
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LONGITUDE_DELTA = ASPECT_RATIO * 0.015;

export async function request_location_runtime_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      carousel_coordinates: [],
      coordinates: [],
      search_data: [],
      searchTempData: [],
      region: {
        latitude: 14.123456,
        longitude: 121.345677,
        latitudeDelta: 0.015,
        longitudeDelta: LONGITUDE_DELTA,
      },
      geographyPoint: '',
      currentAddress: null,
      nearestClinics: [],
      nearestHospitals: [],
      searchValue: '',
      loading: false,
      exploreFooterHeight: new Animated.Value(0),
    };
    global.mapToken = '';
    this.search_holder = [];
  }
  async componentDidMount() {
    await request_location_runtime_permission();
    this.getCurrectLocation();
    this.getSearchData();
  }
  async getCurrectLocation() {
    Geocoder.init(GOOGLE_MAPS_APIKEY);
    Geolocation.getCurrentPosition(
      position => {
        const origin = [];
        origin.push({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: LONGITUDE_DELTA,
          },
          coordinates: origin,
          geographyPoint:
            'POINT (' +
            position.coords.longitude.toString() +
            ' ' +
            position.coords.latitude.toString() +
            ')',
        });
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            var curAddress = json.results[0].formatted_address;
            this.setState({currentAddress: curAddress});
          })
          .catch(error => console.warn(error));
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
    );
  }
  async getSearchData() {
    this.setState({loading: true});
    // Fetching token for map authentication
    try {
      let maptoken = await fetch(MAPLOGIN_TOKEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          username: 'digitalxform',
          password: 'th2p@ssw0rd',
        }),
      });
      let respJson = await maptoken.json();
      console.log(respJson);
      if (respJson.code === 200) {
        global.mapToken = respJson.response.token;
      }
    } catch (error) {
      console.log(error);
    }
    // Fetching all accredited hospitals //
    try {
      let hospitals = await fetch(ACCREDITED_HOSPITALS, {
        method: 'GET',
        headers: {
          authToken: global.mapToken,
        },
      });
      let hospJson = await hospitals.json();
      this.setState({
        searchTempData: hospJson.data,
      });
    } catch (error) {
      console.log(error);
    }
    // Fetching all accredited clinics //
    try {
      let clinics = await fetch(ACCREDITED_CLINICS, {
        method: 'GET',
        headers: {
          authToken: global.mapToken,
        },
      });
      let clinicJson = await clinics.json();
      const new_array = [...this.state.searchTempData, ...clinicJson.data];
      this.setState({
        searchTempData: new_array,
        loading: false,
      });
      this.search_holder = new_array;
      console.log(this.search_holder);
    } catch (error) {
      console.log(error);
    }
  }
  SearchFilterFunction = text => {
    if (text === '') {
      this.setState({search_data: []});
    } else {
      let newData = this.search_holder.filter(item => {
        const itemData = `${item.hospital_name.toUpperCase()} ${item.city_prov.toUpperCase()} ${item.hospital_code.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        search_data: newData,
      });
    }

    console.log(this.state.search_data);
  };
  showExploreComponent = () => {
    Animated.spring(this.state.exploreFooterHeight, {
      toValue: SCREEN_HEIGHT / 7,
      duration: 300,
    }).start();
  };
  hideExploreComponent = () => {
    Animated.timing(this.state.exploreFooterHeight, {
      toValue: 0,
      duration: 300,
    }).start();
  };
  onCarouselItemChange = index => {
    let location = this.state.carousel_coordinates[index];
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        {
          latitude: Number(location.latitudes),
          longitude: Number(location.longitudes),
        },
      ],
    });
    this.map.animateToRegion({
      latitude: Number(location.latitudes),
      longitude: Number(location.longitudes),
      latitudeDelta: this.state.region.latitudeDelta,
      longitudeDelta: this.state.region.longitudeDelta,
    });
    this.state.markers[index].showCallout();
  };
  onMarkerPressed = (location, index) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        {
          latitude: Number(location.latitudes),
          longitude: Number(location.longitudes),
        },
      ],
    });
    this.map.animateToRegion({
      latitude: Number(location.latitudes),
      longitude: Number(location.longitudes),
      latitudeDelta: this.state.region.latitudeDelta,
      longitudeDelta: this.state.region.longitudeDelta,
    });
    this._carousel.snapToItem(index);
  };
  renderCarouselItem = ({item}) => (
    <View style={[styles.cardContainer, {padding: 0}]}>
      <Image
        source={require('../../../assets/images/hospital_img.png')}
        style={styles.cardImage}
      />
      <View style={{padding: 6}}>
        <Text style={styles.cardTitle}>{item.hospital_name}</Text>
        <Text style={styles.cardDescription}>{item.phone}</Text>
        <Text
          style={
            styles.cardDescription
          }>{`${item.street} ${item.subd_brgy} ${item.city_prov}`}</Text>
        <Text style={styles.cardDescription}>
          {item.clinic_hrs.trim() === '' ? 'N/A' : item.clinic_hrs}
        </Text>
      </View>
    </View>
  );
  getNearbyHospitals = () => {
    this.setState({loading: true});
    //Get nearest Hospitals
    fetch(NEARBY_HOSPITALS, {
      method: 'GET',
      headers: {
        Geography: this.state.geographyPoint,
      },
    })
      .then(response => {
        response.json().then(nearestHospital => {
          this.setState({
            carousel_coordinates: nearestHospital.data,
            loading: false,
          });
          this.hideExploreComponent();
        });
      })
      .catch(error => {
        this.setState({loading: false});
        alert('Error!' + error);
      });
  };
  getNearbyClinics = () => {
    this.setState({loading: true, clinicPressed: true});
    //Get nearest Clinics
    fetch(NEARBY_CLINICS, {
      method: 'GET',
      headers: {
        Geography: this.state.geographyPoint,
      },
    })
      .then(response => {
        response.json().then(nearestClinic => {
          this.setState({
            carousel_coordinates: nearestClinic.data,
            loading: false,
          });
          this.hideExploreComponent();
        });
      })
      .catch(error => {
        this.setState({loading: false});
        alert('Error!' + error);
      });
  };
  onReady = result => {
    this.map.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: SCREEN_WIDTH / 10,
        bottom: SCREEN_HEIGHT / 10,
        left: SCREEN_WIDTH / 10,
        top: SCREEN_HEIGHT / 10,
      },
    });
  };
  render() {
    const {
      region,
      exploreFooterHeight,
      carousel_coordinates,
      coordinates,
      search_data,
    } = this.state;

    return (
      <Container>
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <MapView
              ref={map => (this.map = map)}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={region}>
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}>
                <Icon name="accessibility" size={32} color="#FF5E3A" />
                <Callout style={{backgroundColor: 'transparent'}}>
                  <View style={styles.currentPositionCalloutContainer}>
                    <Text
                      numberOfLines={2}
                      style={styles.currentPositionTextStyle}>
                      YOU ARE HERE!
                    </Text>
                    <Text style={{fontSize: 10, color: 'grey'}}>
                      {this.state.currentAddress}
                    </Text>
                  </View>
                </Callout>
              </Marker>
              {carousel_coordinates.map((marker, index) => (
                <Marker
                  key={marker.hospital_name}
                  ref={ref => (this.state.markers[index] = ref)}
                  onPress={() => this.onMarkerPressed(marker, index)}
                  coordinate={{
                    latitude: Number(marker.latitudes),
                    longitude: Number(marker.longitudes),
                  }}>
                  <Image
                    source={require('../../../assets/images/intellicare-icon.png')}
                    style={{height: 46, width: 20}}
                  />
                  <Callout>
                    <View style={styles.calloutMarkerContainer}>
                      <Text numberOfLines={2} style={styles.calloutMarkerTitle}>
                        {marker.hospital_name}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
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
            <SearchBox searchTerm={this.SearchFilterFunction} />
            {search_data.length > 0 ? (
              <SearchResults data={search_data} />
            ) : null}
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={carousel_coordinates}
              containerCustomStyle={styles.carousel}
              renderItem={this.renderCarouselItem}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={300}
              removeClippedSubviews={false}
              onSnapToItem={index => this.onCarouselItemChange(index)}
            />
          </View>
          <Animated.View style={{height: exploreFooterHeight}}>
            <ExploreComponent
              getNearbyHospitals={this.getNearbyHospitals}
              getNearbyClinics={this.getNearbyClinics}
              hideExploreFooter={this.hideExploreComponent}
            />
          </Animated.View>
          <FooterComponent
            showExploreFooter={this.showExploreComponent}
            hideExploreFooter={this.hideExploreComponent}
          />
        </View>
        {this.state.loading && <SpinnerComponent />}
      </Container>
    );
  }
}

export default Home;
