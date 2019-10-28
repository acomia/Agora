import React, { PureComponent } from 'react'
import { StyleSheet, View, Dimensions, PermissionsAndroid, Alert, Image, Animated, ListView, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Header, Text, Icon, Item, Input, ListItem, Segment, Button, Left, Body, Title, Right, Content, List, Label } from 'native-base'
import MapView from 'react-native-map-clustering'
import { Marker, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geolocation from 'react-native-geolocation-service'
import getDirections from 'react-native-google-maps-directions'
import _ from 'lodash'
import Spinner from 'react-native-spinkit'
import isEqual from 'lodash.isequal'

const offices = require('../../offices.json')

export async function request_location_runtime_permission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'IntelliMap Location Permission',
                'message': 'Intellicare Mobile App needs access to your location '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Alert.alert("Location Permission Granted.");
        }
        else {
            // Alert.alert("Location Permission Not Granted");
        }
    } catch (err) {
        console.warn(err)
    }
}
export default class Intellimap extends PureComponent {
    constructor(props) {
        super(props);
        global.token = ''
        this.state = {
            latitude: 0, longitude: 0, curLatitude: 0, curLongitude: 0, hospitals: [], clinics: [], offices: offices, markers: [], imgSrc: '', loading: false,
            officeSelected: false, tracksViewChanges: true, searchValue: '', clinicPressed: false, hospitalPressed: false,
        }
    }
    async componentDidMount() {
        this.setState({
            loading: true
        })
        await request_location_runtime_permission()
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    curLatitude: position.coords.latitude,
                    curLongitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
        )
        // Fetching token for map authentication //
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                username: 'digitalxform',
                password: 'th2p@ssw0rd'
            })
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (data.message === 'Success!') {
                            global.token = data.response.token
                            { this._getMarkersData() }
                        } else {
                            alert('Username not found!')
                        }
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    _getMarkersData() {
        // Fetching all accredited hospitals //
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=H', {
            method: 'GET',
            headers: {
                'authToken': global.token,
            }
        })
            .then((response) => {
                response.json()
                    .then((hospitalData) => {
                        this.setState({
                            hospitals: hospitalData.data
                        })
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
        // Fetching all accredited clinics //
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=C', {
            method: 'GET',
            headers: {
                'authToken': global.token,
            }
        })
            .then((response) => {
                response.json()
                    .then((clinicData) => {
                        this.setState({
                            clinics: clinicData.data,
                            loading: false
                        })
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    onHospitalButtonPress = (hospitals) => {
        this.setState({
            markers: hospitals,
            imgSrc: require('../../assets/images/location-red.png'),
            destination: '',
            officeSelected: false,
            hospitalPressed: true,
            clinicPressed: false
        })
        { this.renderMarker() }
    }
    onClinicButtonPress = (clinics) => {
        this.setState({
            markers: clinics,
            imgSrc: require('../../assets/images/location-blue.png'),
            destination: '',
            officeSelected: false,
            hospitalPressed: false,
            clinicPressed: true
        })
        { this.renderMarker() }
    }
    onOfficesButtonPress() {
        this.setState({
            markers: offices,
            imgSrc: require('../../assets/images/intellicare-icon.png'),
            destination: '',
            officeSelected: true,
            hospitalPressed: false,
            clinicPressed: false
        })
        { this.renderMarker() }
    }
    updateSearch = search => {
        this.setState({ search });
    };
    handleGetDirections = (destination) => {
        const { curLatitude, curLongitude, officeSelected } = this.state
        var desLat = 0
        var desLong = 0
        if (officeSelected) {
            desLat = destination.coords.latitude
            desLong = destination.coords.longitude
        } else {
            var newDesLat = Number(destination.latitudes)
            var newDesLong = Number(destination.longitudes)
            desLat = newDesLat
            desLong = newDesLong
        }
        const data = {
            source: {
                latitude: curLatitude,
                longitude: curLongitude,
            },
            destination: {
                latitude: desLat,
                longitude: desLong
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"
                },
                {
                    key: "dir_action",
                    value: "navigate"
                }
            ],
        }
        getDirections(data)
    }
    renderHeaderMapButton() {
        const { hospitals, clinics } = this.state
        return (
            <View style={{ height: 24 }}>
                <ScrollView horizontal={true}>
                    <View style={{ flexDirection: 'row', height: 30, justifyContent: 'center' }}>
                        <TouchableOpacity
                            disabled={this.state.hospitalPressed ? true : false}
                            style={!this.state.hospitalPressed ? styles.buttonStyle : styles.disabledButtonStyle}
                            onPress={() => this.onHospitalButtonPress(hospitals)}>
                            <Image
                                source={require('../../assets/images/location-red.png')}
                                style={{ width: 18, height: 18, top: 1 }} />
                            <Text style={styles.textStyle}>Accredited Hospital</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.clinicPressed ? true : false}
                            style={!this.state.clinicPressed ? styles.buttonStyle : styles.disabledButtonStyle}
                            onPress={() => this.onClinicButtonPress(clinics)}>
                            <Image
                                source={require('../../assets/images/location-blue.png')}
                                style={{ width: 18, height: 18, top: 1 }} />
                            <Text style={styles.textStyle}>Accredited Clinic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.officeSelected ? true : false}
                            style={!this.state.officeSelected ? styles.buttonStyle : styles.disabledButtonStyle}
                            onPress={() => this.onOfficesButtonPress()}>
                            <Image
                                source={require('../../assets/images/intellicare-icon.png')}
                                style={{ width: 8, height: 18, top: 1 }} />
                            <Text style={styles.textStyle}>Intellicare Offices</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
    renderMarker() {
        const { markers, imgSrc } = this.state
        return (
            <View>
                {
                    markers && markers.map((location, idx) => {
                        if (this.state.officeSelected) {
                            const { coords: { latitude, longitude } } = location
                            return (
                                <Marker
                                    key={idx}
                                    coordinate={{ latitude, longitude }}
                                    title={location.name}
                                    onPress={this.onMarkerPress(location)}>
                                    <Image
                                        source={imgSrc}
                                        style={{ height: 46, width: 20 }} />
                                </Marker>
                            )
                        } else {
                            const { latitudes, longitudes, hospital_name } = location
                            var newLatitude = Number(latitudes)
                            var newLongitude = Number(longitudes)
                            if (newLatitude == NaN || newLatitude == 0 || newLatitude == null) {
                                newLatitude == 14.5594041
                            } if (newLongitude == NaN || newLongitude == 0 || newLongitude == null) {
                                newLongitude == 121.014414
                            }
                            this.state = { coordinate: { latitude: newLatitude, longitude: newLongitude, } }
                            return (
                                <Marker
                                    cluster={false}
                                    key={idx}
                                    coordinate={this.state.coordinate}
                                    title={hospital_name}
                                    onPress={this.onMarkerPress(location)}>
                                    <Image
                                        source={imgSrc}
                                        style={{ height: 30, width: 30 }} />
                                </Marker>
                            )
                        }
                    })
                }
            </View>
        )

    }
    onMarkerPress = location => () => {
        if (this.state.officeSelected) {
            const { coords: { latitude, longitude } } = location
            this.setState({
                destination: location,
                latitude: latitude,
                longitude: longitude
            })
        } else {
            const { latitudes, longitudes } = location
            var newLatitude = Number(latitudes)
            var newLongitude = Number(longitudes)
            this.setState({
                destination: location,
                latitude: newLatitude,
                longitude: newLongitude
            })
        }
    }
    deg2Rad = (deg) => {
        return deg * Math.PI / 180;
    }
    pythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
        lat1 = this.deg2Rad(lat1);
        lat2 = this.deg2Rad(lat2);
        lon1 = this.deg2Rad(lon1);
        lon2 = this.deg2Rad(lon2);
        const R = 6371;
        const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        const y = (lat2 - lat1);
        const d = Math.sqrt(x * x + y * y) * R;
        return d;
    }
    nearestMarker = (latitude, longitude) => {
        let mindif = 99999;
        let closest;

        for (index = 0; index < hospitals.length; ++index) {
            const dif = this.pythagorasEquirectangular(latitude, longitude, hospitals[index][1],
                hospitals[index][2]);
            if (dif < mindif) {
                closest = index;
                mindif = dif;
            }
            return hospitals[closest]
        }
    }
    officeMarkerDetails = (destination) => {
        const { imgSrc } = this.state
        return (
            <View style={styles.markerDetailsStyle}>
                <Image
                    source={{ uri: destination.image_url }}
                    resizeMode='cover'
                    style={{ top: 28, width: 120, height: 120, borderRadius: 5 }} />
                <ScrollView>
                    <View style={{ flex: 1, paddingLeft: 3, flexDirection: 'column' }}>
                        <ListItem>
                            <Text style={{ color: "green", fontSize: 14, fontWeight: 'bold' }}>{destination.name}</Text>
                            <Label style={{ marginHorizontal: 16, color: '#D6D6D6' }}>|</Label>
                            <Icon name="md-call" style={{ marginRight: 5, color: 'green' }} />
                            <Text style={{ color: "#000", fontSize: 12 }}>{destination.phone}</Text>
                        </ListItem>
                        <ListItem>
                            <Icon name="md-time" size={10} style={{ marginRight: 5, color: 'green' }} />
                            <Text style={{ color: "#000", fontSize: 12 }}>{destination.ofc_hrs}   {destination.ofc_schedule}</Text>
                        </ListItem>
                        <ListItem>
                            <Icon name="md-map" size={10} style={{ marginRight: 5, color: 'green' }} />
                            <Text style={{ color: "#000", fontSize: 12 }}>{destination.address}</Text>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity
                                style={styles.directionButtonStyle}
                                onPress={() => this.handleGetDirections(destination)}>
                                <Image
                                    source={imgSrc}
                                    style={{ width: 9, height: 21, top: 2, marginHorizontal: 3 }} />
                                <Text style={styles.textStyle}>Get Direction</Text>
                            </TouchableOpacity>
                        </ListItem>
                    </View>
                </ScrollView>
            </View>
        )
    }
    hospclinicMarkerDetails = (destination) => {
        const { imgSrc } = this.state
        return (
            <View style={styles.markerDetailsStyle}>
                <Image
                    source={this.state.hospitalPressed ? require('../../assets/images/hospital_img.png') : require('../../assets/images/clinic_img.png')}
                    resizeMode='cover'
                    style={{ top: 28, width: 100, height: 100, borderRadius: 5 }} />
                <ScrollView>
                    <View style={{ flex: 1, paddingLeft: 3, flexDirection: 'column' }}>
                        <ScrollView horizontal={true} style={{ flexWrap: 'wrap' }}>
                            <ListItem>
                                <Text style={{ color: "green", fontSize: 13, fontWeight: 'bold' }}>{destination.hospital_name}</Text>
                                <Label style={{ marginHorizontal: 16, color: '#D6D6D6' }}>|</Label>
                                <Icon name="md-call" style={this.state.clinicPressed ? { marginRight: 5, color: '#5DADE2' } : { marginRight: 5, color: 'red' }} />
                                <Text style={{ color: "#000", fontSize: 12 }}>{destination.phone}</Text>
                            </ListItem>
                        </ScrollView>
                        <ListItem>
                            <Icon name="md-time" size={10} style={this.state.clinicPressed ? { marginRight: 5, color: '#5DADE2' } : { marginRight: 5, color: 'red' }} />
                            <Text style={{ color: "#000", fontSize: 12 }}>{destination.clinic_hrs}</Text>
                        </ListItem>
                        <ListItem>
                            <Icon name="md-map" size={10} style={this.state.clinicPressed ? { marginRight: 5, color: '#5DADE2' } : { marginRight: 5, color: 'red' }} />
                            <Text style={{ color: "#000", fontSize: 12 }}>{destination.street} {destination.subd_brgy} {destination.city_prov}</Text>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity
                                style={styles.directionButtonStyle}
                                onPress={() => this.handleGetDirections(destination)}>
                                <Image
                                    source={imgSrc}
                                    style={{ width: 18, height: 18, top: 2 }} />
                                <Text style={styles.textStyle}>Get Direction</Text>
                            </TouchableOpacity>
                        </ListItem>
                    </View>
                </ScrollView>
            </View>
        )
    }
    render() {
        const { latitude, longitude, destination, markers } = this.state
        const { container, map, mapSection, headerStyle, searchIcon, textStyle, directionButtonStyle, markerDetailsStyle, searchTextInput, searchBarContainer } = styles
        var imgBox = null
        if (!_.isEmpty(destination)) {
            if (this.state.officeSelected) {
                imgBox = this.officeMarkerDetails(destination)
            } else {
                imgBox = this.hospclinicMarkerDetails(destination)
            }
        }
        return (
            <Container>
                <Header searchBar rounded style={headerStyle}>
                    <Item>
                        <Icon name="ios-search" style={searchIcon} />
                        <Input
                            placeholder="Search hospitals/clinics"
                            placeholderTextColor="#bdc3c7"
                            value={this.state.searchValue}
                            onChangeText={(searchValue) => this.setState({ searchValue })} />
                        <Icon name="md-close" style={searchIcon} onPress={() => this.setState({ searchValue: '' })} />
                    </Item>
                </Header>
                {this.renderHeaderMapButton()}
                <View style={mapSection}>
                    <View style={container}>
                        <MapView
                            clustering={true}
                            clusterColor='#000'
                            clusterTextColor='#fff'
                            clusterBorderColor='#fff'
                            clusterBorderWidth={4}
                            // ref={ref => mapView = ref}
                            showsUserLocation
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={map}
                            region={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                            camera={{
                                center: {
                                    latitude: latitude,
                                    longitude: longitude,
                                },
                                pitch: 90,
                                heading: 2,
                                altitude: 8,
                                zoom: 16,
                            }}>
                            {markers.length > 0 ? this.renderMarker() : null}
                        </MapView>
                        {imgBox}
                    </View>
                </View>
                {this.state.loading &&
                    <View style={styles.spinnerStyle}>
                        <Spinner
                            color={'green'}
                            size={200}
                            type={'Bounce'}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'red' }}>Fetching data...</Text>
                    </View>
                }
            </Container>
        );
    };
}

export const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create(
    {
        container: {
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        mapSection: {
            borderRadius: 50,
            padding: 10,
            flex: 7,
            backgroundColor: '#fff'
        },
        headerStyle: {
            backgroundColor: "#f5f5f5",
            height: 50
        },
        searchIcon: {
            color: "#2d2d2d",
        },
        textStyle: {
            alignSelf: 'center',
            color: '#1AA811',
            fontSize: 12,
            fontWeight: '600',
        },
        buttonStyle: {
            alignSelf: 'stretch',
            backgroundColor: '#fff',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#1AA811',
            justifyContent: 'center',
            flexDirection: 'row',
            width: 140,
            height: 22,
            marginHorizontal: 3
        },
        disabledButtonStyle: {
            alignSelf: 'stretch',
            backgroundColor: '#F2F3F4',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#0000',
            justifyContent: 'center',
            flexDirection: 'row',
            width: 140,
            height: 22,
            marginHorizontal: 3
        },
        directionButtonStyle: {
            backgroundColor: '#fff',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#1AA811',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            height: 30,
        },
        markerDetailsStyle: {
            position: 'absolute',
            bottom: 5,
            padding: 5,
            width: '97%',
            height: height * 0.20,
            backgroundColor: '#fff',
            borderRadius: 10,
            flexDirection: 'row',
        },
        spinnerStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            opacity: 0.2,
            backgroundColor: 'black',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        searchTextInput: {
            borderWidth: 1,
        }
    }
)